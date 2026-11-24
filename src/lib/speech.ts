import { toCyrillic, toLatin } from './translit';

let voices: SpeechSynthesisVoice[] = [];
let chosen: SpeechSynthesisVoice | null = null;
const listeners = new Set<() => void>();

function pickVoice() {
  if (typeof speechSynthesis === 'undefined') return;
  voices = speechSynthesis.getVoices();
  const byLang = (prefix: string) => voices.filter((v) => v.lang.toLowerCase().replace('_', '-').startsWith(prefix));
  // Serbian first, then Croatian / Bosnian / Montenegrin (very close, read Latin script fine)
  const prefer = [...byLang('sr'), ...byLang('hr'), ...byLang('bs'), ...byLang('sh'), ...byLang('cnr')];
  // Prefer local voices that sound natural (Google / enhanced)
  prefer.sort((a, b) => score(b) - score(a));
  chosen = prefer[0] ?? null;
  listeners.forEach((l) => l());
}

function score(v: SpeechSynthesisVoice): number {
  let s = 0;
  const lang = v.lang.toLowerCase();
  if (lang.startsWith('sr')) s += 10;
  if (/google|enhanced|premium|natural/i.test(v.name)) s += 3;
  if (v.localService) s += 1;
  return s;
}

if (typeof speechSynthesis !== 'undefined') {
  pickVoice();
  speechSynthesis.addEventListener?.('voiceschanged', pickVoice);
}

export function hasSerbianVoice(): boolean {
  return chosen !== null;
}

export function voiceName(): string | null {
  return chosen ? `${chosen.name} (${chosen.lang})` : null;
}

export function onVoicesChanged(fn: () => void): () => void {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

export function speak(text: string, opts: { slow?: boolean } = {}): void {
  if (typeof speechSynthesis === 'undefined') return;
  speechSynthesis.cancel();
  const isSerbianVoice = chosen?.lang.toLowerCase().startsWith('sr');
  // Serbian voices are most reliable with Cyrillic; Croatian/Bosnian voices need Latin.
  const spoken = isSerbianVoice ? toCyrillic(toLatin(text)) : toLatin(text);
  const u = new SpeechSynthesisUtterance(spoken);
  if (chosen) {
    u.voice = chosen;
    u.lang = chosen.lang;
  } else {
    u.lang = 'sr-RS';
  }
  u.rate = opts.slow ? 0.55 : 0.9;
  speechSynthesis.speak(u);
}

// ---------- Speech recognition ----------
type SR = {
  lang: string;
  interimResults: boolean;
  maxAlternatives: number;
  continuous: boolean;
  start(): void;
  stop(): void;
  abort(): void;
  onresult: ((e: { results: ArrayLike<ArrayLike<{ transcript: string }>> }) => void) | null;
  onerror: ((e: { error: string }) => void) | null;
  onend: (() => void) | null;
};

function getRecognitionCtor(): (new () => SR) | null {
  const w = window as unknown as { SpeechRecognition?: new () => SR; webkitSpeechRecognition?: new () => SR };
  return w.SpeechRecognition ?? w.webkitSpeechRecognition ?? null;
}

export function canRecognize(): boolean {
  return typeof window !== 'undefined' && getRecognitionCtor() !== null;
}

export function recognize(onDone: (alternatives: string[] | null, error?: string) => void): () => void {
  const Ctor = getRecognitionCtor();
  if (!Ctor) {
    onDone(null, 'unsupported');
    return () => {};
  }
  const rec = new Ctor();
  rec.lang = 'sr-RS';
  rec.interimResults = false;
  rec.maxAlternatives = 5;
  rec.continuous = false;
  let finished = false;
  rec.onresult = (e) => {
    finished = true;
    const alts: string[] = [];
    const first = e.results[0];
    for (let i = 0; i < first.length; i++) alts.push(first[i].transcript);
    onDone(alts);
  };
  rec.onerror = (e) => {
    if (finished) return;
    finished = true;
    onDone(null, e.error);
  };
  rec.onend = () => {
    if (!finished) {
      finished = true;
      onDone([]);
    }
  };
  rec.start();
  return () => rec.abort();
}
