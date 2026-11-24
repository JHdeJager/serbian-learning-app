import { hashString, seeded } from './random';
import { parseDay } from './date';
import type { LeagueState } from './store';

export const LEAGUES = [
  { name: 'Subotica', color: '#cd7f32', emoji: '🥉' },
  { name: 'Novi Sad', color: '#9aa5b1', emoji: '🥈' },
  { name: 'Niš', color: '#f2b705', emoji: '🥇' },
  { name: 'Kragujevac', color: '#1c7ed6', emoji: '💎' },
  { name: 'Beograd', color: '#e03131', emoji: '👑' }
];

const NAMES = [
  'Milica', 'Luka', 'Sanne', 'Jovana', 'Daan', 'Stefan', 'Emma', 'Nikola', 'Fleur', 'Marko',
  'Tijana', 'Bram', 'Ana', 'Lars', 'Nemanja', 'Iris', 'Vuk', 'Noor', 'Sara', 'Thijs',
  'Dragana', 'Ruben', 'Katarina', 'Femke', 'Petar', 'Lotte', 'Aleksa', 'Julia', 'Teodora', 'Sem'
];
const AVATARS = ['🦊', '🐻', '🐼', '🐨', '🐯', '🦁', '🐸', '🐵', '🦉', '🐧', '🐙', '🦄', '🐢', '🐝', '🐬'];

export interface Competitor {
  name: string;
  avatar: string;
  xp: number;
  isMe: boolean;
}

function weekProgress(week: string, now = Date.now()): number {
  const start = parseDay(week).getTime();
  return Math.max(0, Math.min(1, (now - start) / (7 * 86400000)));
}

export function competitors(league: LeagueState, meName: string, progress?: number): Competitor[] {
  const rnd = seeded(hashString(league.week + ':' + league.tier));
  const p = progress ?? weekProgress(league.week);
  const names = NAMES.slice();
  const list: Competitor[] = [];
  for (let i = 0; i < 14; i++) {
    const idx = Math.floor(rnd() * names.length);
    const name = names.splice(idx, 1)[0];
    const avatar = AVATARS[Math.floor(rnd() * AVATARS.length)];
    // weekly target scales with tier
    const base = (40 + league.tier * 45) * (0.3 + rnd() * 2.2);
    const lazy = rnd() < 0.2; // some people barely play
    const target = lazy ? Math.floor(rnd() * 30) : Math.round(base);
    const curve = 0.6 + rnd() * 1.2;
    const xp = Math.round(target * Math.pow(p, curve));
    list.push({ name, avatar, xp, isMe: false });
  }
  list.push({ name: meName || 'Jij', avatar: '🦔', xp: league.xp, isMe: true });
  return list.sort((a, b) => b.xp - a.xp || (a.isMe ? -1 : 1));
}

export function finalRank(league: LeagueState): number {
  const list = competitors(league, 'me', 1);
  return list.findIndex((c) => c.isMe) + 1;
}

export function daysLeftInWeek(week: string): number {
  const end = parseDay(week).getTime() + 7 * 86400000;
  return Math.max(0, Math.ceil((end - Date.now()) / 86400000));
}
