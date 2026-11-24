import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { addDays, dayKey, daysBetween } from './date';

export const MAX_HEARTS = 5;
export const HEART_REFILL_MS = 30 * 60 * 1000;

export interface WordStat {
  /** 0..5 */
  s: number;
  seen: number;
  wrong: number;
  last: number;
}

export interface Settings {
  cyrillic: boolean;
  sound: boolean;
  listening: boolean;
  speaking: boolean;
  slowSpeech: boolean;
  unlimitedHearts: boolean;
}

export interface LessonResult {
  xp: number;
  correct: number;
  total: number;
  perfect: boolean;
  seconds: number;
  streakIncreased: boolean;
  newStreak: number;
}

export interface State {
  onboarded: boolean;
  name: string;
  dailyGoal: number;
  xp: number;
  hearts: number;
  heartsUpdatedAt: number;
  streak: number;
  longestStreak: number;
  lastActiveDay: string | null;
  streakFreezes: number;
  /** days that were saved by a streak freeze */
  frozenDays: string[];
  xpByDay: Record<string, number>;
  /** lessonId -> times completed */
  completed: Record<string, number>;
  /** unitId -> unit test passed */
  unitTests: Record<string, boolean>;
  /** chests (reward nodes) opened */
  chests: Record<string, boolean>;
  words: Record<string, WordStat>;
  /** recent mistakes: exercise keys (word ids or sentence texts) */
  mistakes: string[];
  lessonsDone: number;
  perfectLessons: number;
  minutesLearned: number;
  settings: Settings;
  createdAt: number;

  // actions
  finishOnboarding: (name: string, goal: number) => void;
  setDailyGoal: (goal: number) => void;
  setName: (name: string) => void;
  updateSettings: (s: Partial<Settings>) => void;
  syncHearts: () => void;
  loseHeart: () => void;
  gainHeart: () => void;
  recordWord: (id: string, correct: boolean) => void;
  addMistake: (key: string) => void;
  clearMistakes: (keys: string[]) => void;
  completeSession: (opts: {
    lessonId?: string;
    unitTestId?: string;
    baseXp: number;
    correct: number;
    total: number;
    seconds: number;
    healHeart?: boolean;
  }) => LessonResult;
  openChest: (id: string) => number;
  checkStreak: () => void;
  importState: (json: string) => boolean;
  resetAll: () => void;
}

const defaultSettings: Settings = {
  cyrillic: false,
  sound: true,
  listening: true,
  speaking: true,
  slowSpeech: false,
  unlimitedHearts: false
};

function initial() {
  const now = Date.now();
  return {
    onboarded: false,
    name: '',
    dailyGoal: 20,
    xp: 0,
    hearts: MAX_HEARTS,
    heartsUpdatedAt: now,
    streak: 0,
    longestStreak: 0,
    lastActiveDay: null as string | null,
    streakFreezes: 0,
    frozenDays: [] as string[],
    xpByDay: {} as Record<string, number>,
    completed: {} as Record<string, number>,
    unitTests: {} as Record<string, boolean>,
    chests: {} as Record<string, boolean>,
    words: {} as Record<string, WordStat>,
    mistakes: [] as string[],
    lessonsDone: 0,
    perfectLessons: 0,
    minutesLearned: 0,
    settings: defaultSettings,
    createdAt: now
  };
}

export const useStore = create<State>()(
  persist(
    (set, get) => ({
      ...initial(),

      finishOnboarding: (name, goal) => set({ onboarded: true, name: name.trim(), dailyGoal: goal }),
      setDailyGoal: (goal) => set({ dailyGoal: goal }),
      setName: (name) => set({ name }),
      updateSettings: (s) => set({ settings: { ...get().settings, ...s } }),

      syncHearts: () => {
        const { hearts, heartsUpdatedAt } = get();
        if (hearts >= MAX_HEARTS) {
          set({ heartsUpdatedAt: Date.now() });
          return;
        }
        const elapsed = Date.now() - heartsUpdatedAt;
        const gained = Math.floor(elapsed / HEART_REFILL_MS);
        if (gained > 0) {
          const newHearts = Math.min(MAX_HEARTS, hearts + gained);
          set({
            hearts: newHearts,
            heartsUpdatedAt: newHearts >= MAX_HEARTS ? Date.now() : heartsUpdatedAt + gained * HEART_REFILL_MS
          });
        }
      },
      loseHeart: () => {
        if (get().settings.unlimitedHearts) return;
        get().syncHearts();
        const { hearts } = get();
        if (hearts <= 0) return;
        set({ hearts: hearts - 1, heartsUpdatedAt: hearts >= MAX_HEARTS ? Date.now() : get().heartsUpdatedAt });
      },
      gainHeart: () => set({ hearts: Math.min(MAX_HEARTS, get().hearts + 1) }),
      recordWord: (id, correct) => {
        const words = { ...get().words };
        const cur = words[id] ?? { s: 0, seen: 0, wrong: 0, last: 0 };
        words[id] = {
          s: correct ? Math.min(5, cur.s + 1) : Math.max(0, cur.s - 2),
          seen: cur.seen + 1,
          wrong: cur.wrong + (correct ? 0 : 1),
          last: Date.now()
        };
        set({ words });
      },
      addMistake: (key) => {
        const mistakes = [key, ...get().mistakes.filter((k) => k !== key)].slice(0, 40);
        set({ mistakes });
      },
      clearMistakes: (keys) => set({ mistakes: get().mistakes.filter((k) => !keys.includes(k)) }),

      completeSession: ({ lessonId, unitTestId, baseXp, correct, total, seconds, healHeart }) => {
        get().checkStreak();
        const st = get();
        const today = dayKey();
        const perfect = correct === total && total > 0;
        const xp = baseXp + (perfect ? 5 : 0);

        const hadToday = (st.xpByDay[today] ?? 0) > 0;
        const streakIncreased = !hadToday;
        const newStreak = streakIncreased ? st.streak + 1 : st.streak;

        const completed = { ...st.completed };
        if (lessonId) completed[lessonId] = (completed[lessonId] ?? 0) + 1;
        const unitTests = { ...st.unitTests };
        if (unitTestId) unitTests[unitTestId] = true;

        set({
          xp: st.xp + xp,
          xpByDay: { ...st.xpByDay, [today]: (st.xpByDay[today] ?? 0) + xp },
          streak: newStreak,
          longestStreak: Math.max(st.longestStreak, newStreak),
          lastActiveDay: today,
          completed,
          unitTests,
          lessonsDone: st.lessonsDone + 1,
          perfectLessons: st.perfectLessons + (perfect ? 1 : 0),
          minutesLearned: st.minutesLearned + seconds / 60,
          hearts: healHeart ? Math.min(MAX_HEARTS, st.hearts + 1) : st.hearts
        });
        return { xp, correct, total, perfect, seconds, streakIncreased, newStreak };
      },

      openChest: (id) => {
        if (get().chests[id]) return 0;
        // a small XP bonus (not counted towards the daily goal / streak)
        const amount = 10 + Math.floor(Math.random() * 3) * 5;
        set({ chests: { ...get().chests, [id]: true }, xp: get().xp + amount });
        return amount;
      },

      checkStreak: () => {
        const { lastActiveDay, streak, streakFreezes, frozenDays } = get();
        if (!lastActiveDay || streak === 0) return;
        const today = dayKey();
        const gap = daysBetween(lastActiveDay, today);
        if (gap <= 1) return;
        const missed = gap - 1;
        if (missed <= streakFreezes) {
          const saved: string[] = [];
          for (let i = 1; i <= missed; i++) saved.push(addDays(lastActiveDay, i));
          set({
            streakFreezes: streakFreezes - missed,
            frozenDays: [...frozenDays, ...saved].slice(-60),
            lastActiveDay: addDays(today, -1)
          });
        } else {
          set({ streak: 0 });
        }
      },

      importState: (json) => {
        try {
          const data = JSON.parse(json);
          const st = data.state ?? data;
          if (typeof st !== 'object' || typeof st.xp !== 'number') return false;
          set({ ...initial(), ...st, settings: { ...defaultSettings, ...(st.settings ?? {}) } });
          return true;
        } catch {
          return false;
        }
      },
      resetAll: () => set({ ...initial() })
    }),
    {
      name: 'govori-progress',
      version: 1,
      merge: (persisted, current) => {
        const p = (persisted ?? {}) as Partial<State>;
        return { ...current, ...p, settings: { ...defaultSettings, ...(p.settings ?? {}) } };
      }
    }
  )
);

export function exportState(): string {
  const st = useStore.getState();
  const data: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(st)) if (typeof v !== 'function') data[k] = v;
  return JSON.stringify({ app: 'govori', exportedAt: new Date().toISOString(), state: data }, null, 1);
}

export function todayXp(st: Pick<State, 'xpByDay'>): number {
  return st.xpByDay[dayKey()] ?? 0;
}
