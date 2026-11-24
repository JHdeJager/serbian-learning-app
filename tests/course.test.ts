import { describe, expect, test } from 'vitest';
import { ALL_WORDS, LESSONS, UNITS } from '../src/data/course';
import { buildLessonSession, buildLetterSession, buildUnitTest, LETTER_LESSONS } from '../src/lib/generator';
import { gradeTiles, tokenize, normalize } from '../src/lib/grading';

const opts = { listening: true, speaking: true };

describe('course content', () => {
  test('has units and lessons', () => {
    expect(UNITS.length).toBeGreaterThanOrEqual(12);
    expect(LESSONS.length).toBeGreaterThanOrEqual(40);
  });
  test('word ids are unique', () => {
    const ids = ALL_WORDS.map((w) => w.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
  test('every lesson has enough words and sentences', () => {
    for (const l of LESSONS) {
      expect(l.lesson.words.length, l.lesson.id).toBeGreaterThanOrEqual(5);
      expect(l.lesson.sentences.length, l.lesson.id).toBeGreaterThanOrEqual(6);
    }
  });
  test('sentences end with punctuation and start with a capital', () => {
    for (const l of LESSONS)
      for (const s of l.lesson.sentences) {
        expect(/[.!?]$/.test(s.sr), s.sr).toBe(true);
        expect(/[.!?]$/.test(s.nl), s.nl).toBe(true);
        expect(s.sr[0], s.sr).toBe(s.sr[0].toUpperCase());
      }
  });
  test('no duplicate sentences', () => {
    const all = LESSONS.flatMap((l) => l.lesson.sentences.map((s) => normalize(s.sr)));
    const dup = all.filter((s, i) => all.indexOf(s) !== i);
    expect(dup).toEqual([]);
  });
});

describe('session generation', () => {
  test('every lesson builds a solvable session (several times)', () => {
    for (const l of LESSONS) {
      for (const times of [0, 1, 2]) {
        const ex = buildLessonSession(l.lesson.id, times, opts);
        expect(ex.length, l.lesson.id).toBeGreaterThanOrEqual(10);
        for (const e of ex) {
          if (e.type === 'tiles') {
            // the canonical answer can be built from the tiles
            const tiles = e.tiles.map((t) => t.toLowerCase());
            for (const t of tokenize(e.answer)) {
              const i = tiles.indexOf(t.toLowerCase());
              expect(i, `${t} in ${e.answer} / ${e.tiles}`).toBeGreaterThanOrEqual(0);
              tiles.splice(i, 1);
            }
            expect(gradeTiles(tokenize(e.answer), e.accepted)).toBe(true);
          }
          if (e.type === 'choice' || e.type === 'pictures' || e.type === 'fill') {
            expect(e.options.filter((o) => o.correct).length).toBe(1);
            const texts = e.options.map((o) => normalize(o.text));
            expect(new Set(texts).size, JSON.stringify(e.options)).toBe(texts.length);
          }
          if (e.type === 'pictures') {
            const em = e.options.map((o) => o.emoji);
            expect(new Set(em).size).toBe(em.length);
          }
          if (e.type === 'match') {
            const rights = e.pairs.map((p) => normalize(p.right));
            expect(new Set(rights).size).toBe(rights.length);
          }
        }
      }
    }
  });
  test('unit tests and letters build', () => {
    for (const u of UNITS) expect(buildUnitTest([u.id], opts).length).toBeGreaterThanOrEqual(10);
    for (const l of LETTER_LESSONS) expect(buildLetterSession(l.id).length).toBeGreaterThanOrEqual(8);
  });
});
