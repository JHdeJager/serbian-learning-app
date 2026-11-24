import { useStore } from './store';

let ctx: AudioContext | null = null;

function ac(): AudioContext | null {
  if (!useStore.getState().settings.sound) return null;
  try {
    if (!ctx) ctx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    if (ctx.state === 'suspended') void ctx.resume();
    return ctx;
  } catch {
    return null;
  }
}

function tone(freq: number, start: number, dur: number, type: OscillatorType = 'sine', gain = 0.18) {
  const c = ac();
  if (!c) return;
  const t0 = c.currentTime + start;
  const o = c.createOscillator();
  const g = c.createGain();
  o.type = type;
  o.frequency.setValueAtTime(freq, t0);
  g.gain.setValueAtTime(0, t0);
  g.gain.linearRampToValueAtTime(gain, t0 + 0.015);
  g.gain.exponentialRampToValueAtTime(0.001, t0 + dur);
  o.connect(g).connect(c.destination);
  o.start(t0);
  o.stop(t0 + dur + 0.05);
}

export const sfx = {
  correct() {
    tone(784, 0, 0.12, 'triangle');
    tone(1175, 0.09, 0.22, 'triangle');
  },
  wrong() {
    tone(220, 0, 0.18, 'square', 0.08);
    tone(185, 0.12, 0.25, 'square', 0.08);
  },
  tap() {
    tone(660, 0, 0.05, 'sine', 0.06);
  },
  complete() {
    [523, 659, 784, 1047].forEach((f, i) => tone(f, i * 0.11, 0.3, 'triangle', 0.16));
    tone(1319, 0.5, 0.5, 'triangle', 0.12);
  },
  match() {
    tone(880, 0, 0.08, 'sine', 0.1);
    tone(1320, 0.06, 0.12, 'sine', 0.08);
  },
  fail() {
    [392, 330, 262].forEach((f, i) => tone(f, i * 0.16, 0.3, 'triangle', 0.12));
  }
};

export function vibrate(ms: number | number[]) {
  try {
    navigator.vibrate?.(ms);
  } catch {
    /* ignore */
  }
}
