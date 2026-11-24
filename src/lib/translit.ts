// Serbian Latin <-> Cyrillic transliteration (one-to-one, apart from digraphs).

const L2C: Record<string, string> = {
  a: 'а', b: 'б', v: 'в', g: 'г', d: 'д', đ: 'ђ', e: 'е', ž: 'ж', z: 'з', i: 'и', j: 'ј',
  k: 'к', l: 'л', m: 'м', n: 'н', o: 'о', p: 'п', r: 'р', s: 'с', t: 'т', ć: 'ћ', u: 'у',
  f: 'ф', h: 'х', c: 'ц', č: 'ч', š: 'ш'
};
const DIGRAPHS: Record<string, string> = { lj: 'љ', nj: 'њ', dž: 'џ' };

/** Words in which n+j / d+ž are separate letters. Matched on lower-case stems. */
const DIGRAPH_EXCEPTIONS = ['injekc', 'konjunk', 'nadživ', 'nadžnj', 'podžnj', 'odžal', 'tanjug'];

const C2L: Record<string, string> = {};
for (const [l, c] of Object.entries(L2C)) C2L[c] = l;
for (const [l, c] of Object.entries(DIGRAPHS)) C2L[c] = l;

function matchCase(src: string, out: string): string {
  if (src === src.toLowerCase()) return out;
  if (src.length > 1 && src === src.toUpperCase()) return out.toUpperCase();
  // Title-case (e.g. "Lj" or "L")
  return out.charAt(0).toUpperCase() + out.slice(1);
}

function wordToCyr(word: string): string {
  const lower = word.toLowerCase();
  const noDigraphs = DIGRAPH_EXCEPTIONS.some((e) => lower.includes(e));
  let out = '';
  let i = 0;
  while (i < word.length) {
    const two = word.slice(i, i + 2);
    const twoLower = two.toLowerCase();
    if (!noDigraphs && DIGRAPHS[twoLower]) {
      out += matchCase(two, DIGRAPHS[twoLower]);
      i += 2;
      continue;
    }
    const ch = word[i];
    const lc = ch.toLowerCase();
    if (L2C[lc]) out += ch === lc ? L2C[lc] : L2C[lc].toUpperCase();
    else out += ch;
    i += 1;
  }
  return out;
}

export function toCyrillic(text: string): string {
  // Split into word / non-word chunks so the exception list can work per word.
  return text.replace(/[\p{L}]+/gu, (m) => wordToCyr(m));
}

export function toLatin(text: string): string {
  let out = '';
  for (const ch of text) {
    const lc = ch.toLowerCase();
    const l = C2L[lc];
    if (l === undefined) out += ch;
    else if (ch === lc) out += l;
    else out += l.charAt(0).toUpperCase() + l.slice(1);
  }
  return out;
}

export function hasCyrillic(text: string): boolean {
  return /[Ѐ-ӿ]/.test(text);
}

/** The 30 letters of the Serbian alphabet, in Cyrillic (azbuka) order. */
export const ALPHABET: { cyr: string; lat: string; sound: string; example: string; exampleNl: string }[] = [
  { cyr: 'А', lat: 'A', sound: 'a zoals in "kat"', example: 'auto', exampleNl: 'auto' },
  { cyr: 'Б', lat: 'B', sound: 'b zoals in "bal"', example: 'brat', exampleNl: 'broer' },
  { cyr: 'В', lat: 'V', sound: 'w/v zoals in "wit"', example: 'voda', exampleNl: 'water' },
  { cyr: 'Г', lat: 'G', sound: 'harde g zoals in het Engelse "go"', example: 'grad', exampleNl: 'stad' },
  { cyr: 'Д', lat: 'D', sound: 'd zoals in "dag"', example: 'dan', exampleNl: 'dag' },
  { cyr: 'Ђ', lat: 'Đ', sound: 'zachte dj, zoals in "Djokovic"', example: 'đak', exampleNl: 'scholier' },
  { cyr: 'Е', lat: 'E', sound: 'e zoals in "bed"', example: 'ekran', exampleNl: 'scherm' },
  { cyr: 'Ж', lat: 'Ž', sound: 'zj zoals in "garage"', example: 'žena', exampleNl: 'vrouw' },
  { cyr: 'З', lat: 'Z', sound: 'z zoals in "zon"', example: 'zub', exampleNl: 'tand' },
  { cyr: 'И', lat: 'I', sound: 'ie zoals in "die"', example: 'ime', exampleNl: 'naam' },
  { cyr: 'Ј', lat: 'J', sound: 'j zoals in "ja"', example: 'jaje', exampleNl: 'ei' },
  { cyr: 'К', lat: 'K', sound: 'k zoals in "kat"', example: 'kuća', exampleNl: 'huis' },
  { cyr: 'Л', lat: 'L', sound: 'l zoals in "lamp"', example: 'leto', exampleNl: 'zomer' },
  { cyr: 'Љ', lat: 'Lj', sound: 'lj zoals in "Ljubljana", één klank', example: 'ljubav', exampleNl: 'liefde' },
  { cyr: 'М', lat: 'M', sound: 'm zoals in "man"', example: 'more', exampleNl: 'zee' },
  { cyr: 'Н', lat: 'N', sound: 'n zoals in "neus"', example: 'nos', exampleNl: 'neus' },
  { cyr: 'Њ', lat: 'Nj', sound: 'nj zoals in "oranje", één klank', example: 'njegov', exampleNl: 'zijn (van hem)' },
  { cyr: 'О', lat: 'O', sound: 'o zoals in "pot"', example: 'otac', exampleNl: 'vader' },
  { cyr: 'П', lat: 'P', sound: 'p zoals in "pen"', example: 'pas', exampleNl: 'hond' },
  { cyr: 'Р', lat: 'R', sound: 'rollende r', example: 'riba', exampleNl: 'vis' },
  { cyr: 'С', lat: 'S', sound: 's zoals in "sok"', example: 'sok', exampleNl: 'sap' },
  { cyr: 'Т', lat: 'T', sound: 't zoals in "tas"', example: 'torta', exampleNl: 'taart' },
  { cyr: 'Ћ', lat: 'Ć', sound: 'zachte tj, zoals in "katje"', example: 'ćerka', exampleNl: 'dochter' },
  { cyr: 'У', lat: 'U', sound: 'oe zoals in "boek"', example: 'ulica', exampleNl: 'straat' },
  { cyr: 'Ф', lat: 'F', sound: 'f zoals in "fiets"', example: 'film', exampleNl: 'film' },
  { cyr: 'Х', lat: 'H', sound: 'ch zoals in "lachen"', example: 'hleb', exampleNl: 'brood' },
  { cyr: 'Ц', lat: 'C', sound: 'ts zoals in "iets"', example: 'cvet', exampleNl: 'bloem' },
  { cyr: 'Ч', lat: 'Č', sound: 'harde tsj zoals in "tsjilpen"', example: 'čaj', exampleNl: 'thee' },
  { cyr: 'Џ', lat: 'Dž', sound: 'harde dzj zoals in "jeans"', example: 'džem', exampleNl: 'jam' },
  { cyr: 'Ш', lat: 'Š', sound: 'sj zoals in "sjaal"', example: 'šuma', exampleNl: 'bos' }
];
