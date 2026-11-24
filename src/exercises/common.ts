import type { Exercise } from '../lib/generator';

export interface CheckResult {
  correct: boolean;
  /** the correct answer, shown in the feedback sheet */
  answer?: string;
  answerLang?: 'sr' | 'nl' | 'cyr';
  /** extra remark, e.g. about a typo */
  hint?: string;
  /** when true this exercise is skipped without penalty */
  skipped?: boolean;
}

export interface ExProps<T extends Exercise['type']> {
  ex: Extract<Exercise, { type: T }>;
  locked: boolean;
  setReady: (check: (() => CheckResult) | null) => void;
  /** for exercises that finish on their own (match, speak) */
  finish: (r: CheckResult) => void;
}
