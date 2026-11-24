import type { Lesson, Unit, Word, Sentence } from './types';
import { u1, u2, u3 } from './units/u01-u03';
import { u4, u5, u6 } from './units/u04-u06';
import { u7, u8, u9 } from './units/u07-u09';
import { u10, u11, u12 } from './units/u10-u12';
import { GLOSSARY } from './glossary';
import { tokenize } from '../lib/grading';

export const UNITS: Unit[] = [u1, u2, u3, u4, u5, u6, u7, u8, u9, u10, u11, u12];

export interface LessonRef {
  lesson: Lesson;
  unit: Unit;
  unitIndex: number;
  lessonIndex: number;
  /** position in the whole course */
  index: number;
}

export const LESSONS: LessonRef[] = [];
UNITS.forEach((unit, unitIndex) =>
  unit.lessons.forEach((lesson, lessonIndex) =>
    LESSONS.push({ lesson, unit, unitIndex, lessonIndex, index: LESSONS.length })
  )
);

export const ALL_WORDS: Word[] = LESSONS.flatMap((l) => l.lesson.words);
export const WORD_BY_ID = new Map(ALL_WORDS.map((w) => [w.id, w]));
export const ALL_SENTENCES: { s: Sentence; ref: LessonRef }[] = LESSONS.flatMap((ref) =>
  ref.lesson.sentences.map((s) => ({ s, ref }))
);

export function findLesson(id: string): LessonRef | undefined {
  return LESSONS.find((l) => l.lesson.id === id);
}

export function findUnit(id: string): Unit | undefined {
  return UNITS.find((u) => u.id === id);
}

/** words taught before (and including, when inclusive) the given lesson */
export function wordsUpTo(index: number, inclusive = true): Word[] {
  return LESSONS.filter((l) => (inclusive ? l.index <= index : l.index < index)).flatMap((l) => l.lesson.words);
}

export function sentencesUpTo(index: number): { s: Sentence; ref: LessonRef }[] {
  return ALL_SENTENCES.filter((x) => x.ref.index <= index);
}

// ---------- progress helpers ----------

export function isLessonDone(completed: Record<string, number>, id: string): boolean {
  return (completed[id] ?? 0) > 0;
}

/** index of the first lesson that is not completed (the "current" lesson) */
export function currentLessonIndex(completed: Record<string, number>): number {
  const i = LESSONS.findIndex((l) => !isLessonDone(completed, l.lesson.id));
  return i === -1 ? LESSONS.length : i;
}

export function isLessonUnlocked(completed: Record<string, number>, index: number): boolean {
  if (index === 0) return true;
  // unlocked if every earlier lesson is done
  return LESSONS.slice(0, index).every((l) => isLessonDone(completed, l.lesson.id));
}

export function unitDone(completed: Record<string, number>, unit: Unit): boolean {
  return unit.lessons.every((l) => isLessonDone(completed, l.id));
}

export function learnedWords(completed: Record<string, number>): Word[] {
  return LESSONS.filter((l) => isLessonDone(completed, l.lesson.id)).flatMap((l) => l.lesson.words);
}

// ---------- word hints (tap a word to see its meaning) ----------

const HINTS = new Map<string, string[]>();
function addHint(key: string, nl: string) {
  const k = key.toLowerCase();
  const list = HINTS.get(k) ?? [];
  if (!list.includes(nl)) list.push(nl);
  HINTS.set(k, list);
}
for (const w of ALL_WORDS) {
  addHint(w.sr, w.nl);
  for (const alt of w.srAlts ?? []) addHint(alt, w.nl);
}
for (const [k, v] of Object.entries(GLOSSARY)) for (const nl of v.split('|')) addHint(k, nl);

/** Multi-word phrases known in the hint dictionary, longest first */
const PHRASES = [...HINTS.keys()].filter((k) => k.includes(' ')).sort((a, b) => b.split(' ').length - a.split(' ').length);

export interface HintToken {
  text: string;
  hints: string[];
}

/** Splits a Serbian sentence into tokens with hints; multi-word phrases are grouped. */
export function hintTokens(sentence: string): HintToken[] {
  const raw = sentence.split(/(\s+)/).filter((x) => x.trim());
  const clean = raw.map((t) => tokenize(t)[0]?.toLowerCase() ?? '');
  const out: HintToken[] = [];
  let i = 0;
  while (i < raw.length) {
    let matched = false;
    for (const p of PHRASES) {
      const parts = p.split(' ');
      if (parts.every((part, j) => clean[i + j] === part)) {
        out.push({ text: raw.slice(i, i + parts.length).join(' '), hints: HINTS.get(p) ?? [] });
        i += parts.length;
        matched = true;
        break;
      }
    }
    if (matched) continue;
    out.push({ text: raw[i], hints: lookupHint(clean[i]) });
    i += 1;
  }
  return out;
}

export function lookupHint(token: string): string[] {
  const t = token.toLowerCase();
  if (!t) return [];
  const direct = HINTS.get(t);
  if (direct) return direct;
  // stem match: vodu ~ voda, jabuku ~ jabuka
  if (t.length >= 4) {
    for (const w of ALL_WORDS) {
      const sr = w.sr.toLowerCase();
      if (sr.includes(' ') || sr.length < 4) continue;
      if (sr.slice(0, -1) === t.slice(0, -1)) return [w.nl];
    }
  }
  return [];
}

/** ids of words that occur in a Serbian sentence */
export function wordsInSentence(sentence: string): string[] {
  const tokens = tokenize(sentence).map((t) => t.toLowerCase());
  const joined = ' ' + tokens.join(' ') + ' ';
  const ids: string[] = [];
  for (const w of ALL_WORDS) {
    const sr = w.sr.toLowerCase();
    if (sr.includes(' ')) {
      if (joined.includes(' ' + sr + ' ')) ids.push(w.id);
      continue;
    }
    const forms = [sr, ...(w.srAlts ?? []).map((x) => x.toLowerCase())];
    if (tokens.some((t) => forms.includes(t) || (t.length >= 4 && sr.length >= 4 && t.slice(0, -1) === sr.slice(0, -1)))) {
      ids.push(w.id);
    }
  }
  return ids;
}
