import { toLatin } from './translit';

const DIACRITICS: Record<string, string> = { č: 'c', ć: 'c', š: 's', ž: 'z', đ: 'dj' };

/** lower-case, Latin script, no punctuation, single spaces */
export function normalize(text: string): string {
  return toLatin(text)
    .toLowerCase()
    .replace(/[’‘`´]/g, "'")
    .replace(/[.,!?¿¡;:"“”„«»()–—-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export function stripDiacritics(text: string): string {
  return text.replace(/[čćšžđ]/g, (c) => DIACRITICS[c]);
}

/** Removes Dutch/Serbian accents like é, ë as well */
function foldAccents(text: string): string {
  return text.normalize('NFD').replace(/[̀-ͯ]/g, '');
}

export function levenshtein(a: string, b: string): number {
  if (a === b) return 0;
  const m = a.length;
  const n = b.length;
  if (!m) return n;
  if (!n) return m;
  let prev = Array.from({ length: n + 1 }, (_, i) => i);
  for (let i = 1; i <= m; i++) {
    const cur = [i];
    for (let j = 1; j <= n; j++) {
      cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
    }
    prev = cur;
  }
  return prev[n];
}

export type GradeResult =
  | { correct: true; kind: 'exact'; best: string }
  | { correct: true; kind: 'diacritics' | 'typo'; best: string }
  | { correct: false; best: string };

/**
 * Grades a free-text answer against a list of accepted answers.
 * - exact (after normalisation)  → correct
 * - only diacritics missing      → correct, with a hint
 * - a small typo                 → correct, with a hint
 */
export function grade(answer: string, accepted: string[]): GradeResult {
  const a = normalize(answer);
  const normAccepted = accepted.map((x) => ({ raw: x, n: normalize(x) }));
  for (const acc of normAccepted) if (acc.n === a) return { correct: true, kind: 'exact', best: acc.raw };
  if (!a) return { correct: false, best: accepted[0] };

  const aFold = foldAccents(stripDiacritics(a));
  for (const acc of normAccepted) {
    if (foldAccents(stripDiacritics(acc.n)) === aFold) {
      // Dutch accents (é/ë) are not worth a warning
      const srOnly = (x: string) => x.replace(/[^čćšžđ]/g, '');
      const onlyNlAccents = srOnly(acc.n) === srOnly(a);
      return { correct: true, kind: onlyNlAccents ? 'exact' : 'diacritics', best: acc.raw };
    }
  }
  for (const acc of normAccepted) {
    const target = foldAccents(stripDiacritics(acc.n));
    const allowed = target.length >= 12 ? 2 : target.length >= 5 ? 1 : 0;
    if (allowed > 0 && levenshtein(aFold, target) <= allowed) {
      return { correct: true, kind: 'typo', best: acc.raw };
    }
  }
  // closest suggestion
  let best = accepted[0];
  let bestD = Infinity;
  for (const acc of normAccepted) {
    const d = levenshtein(a, acc.n);
    if (d < bestD) {
      bestD = d;
      best = acc.raw;
    }
  }
  return { correct: false, best };
}

/** Split a sentence into word tiles (punctuation removed, original casing kept). */
export function tokenize(sentence: string): string[] {
  return sentence
    .replace(/[.,!?;:"“”„«»()]/g, ' ')
    .split(/\s+/)
    .filter(Boolean);
}

/** Compare a tile answer with accepted answers. */
export function gradeTiles(tiles: string[], accepted: string[]): boolean {
  const a = normalize(tiles.join(' '));
  return accepted.some((x) => normalize(x) === a);
}
