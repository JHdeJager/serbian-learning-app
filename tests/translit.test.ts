import { describe, expect, test } from 'vitest';
import { toCyrillic, toLatin } from '../src/lib/translit';

describe('transliteration', () => {
  test('latin to cyrillic', () => {
    expect(toCyrillic('Zdravo, kako si?')).toBe('Здраво, како си?');
    expect(toCyrillic('ljubav njegov džem')).toBe('љубав његов џем');
    expect(toCyrillic('Ljubljana')).toBe('Љубљана');
    expect(toCyrillic('ćerka đak čaj šuma žena')).toBe('ћерка ђак чај шума жена');
  });
  test('digraph exceptions', () => {
    expect(toCyrillic('injekcija')).toBe('инјекција');
  });
  test('round trip', () => {
    const s = 'Dobro jutro! Ja sam iz Holandije. Ćao, vidimo se, prijatelju!';
    expect(toLatin(toCyrillic(s))).toBe(s);
  });
});
