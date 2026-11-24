import { describe, expect, test } from 'vitest';
import { grade, gradeTiles, normalize } from '../src/lib/grading';
import { expandNl } from '../src/lib/generator';

describe('grading', () => {
  test('normalize', () => {
    expect(normalize('  Zdravo,   Ana! ')).toBe('zdravo ana');
    expect(normalize('Здраво')).toBe('zdravo');
  });
  test('exact', () => {
    expect(grade('pijem vodu', ['Pijem vodu.']).correct).toBe(true);
  });
  test('missing diacritics accepted with hint', () => {
    const r = grade('cao', ['Ćao!']);
    expect(r.correct).toBe(true);
    expect(r.correct && r.kind).toBe('diacritics');
  });
  test('typo accepted', () => {
    const r = grade('Ik drink watter', ['Ik drink water.']);
    expect(r.correct && r.kind).toBe('typo');
  });
  test('wrong answer', () => {
    expect(grade('Ik eet brood', ['Ik drink water.']).correct).toBe(false);
  });
  test('short words need to be exact', () => {
    expect(grade('ne', ['da']).correct).toBe(false);
  });
  test('cyrillic input accepted', () => {
    expect(grade('Пијем воду', ['Pijem vodu.']).correct).toBe(true);
  });
  test('tiles', () => {
    expect(gradeTiles(['Pijem', 'vodu'], ['Pijem vodu.'])).toBe(true);
    expect(gradeTiles(['vodu', 'Pijem'], ['Pijem vodu.'])).toBe(false);
  });
  test('dutch alternatives', () => {
    const alts = expandNl(['Zij heeft een zoon.']);
    expect(alts.map(normalize)).toContain('ze heeft een zoon');
    const alts2 = expandNl(['Drink jij melk?']);
    expect(alts2.map(normalize)).toContain('drink je melk');
  });
});
