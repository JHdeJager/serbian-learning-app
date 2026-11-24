import type { Unit, UnitInput, Word, Sentence } from './types';

/** w('voda', 'water', '💧') */
export function w(sr: string, nl: string, emoji?: string, extra: Partial<Word> = {}): Omit<Word, 'id'> {
  return { sr, nl, emoji, ...extra };
}

/** s('Pijem vodu.', 'Ik drink water.', { srAlts: [...] }) */
export function s(sr: string, nl: string, extra: Partial<Sentence> = {}): Sentence {
  return { sr, nl, ...extra };
}

export function unit(input: UnitInput): Unit {
  return {
    ...input,
    lessons: input.lessons.map((l, i) => ({
      id: `${input.id}-l${i + 1}`,
      title: l.title,
      sentences: l.sentences,
      words: l.words.map((wd) => ({ ...wd, id: `${input.id}:${wd.sr}` }))
    }))
  };
}
