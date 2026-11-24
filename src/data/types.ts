export interface Word {
  /** unique id (generated: unitId + ':' + sr) */
  id: string;
  /** Serbian, Latin script */
  sr: string;
  /** Dutch translation (primary) */
  nl: string;
  /** other accepted Dutch translations */
  nlAlts?: string[];
  /** other accepted Serbian forms */
  srAlts?: string[];
  emoji?: string;
  /** short extra note shown on the intro card, e.g. "(m.)" */
  note?: string;
}

export interface Sentence {
  sr: string;
  nl: string;
  srAlts?: string[];
  nlAlts?: string[];
}

export interface Lesson {
  id: string;
  title: string;
  words: Word[];
  sentences: Sentence[];
}

export interface GuideSection {
  title: string;
  /** paragraphs; a paragraph starting with '|' is rendered as a table row: | sr | nl */
  body: string[];
  examples?: { sr: string; nl: string }[];
}

export interface Unit {
  id: string;
  title: string;
  description: string;
  emoji: string;
  color: string;
  guide: GuideSection[];
  lessons: Lesson[];
}

export interface UnitInput {
  id: string;
  title: string;
  description: string;
  emoji: string;
  color: string;
  guide: GuideSection[];
  lessons: {
    title: string;
    words: Omit<Word, 'id'>[];
    sentences: Sentence[];
  }[];
}
