import type { Sentence, Word } from '../data/types';
import {
  ALL_WORDS,
  LESSONS,
  findLesson,
  findUnit,
  learnedWords,
  sentencesUpTo,
  wordsInSentence,
  wordsUpTo,
  type LessonRef
} from '../data/course';
import { normalize, tokenize } from './grading';
import { pick, sample, shuffle } from './random';
import { ALPHABET, toCyrillic } from './translit';
import type { WordStat } from './store';

export type Lang = 'sr' | 'nl' | 'cyr';

export type Exercise =
  | {
      type: 'pictures';
      key: string;
      wordIds: string[];
      isNew: boolean;
      /** Dutch word to find */
      prompt: string;
      options: { text: string; emoji: string; correct: boolean; speak: string }[];
    }
  | {
      type: 'choice';
      key: string;
      wordIds: string[];
      isNew: boolean;
      title: string;
      prompt: string;
      promptLang: Lang;
      /** text to speak when the prompt is Serbian */
      speak?: string;
      options: { text: string; lang: Lang; correct: boolean }[];
      note?: string;
    }
  | {
      type: 'match';
      key: string;
      wordIds: string[];
      pairs: { left: string; right: string; leftLang: Lang; rightLang: Lang; id: string }[];
    }
  | {
      type: 'tiles';
      key: string;
      wordIds: string[];
      mode: 'sr-nl' | 'nl-sr' | 'listen';
      prompt: string;
      tiles: string[];
      accepted: string[];
      /** canonical answer to display when wrong */
      answer: string;
      /** Serbian text (for TTS / hints) */
      sr: string;
    }
  | {
      type: 'type';
      key: string;
      wordIds: string[];
      mode: 'sr-nl' | 'nl-sr' | 'listen';
      prompt: string;
      accepted: string[];
      answer: string;
      sr: string;
      answerLang: 'sr' | 'nl';
    }
  | {
      type: 'fill';
      key: string;
      wordIds: string[];
      before: string;
      after: string;
      nl: string;
      options: { text: string; correct: boolean }[];
      sr: string;
    }
  | {
      type: 'speak';
      key: string;
      wordIds: string[];
      sr: string;
      nl: string;
    };

export interface SessionOptions {
  listening: boolean;
  speaking: boolean;
}

// ---------------------------------------------------------------
// Dutch alternative expansion (je/jij, ze/zij, we/wij, …)
// ---------------------------------------------------------------
const NL_SWAPS: [RegExp, string][] = [
  [/\bjij\b/gi, 'je'],
  [/\bje\b/gi, 'jij'],
  [/\bzij\b/gi, 'ze'],
  [/\bwij\b/gi, 'we'],
  [/\bwe\b/gi, 'wij'],
  [/\bmij\b/gi, 'me'],
  [/\bjou\b/gi, 'je'],
  [/\balsjeblieft\b/gi, 'alstublieft'],
  [/\balstublieft\b/gi, 'alsjeblieft'],
  [/\balsjeblieft\b/gi, 'asjeblieft'],
  [/\bbedankt\b/gi, 'dank je'],
  [/\bbedankt\b/gi, 'dankjewel'],
  [/\bbedankt\b/gi, 'dank u'],
  [/\boké\b/gi, 'ok'],
  [/\boké\b/gi, 'okay'],
  [/\bt-shirt\b/gi, 'shirt'],
  [/\bwc\b/gi, 'toilet']
];

export function expandNl(list: string[]): string[] {
  const out = new Set(list);
  for (let round = 0; round < 2; round++) {
    for (const item of [...out]) {
      for (const [re, rep] of NL_SWAPS) {
        const v = item.replace(re, (m) => (m[0] === m[0].toUpperCase() ? rep[0].toUpperCase() + rep.slice(1) : rep));
        if (v !== item) out.add(v);
      }
    }
    if (out.size > 300) break;
  }
  // digits for small numbers ("drie" -> "3") are already handled by alternatives
  return [...out];
}

function nlAccepted(sn: Sentence): string[] {
  return expandNl([sn.nl, ...(sn.nlAlts ?? [])]);
}
function srAccepted(sn: Sentence): string[] {
  return [sn.sr, ...(sn.srAlts ?? [])];
}
function wordSrAccepted(w: Word): string[] {
  return [w.sr, ...(w.srAlts ?? [])];
}

// ---------------------------------------------------------------
// Tiles
// ---------------------------------------------------------------
const PROPER = new Set<string>();
{
  // Words that are capitalised somewhere in the middle of a sentence are proper nouns.
  for (const l of LESSONS)
    for (const sn of l.lesson.sentences) {
      for (const text of [sn.sr, sn.nl]) {
        tokenize(text)
          .slice(1)
          .forEach((t) => {
            if (t[0] !== t[0].toLowerCase()) PROPER.add(t.toLowerCase());
          });
      }
    }
  for (const w of ALL_WORDS) if (w.sr[0] !== w.sr[0].toLowerCase()) PROPER.add(w.sr.toLowerCase());
  ['ik', 'ana', 'marko', 'milica', 'luka'].forEach((x) => PROPER.add(x));
  // "Ik" is not a proper noun, but it should not appear capitalised either
  PROPER.delete('ik');
}

function tileCase(t: string): string {
  if (/^t-shirt$/i.test(t)) return 'T-shirt';
  if (PROPER.has(t.toLowerCase())) return t;
  return t.toLowerCase();
}

function makeTiles(answer: string, distractorPool: string[], count: number): string[] {
  const answerTiles = tokenize(answer).map(tileCase);
  const answerSet = new Set(answerTiles.map((t) => normalize(t)));
  const pool = [...new Set(distractorPool.map(tileCase))].filter((t) => !answerSet.has(normalize(t)));
  const extra = sample(pool, Math.max(2, Math.min(count, 10 - answerTiles.length)));
  return shuffle([...answerTiles, ...extra]);
}

// ---------------------------------------------------------------
// Builders
// ---------------------------------------------------------------
function meaningSet(w: Word): Set<string> {
  return new Set([w.nl, ...(w.nlAlts ?? [])].map(normalize));
}
function formSet(w: Word): Set<string> {
  return new Set([w.sr, ...(w.srAlts ?? [])].map(normalize));
}
function overlaps(a: Set<string>, b: Set<string>): boolean {
  for (const x of a) if (b.has(x)) return true;
  return false;
}
/** true if the two words could be confused (same form or overlapping meaning) */
function confusable(a: Word, b: Word): boolean {
  return overlaps(meaningSet(a), meaningSet(b)) || overlaps(formSet(a), formSet(b));
}

function optionsFor(target: Word, pool: Word[], n: number, _by: 'sr' | 'nl'): Word[] {
  const out: Word[] = [];
  for (const w of shuffle(pool)) {
    if (out.length >= n) break;
    if (w.id === target.id || confusable(w, target) || out.some((o) => confusable(o, w))) continue;
    out.push(w);
  }
  return out;
}

function picturesEx(target: Word, pool: Word[], isNew: boolean): Exercise | null {
  if (!target.emoji) return null;
  const others = optionsFor(target, pool.filter((w) => w.emoji), 3, 'sr');
  if (others.length < 3) return null;
  return {
    type: 'pictures',
    key: target.id,
    wordIds: [target.id],
    isNew,
    prompt: target.nl,
    options: shuffle([target, ...others]).map((w) => ({
      text: w.sr,
      emoji: w.emoji!,
      correct: w.id === target.id,
      speak: w.sr
    }))
  };
}

function choiceSrToNl(target: Word, pool: Word[], isNew: boolean): Exercise | null {
  const others = optionsFor(target, pool, 2, 'nl');
  if (others.length < 2) return null;
  return {
    type: 'choice',
    key: target.id,
    wordIds: [target.id],
    isNew,
    title: isNew ? 'Nieuw woord! Wat betekent dit?' : 'Wat betekent dit?',
    prompt: target.sr,
    promptLang: 'sr',
    speak: target.sr,
    note: target.note,
    options: shuffle([target, ...others]).map((w) => ({ text: w.nl, lang: 'nl' as Lang, correct: w.id === target.id }))
  };
}

function choiceNlToSr(target: Word, pool: Word[]): Exercise | null {
  const others = optionsFor(target, pool, 2, 'sr');
  if (others.length < 2) return null;
  return {
    type: 'choice',
    key: target.id,
    wordIds: [target.id],
    isNew: false,
    title: `Hoe zeg je "${target.nl}"?`,
    prompt: target.nl,
    promptLang: 'nl',
    note: target.note,
    options: shuffle([target, ...others]).map((w) => ({ text: w.sr, lang: 'sr' as Lang, correct: w.id === target.id }))
  };
}

function matchEx(words: Word[], key: string): Exercise | null {
  const uniq: Word[] = [];
  for (const w of words) {
    if (uniq.some((u) => u.id === w.id || confusable(u, w))) continue;
    uniq.push(w);
    if (uniq.length >= 5) break;
  }
  if (uniq.length < 3) return null;
  return {
    type: 'match',
    key,
    wordIds: uniq.map((w) => w.id),
    pairs: uniq.map((w) => ({ left: w.sr, right: w.nl, leftLang: 'sr', rightLang: 'nl', id: w.id }))
  };
}

function srPool(sentences: Sentence[]): string[] {
  return sentences.flatMap((x) => tokenize(x.sr));
}
function nlPool(sentences: Sentence[]): string[] {
  return sentences.flatMap((x) => tokenize(x.nl));
}

function tilesEx(sn: Sentence, mode: 'sr-nl' | 'nl-sr' | 'listen', poolSentences: Sentence[]): Exercise {
  const wordIds = wordsInSentence(sn.sr);
  if (mode === 'sr-nl') {
    return {
      type: 'tiles',
      key: sn.sr,
      wordIds,
      mode,
      prompt: sn.sr,
      sr: sn.sr,
      tiles: makeTiles(sn.nl, nlPool(poolSentences), 4),
      accepted: nlAccepted(sn),
      answer: sn.nl
    };
  }
  return {
    type: 'tiles',
    key: sn.sr,
    wordIds,
    mode,
    prompt: mode === 'listen' ? '' : sn.nl,
    sr: sn.sr,
    tiles: makeTiles(sn.sr, srPool(poolSentences), mode === 'listen' ? 3 : 4),
    accepted: srAccepted(sn),
    answer: sn.sr
  };
}

function typeEx(sn: Sentence, mode: 'sr-nl' | 'nl-sr' | 'listen'): Exercise {
  const wordIds = wordsInSentence(sn.sr);
  if (mode === 'sr-nl')
    return { type: 'type', key: sn.sr, wordIds, mode, prompt: sn.sr, sr: sn.sr, accepted: nlAccepted(sn), answer: sn.nl, answerLang: 'nl' };
  return {
    type: 'type',
    key: sn.sr,
    wordIds,
    mode,
    prompt: mode === 'listen' ? '' : sn.nl,
    sr: sn.sr,
    accepted: srAccepted(sn),
    answer: sn.sr,
    answerLang: 'sr'
  };
}

function typeWordEx(w: Word): Exercise {
  return {
    type: 'type',
    key: w.id,
    wordIds: [w.id],
    mode: 'nl-sr',
    prompt: w.nl,
    sr: w.sr,
    accepted: wordSrAccepted(w),
    answer: w.sr,
    answerLang: 'sr'
  };
}

function fillEx(sn: Sentence, vocab: Word[]): Exercise | null {
  const tokens = sn.sr.split(' ');
  if (tokens.length < 2) return null;
  // candidate positions: tokens that are (forms of) single-word vocabulary
  const cands = tokens
    .map((t, i) => ({ t, i, clean: tokenize(t)[0] ?? '' }))
    .filter((x) => x.clean.length >= 2 && !PROPER.has(x.clean.toLowerCase()));
  if (!cands.length) return null;
  const c = pick(cands);
  const clean = c.clean;
  const prefix = c.t.slice(0, c.t.indexOf(clean));
  const suffix = c.t.slice(c.t.indexOf(clean) + clean.length);
  // distractors: tokens from vocabulary with different meaning
  const pool = shuffle(
    [...new Set(vocab.filter((w) => !w.sr.includes(' ')).map((w) => w.sr))].filter(
      (x) => normalize(x) !== normalize(clean) && !PROPER.has(x.toLowerCase())
    )
  );
  // Make sure no distractor produces another accepted sentence
  const accepted = srAccepted(sn).map(normalize);
  const options: string[] = [];
  for (const p of pool) {
    if (options.length >= 2) break;
    const candidate = [...tokens.slice(0, c.i), prefix + p + suffix, ...tokens.slice(c.i + 1)].join(' ');
    if (accepted.includes(normalize(candidate))) continue;
    options.push(p);
  }
  if (options.length < 2) return null;
  const casedAnswer = c.i === 0 ? clean.toLowerCase() : clean;
  return {
    type: 'fill',
    key: sn.sr,
    wordIds: wordsInSentence(sn.sr),
    before: [...tokens.slice(0, c.i), prefix].join(' ').trimEnd() + (prefix ? '' : ''),
    after: (suffix + ' ' + tokens.slice(c.i + 1).join(' ')).trim(),
    nl: sn.nl,
    sr: sn.sr,
    options: shuffle([
      { text: c.i === 0 ? casedAnswer : clean, correct: true },
      ...options.map((o) => ({ text: o, correct: false }))
    ])
  };
}

function speakEx(sn: Sentence): Exercise {
  return { type: 'speak', key: sn.sr, wordIds: wordsInSentence(sn.sr), sr: sn.sr, nl: sn.nl };
}

/** Sentences short enough to type comfortably */
function shortish(sn: Sentence): boolean {
  return tokenize(sn.sr).length <= 5;
}

// ---------------------------------------------------------------
// Sessions
// ---------------------------------------------------------------

function sentenceExercises(
  sentences: Sentence[],
  pool: Sentence[],
  vocab: Word[],
  opts: SessionOptions,
  hard: boolean
): Exercise[] {
  const out: Exercise[] = [];
  const modes = hard
    ? ['type-nl-sr', 'tiles-nl-sr', 'type-sr-nl', 'listen', 'fill', 'speak', 'listen-type', 'tiles-sr-nl']
    : ['tiles-sr-nl', 'tiles-nl-sr', 'listen', 'fill', 'tiles-nl-sr', 'type-nl-sr', 'speak', 'tiles-sr-nl'];
  shuffle(sentences).forEach((sn, i) => {
    let mode = modes[i % modes.length];
    if (mode.startsWith('listen') && !opts.listening) mode = 'tiles-nl-sr';
    if (mode === 'speak' && !opts.speaking) mode = 'tiles-sr-nl';
    if (mode.startsWith('type') && !shortish(sn)) mode = mode.replace('type', 'tiles');
    let ex: Exercise | null = null;
    switch (mode) {
      case 'tiles-sr-nl':
        ex = tilesEx(sn, 'sr-nl', pool);
        break;
      case 'tiles-nl-sr':
        ex = tilesEx(sn, 'nl-sr', pool);
        break;
      case 'listen':
        ex = tilesEx(sn, 'listen', pool);
        break;
      case 'listen-type':
        ex = typeEx(sn, 'listen');
        break;
      case 'type-nl-sr':
        ex = typeEx(sn, 'nl-sr');
        break;
      case 'type-sr-nl':
        ex = typeEx(sn, 'sr-nl');
        break;
      case 'fill':
        ex = fillEx(sn, vocab) ?? tilesEx(sn, 'nl-sr', pool);
        break;
      case 'speak':
        ex = speakEx(sn);
        break;
    }
    if (ex) out.push(ex);
  });
  return out;
}

export function buildLessonSession(lessonId: string, timesDone: number, opts: SessionOptions): Exercise[] {
  const ref = findLesson(lessonId);
  if (!ref) return [];
  const hard = timesDone >= 1;
  const newWords = ref.lesson.words;
  const vocab = wordsUpTo(ref.index);
  const pool = sentencesUpTo(ref.index).map((x) => x.s);
  const out: Exercise[] = [];

  // 1. introduce new words (pictures when possible)
  const intros: Exercise[] = [];
  newWords.forEach((w, i) => {
    const ex =
      (!hard && (i % 2 === 0 || !w.emoji) ? choiceSrToNl(w, vocab, true) : null) ??
      picturesEx(w, vocab, !hard) ??
      choiceSrToNl(w, vocab, !hard) ??
      choiceNlToSr(w, vocab);
    if (ex) intros.push(ex);
  });

  // 2. sentences of this lesson, plus some review from the same unit
  const own = ref.lesson.sentences;
  const review = ref.unit.lessons
    .slice(0, ref.lessonIndex)
    .flatMap((l) => l.sentences);
  const chosenSentences = [...sample(own, hard ? 6 : 6), ...sample(review, hard ? 2 : 1)];
  const sentEx = sentenceExercises(chosenSentences, pool, vocab, opts, hard);

  // 3. match pairs
  const match = matchEx(shuffle(newWords).concat(shuffle(vocab)), ref.lesson.id + ':match');

  // 4. some word-level practice
  const extra: Exercise[] = [];
  for (const w of sample(newWords, hard ? 2 : 1)) {
    const ex = hard ? typeWordEx(w) : choiceNlToSr(w, vocab);
    if (ex) extra.push(ex);
  }

  // Interleave: intros early, but mixed with sentences
  if (hard) {
    out.push(...shuffle([...intros.slice(0, 3), ...sentEx, ...extra]));
    if (match) out.splice(Math.min(4, out.length), 0, match);
  } else {
    const firstIntros = intros.slice(0, 3);
    const laterIntros = intros.slice(3);
    out.push(...firstIntros);
    if (match) out.push(match);
    const rest = [...laterIntros];
    sentEx.forEach((e, i) => {
      rest.push(e);
      if (i === 1 && extra.length) rest.push(...extra);
    });
    out.push(...rest);
  }
  return out.slice(0, 15);
}

/** Practice from all learned material; focuses on weak words and recent mistakes. */
export function buildPracticeSession(
  completed: Record<string, number>,
  stats: Record<string, WordStat>,
  mistakes: string[],
  opts: SessionOptions,
  focus: 'weak' | 'mistakes' = 'weak'
): Exercise[] {
  const learned = learnedWords(completed);
  if (learned.length < 4) return [];
  const doneRefs = LESSONS.filter((l) => (completed[l.lesson.id] ?? 0) > 0);
  const allSentences = doneRefs.flatMap((l) => l.lesson.sentences);
  const now = Date.now();
  const score = (w: Word) => {
    const st = stats[w.id];
    if (!st) return 0;
    const ageDays = (now - st.last) / 86400000;
    return st.s - Math.min(3, ageDays / 3) + Math.random();
  };
  let weak = [...learned].sort((a, b) => score(a) - score(b)).slice(0, 8);
  let sentences: Sentence[];
  if (focus === 'mistakes' && mistakes.length) {
    const mistakeWords = learned.filter((w) => mistakes.includes(w.id));
    if (mistakeWords.length) weak = [...mistakeWords, ...weak].slice(0, 8);
    sentences = allSentences.filter((sn) => mistakes.includes(sn.sr));
    if (sentences.length < 6) sentences = [...sentences, ...pickSentencesFor(weak, allSentences, 6 - sentences.length)];
  } else {
    sentences = pickSentencesFor(weak, allSentences, 7);
  }
  const out: Exercise[] = [];
  const match = matchEx(weak, 'practice:match');
  const wordEx = weak.slice(0, 4).map((w, i) =>
    i % 2 === 0 ? (picturesEx(w, learned, false) ?? choiceNlToSr(w, learned)) : typeWordEx(w)
  );
  const sentEx = sentenceExercises(sentences.slice(0, 8), allSentences, learned, opts, true);
  out.push(...shuffle([...wordEx.filter((x): x is Exercise => !!x), ...sentEx]));
  if (match) out.splice(2, 0, match);
  return out.slice(0, 14);
}

function pickSentencesFor(words: Word[], sentences: Sentence[], n: number): Sentence[] {
  const ids = new Set(words.map((w) => w.id));
  const scored = shuffle(sentences).map((sn) => ({ sn, hits: wordsInSentence(sn.sr).filter((id) => ids.has(id)).length }));
  scored.sort((a, b) => b.hits - a.hits);
  return scored.slice(0, n).map((x) => x.sn);
}

/** Unit test: mixed exercises over a whole unit (or several units for a jump test) */
export function buildUnitTest(unitIds: string[], opts: SessionOptions): Exercise[] {
  const refs: LessonRef[] = LESSONS.filter((l) => unitIds.includes(l.unit.id));
  if (!refs.length) return [];
  const lastIndex = Math.max(...refs.map((r) => r.index));
  const vocab = wordsUpTo(lastIndex);
  const unitWords = refs.flatMap((r) => r.lesson.words);
  const sentences = refs.flatMap((r) => r.lesson.sentences);
  const pool = sentencesUpTo(lastIndex).map((x) => x.s);
  const out: Exercise[] = [];
  const m = matchEx(shuffle(unitWords), unitIds.join('+') + ':match');
  const wordEx = sample(unitWords, 4).map((w, i) =>
    i % 2 === 0 ? (picturesEx(w, vocab, false) ?? choiceNlToSr(w, vocab)) : typeWordEx(w)
  );
  const sentEx = sentenceExercises(sample(sentences, 10), pool, vocab, opts, true);
  out.push(...shuffle([...wordEx.filter((x): x is Exercise => !!x), ...sentEx]));
  if (m) out.splice(3, 0, m);
  return out.slice(0, 15);
}

// ---------------------------------------------------------------
// Alphabet (Cyrillic) lessons
// ---------------------------------------------------------------

export const LETTER_LESSONS: { id: string; title: string; description: string; letters: string[]; words: string[] }[] = [
  {
    id: 'abc1',
    title: 'Bekende letters',
    description: 'Letters die er hetzelfde uitzien én klinken',
    letters: ['А', 'Е', 'О', 'К', 'М', 'Т', 'Ј'],
    words: ['mama', 'tata', 'kafa', 'more', 'tamo', 'jaje', 'mesto']
  },
  {
    id: 'abc2',
    title: 'Valse vrienden',
    description: 'Ze lijken bekend, maar klinken anders!',
    letters: ['В', 'Н', 'Р', 'С', 'Х', 'У'],
    words: ['voda', 'ne', 'riba', 'sok', 'hleb', 'ruka', 'sestra', 'kuvar']
  },
  {
    id: 'abc3',
    title: 'Nieuwe vormen 1',
    description: 'Б, Г, Д, З, И, Л, П',
    letters: ['Б', 'Г', 'Д', 'З', 'И', 'Л', 'П'],
    words: ['brat', 'grad', 'dan', 'zima', 'ime', 'leto', 'pivo', 'banka']
  },
  {
    id: 'abc4',
    title: 'Nieuwe vormen 2',
    description: 'Ж, Ф, Ц, Ч, Ш',
    letters: ['Ж', 'Ф', 'Ц', 'Ч', 'Ш'],
    words: ['žena', 'film', 'crkva', 'čaj', 'škola', 'šest', 'čokolada', 'fudbal']
  },
  {
    id: 'abc5',
    title: 'Typisch Servisch',
    description: 'Ђ, Ћ, Љ, Њ, Џ – letters die je nergens anders ziet',
    letters: ['Ђ', 'Ћ', 'Љ', 'Њ', 'Џ'],
    words: ['ćerka', 'kuća', 'ljubav', 'konj', 'džem', 'prijatelj', 'doviđenja', 'kuhinja']
  },
  {
    id: 'abc6',
    title: 'Lezen in het Cyrillisch',
    description: 'Lees hele zinnen in het Cyrillisch',
    letters: [],
    words: []
  }
];

const LETTER_WORD_NL: Record<string, string> = {
  mama: 'mama', tata: 'papa', kafa: 'koffie', more: 'zee', tamo: 'daar', jaje: 'ei', mesto: 'plaats',
  voda: 'water', ne: 'nee', riba: 'vis', sok: 'sap', hleb: 'brood', ruka: 'hand', sestra: 'zus', kuvar: 'kok',
  brat: 'broer', grad: 'stad', dan: 'dag', zima: 'winter', ime: 'naam', leto: 'zomer', pivo: 'bier', banka: 'bank',
  žena: 'vrouw', film: 'film', crkva: 'kerk', čaj: 'thee', škola: 'school', šest: 'zes', čokolada: 'chocolade', fudbal: 'voetbal',
  ćerka: 'dochter', kuća: 'huis', ljubav: 'liefde', konj: 'paard', džem: 'jam', prijatelj: 'vriend', doviđenja: 'tot ziens', kuhinja: 'keuken'
};

export function buildLetterSession(lessonId: string): Exercise[] {
  const idx = LETTER_LESSONS.findIndex((l) => l.id === lessonId);
  if (idx === -1) return [];
  const lesson = LETTER_LESSONS[idx];
  const known = LETTER_LESSONS.slice(0, idx + 1).flatMap((l) => l.letters);
  const alpha = (c: string) => ALPHABET.find((a) => a.cyr === c)!;
  const out: Exercise[] = [];

  if (lesson.letters.length === 0) {
    // reading lesson: sentences of the first units in Cyrillic
    const sents = sample(LESSONS.slice(0, 12).flatMap((l) => l.lesson.sentences), 10);
    const pool = LESSONS.slice(0, 12).flatMap((l) => l.lesson.sentences);
    for (const sn of sents.slice(0, 5)) {
      out.push({ ...(tilesEx(sn, 'sr-nl', pool) as Extract<Exercise, { type: 'tiles' }>), prompt: toCyrillic(sn.sr) });
    }
    for (const sn of sents.slice(5, 10)) {
      const others = sample(pool.filter((x) => x.sr !== sn.sr), 2);
      out.push({
        type: 'choice',
        key: 'cyr:' + sn.sr,
        wordIds: [],
        isNew: false,
        title: 'Lees en kies de juiste vertaling',
        prompt: toCyrillic(sn.sr),
        promptLang: 'cyr',
        speak: sn.sr,
        options: shuffle([sn, ...others]).map((x) => ({ text: x.nl, lang: 'nl' as Lang, correct: x === sn }))
      });
    }
    return shuffle(out);
  }

  // new letters: Cyrillic -> Latin
  for (const c of lesson.letters) {
    const a = alpha(c);
    const distract = sample(
      ALPHABET.filter((x) => x.cyr !== c),
      2
    );
    out.push({
      type: 'choice',
      key: 'letter:' + c,
      wordIds: [],
      isNew: true,
      title: 'Nieuwe letter! Welke Latijnse letter is dit?',
      prompt: `${c} ${c.toLowerCase()}`,
      promptLang: 'cyr',
      speak: a.example,
      note: `Klinkt als: ${a.sound}. Voorbeeld: ${toCyrillic(a.example)} (${a.example}) = ${a.exampleNl}`,
      options: shuffle([a, ...distract]).map((x) => ({ text: x.lat, lang: 'nl' as Lang, correct: x.cyr === c }))
    });
  }
  // match letters
  const matchLetters = sample(known, Math.min(5, known.length));
  out.push({
    type: 'match',
    key: lesson.id + ':match',
    wordIds: [],
    pairs: matchLetters.map((c) => ({ left: c, right: alpha(c).lat, leftLang: 'cyr', rightLang: 'nl', id: c }))
  });
  // read words: Cyrillic word -> Latin spelling / meaning
  const words = shuffle(lesson.words);
  words.forEach((wd, i) => {
    const others = sample(
      Object.keys(LETTER_WORD_NL).filter((x) => x !== wd),
      2
    );
    if (i % 2 === 0) {
      out.push({
        type: 'choice',
        key: 'cyrword:' + wd,
        wordIds: [],
        isNew: false,
        title: 'Hoe lees je dit woord?',
        prompt: toCyrillic(wd),
        promptLang: 'cyr',
        speak: wd,
        options: shuffle([wd, ...others]).map((x) => ({ text: x, lang: 'nl' as Lang, correct: x === wd }))
      });
    } else {
      out.push({
        type: 'choice',
        key: 'cyrword:' + wd,
        wordIds: [],
        isNew: false,
        title: 'Wat betekent dit woord?',
        prompt: toCyrillic(wd),
        promptLang: 'cyr',
        speak: wd,
        options: shuffle([wd, ...others]).map((x) => ({ text: LETTER_WORD_NL[x], lang: 'nl' as Lang, correct: x === wd }))
      });
    }
  });
  // Latin -> Cyrillic
  for (const c of sample(lesson.letters, Math.min(3, lesson.letters.length))) {
    const a = alpha(c);
    const distract = sample(
      ALPHABET.filter((x) => x.cyr !== c && x.lat !== a.lat),
      2
    );
    out.push({
      type: 'choice',
      key: 'letter-rev:' + c,
      wordIds: [],
      isNew: false,
      title: `Welke Cyrillische letter is "${a.lat}"?`,
      prompt: a.lat,
      promptLang: 'nl',
      options: shuffle([a, ...distract]).map((x) => ({ text: x.cyr, lang: 'cyr' as Lang, correct: x.cyr === c }))
    });
  }
  const intro = out.slice(0, lesson.letters.length);
  const rest = shuffle(out.slice(lesson.letters.length));
  return [...intro, ...rest].slice(0, 16);
}

export { findUnit };
