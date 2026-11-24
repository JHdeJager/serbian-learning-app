import { useEffect, useMemo, useRef, useState } from 'react';
import type { ExProps } from './common';
import { HintSentence, Txt, useScript } from '../components/Sr';
import { Mascot } from '../components/Mascot';
import { MicIcon, SpeakerIcon } from '../components/Icons';
import { canRecognize, hasSerbianVoice, recognize, speak } from '../lib/speech';
import { grade, gradeTiles, levenshtein, normalize } from '../lib/grading';
import { sfx } from '../lib/sound';
import { useStore } from '../lib/store';
import { toCyrillic } from '../lib/translit';

function useSpeechEnabled() {
  return useStore((s) => s.settings.listening) && hasSerbianVoice();
}

export function SpeakBtn({ text, big, slow }: { text: string; big?: boolean; slow?: boolean }) {
  return (
    <button
      type="button"
      className={`speaker ${big ? 'big' : ''} ${slow ? 'slow' : ''}`}
      onClick={(e) => {
        e.stopPropagation();
        speak(text, { slow });
      }}
      aria-label={slow ? 'Langzaam afspelen' : 'Afspelen'}
    >
      {slow ? '🐢' : <SpeakerIcon />}
    </button>
  );
}

/** keyboard shortcuts 1-9 for option lists */
function useNumberKeys(count: number, onPick: (i: number) => void, disabled: boolean) {
  useEffect(() => {
    if (disabled) return;
    const h = (e: KeyboardEvent) => {
      if ((e.target as HTMLElement)?.tagName === 'TEXTAREA' || (e.target as HTMLElement)?.tagName === 'INPUT') return;
      const n = Number(e.key);
      if (n >= 1 && n <= count) onPick(n - 1);
    };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [count, onPick, disabled]);
}

// ------------------------------------------------------------------
export function PicturesEx({ ex, locked, setReady }: ExProps<'pictures'>) {
  const [sel, setSel] = useState<number | null>(null);
  const script = useScript();
  const pickIt = (i: number) => {
    if (locked) return;
    setSel(i);
    sfx.tap();
    speak(ex.options[i].speak);
  };
  useNumberKeys(ex.options.length, pickIt, locked);
  useEffect(() => {
    setReady(
      sel === null
        ? null
        : () => {
            const correct = ex.options[sel].correct;
            const right = ex.options.find((o) => o.correct)!;
            return { correct, answer: right.text, answerLang: 'sr' };
          }
    );
  }, [sel, ex, setReady]);
  return (
    <div className="exercise">
      {ex.isNew && <div className="new-badge">✨ Nieuw woord</div>}
      <h1>Welke is "{ex.prompt}"?</h1>
      <div className="pictures">
        {ex.options.map((o, i) => (
          <button key={i} className={`picture ${sel === i ? 'selected' : ''}`} onClick={() => pickIt(i)} disabled={locked}>
            <span className="pic">{o.emoji}</span>
            <span>{script(o.text)}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

// ------------------------------------------------------------------
export function ChoiceEx({ ex, locked, setReady }: ExProps<'choice'>) {
  const [sel, setSel] = useState<number | null>(null);
  const listening = useSpeechEnabled();
  useEffect(() => {
    if (ex.speak && listening && ex.promptLang !== 'nl') speak(ex.speak);
  }, [ex, listening]);
  const pickIt = (i: number) => {
    if (locked) return;
    setSel(i);
    sfx.tap();
    if (ex.options[i].lang === 'sr') speak(ex.options[i].text);
  };
  useNumberKeys(ex.options.length, pickIt, locked);
  useEffect(() => {
    setReady(
      sel === null
        ? null
        : () => {
            const right = ex.options.find((o) => o.correct)!;
            return { correct: ex.options[sel].correct, answer: right.text, answerLang: right.lang };
          }
    );
  }, [sel, ex, setReady]);
  return (
    <div className="exercise">
      {ex.isNew && <div className="new-badge">✨ Nieuw</div>}
      <h1>{ex.title}</h1>
      {!(ex.promptLang === 'nl' && ex.title.includes(`"${ex.prompt}"`)) && (
        <div className="big-prompt" style={ex.promptLang === 'cyr' ? { fontSize: 44 } : undefined}>
          {ex.speak && listening && <SpeakBtn text={ex.speak} />}
          <span>{ex.promptLang === 'sr' ? <HintSentence text={ex.prompt} /> : ex.prompt}</span>
        </div>
      )}
      {ex.note && <div className="note">{ex.note}</div>}
      <div className="options">
        {ex.options.map((o, i) => (
          <button key={i} className={`option ${sel === i ? 'selected' : ''}`} onClick={() => pickIt(i)} disabled={locked}>
            <span className="num">{i + 1}</span>
            <span style={o.lang === 'cyr' ? { fontSize: 26 } : undefined}>
              <Txt text={o.text} lang={o.lang} />
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

// ------------------------------------------------------------------
export function MatchEx({ ex, finish }: ExProps<'match'>) {
  const right = useMemo(() => [...ex.pairs].sort(() => Math.random() - 0.5), [ex]);
  const left = useMemo(() => [...ex.pairs].sort(() => Math.random() - 0.5), [ex]);
  const [selL, setSelL] = useState<string | null>(null);
  const [selR, setSelR] = useState<string | null>(null);
  const [done, setDone] = useState<string[]>([]);
  const [flash, setFlash] = useState<{ ids: string[]; good: boolean } | null>(null);
  const mistakes = useRef(0);
  const script = useScript();

  useEffect(() => {
    if (selL && selR) {
      if (selL === selR) {
        sfx.match();
        setFlash({ ids: [selL], good: true });
        const nd = [...done, selL];
        setTimeout(() => {
          setDone(nd);
          setFlash(null);
          if (nd.length === ex.pairs.length) finish({ correct: mistakes.current <= 1 });
        }, 250);
      } else {
        sfx.wrong();
        mistakes.current += 1;
        setFlash({ ids: [selL + ':L', selR + ':R'], good: false });
        setTimeout(() => setFlash(null), 400);
      }
      setSelL(null);
      setSelR(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selL, selR]);

  const cls = (id: string, side: 'L' | 'R', sel: string | null) => {
    let c = 'match-item';
    if (done.includes(id)) c += ' done';
    else if (sel === id) c += ' selected';
    if (flash?.good && flash.ids.includes(id)) c += ' flash-good';
    if (flash && !flash.good && flash.ids.includes(id + ':' + side)) c += ' flash-bad';
    return c;
  };

  const display = (text: string, lang: 'sr' | 'nl' | 'cyr') => (lang === 'sr' ? script(text) : text);

  return (
    <div className="exercise">
      <h1>Koppel de paren</h1>
      <div className="match-grid">
        <div className="match-col">
          {left.map((p) => (
            <button
              key={p.id}
              className={cls(p.id, 'L', selL)}
              style={p.leftLang === 'cyr' ? { fontSize: 26 } : undefined}
              onClick={() => {
                setSelL(p.id);
                if (p.leftLang === 'sr') speak(p.left);
              }}
            >
              {display(p.left, p.leftLang)}
            </button>
          ))}
        </div>
        <div className="match-col">
          {right.map((p) => (
            <button key={p.id} className={cls(p.id, 'R', selR)} onClick={() => setSelR(p.id)}>
              {display(p.right, p.rightLang)}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ------------------------------------------------------------------
function ListenPrompt({ text }: { text: string }) {
  useEffect(() => {
    const t = setTimeout(() => speak(text), 250);
    return () => clearTimeout(t);
  }, [text]);
  return (
    <div className="listen-row">
      <SpeakBtn text={text} big />
      <SpeakBtn text={text} slow />
    </div>
  );
}

function SrPrompt({ text, cyrillic }: { text: string; cyrillic?: boolean }) {
  const listening = useSpeechEnabled();
  useEffect(() => {
    if (listening) speak(text);
  }, [text, listening]);
  return (
    <div className="prompt-row">
      <Mascot size={96} mood="happy" />
      <div className="bubble">
        {listening && <SpeakBtn text={text} />}
        <HintSentence text={text} forceCyrillic={cyrillic} />
      </div>
    </div>
  );
}

function NlPrompt({ text }: { text: string }) {
  return (
    <div className="prompt-row">
      <Mascot size={96} mood="think" />
      <div className="bubble">{text}</div>
    </div>
  );
}

export function TilesEx({ ex, locked, setReady }: ExProps<'tiles'>) {
  const [chosen, setChosen] = useState<number[]>([]);
  const script = useScript();
  const tileLang = ex.mode === 'sr-nl' ? 'nl' : 'sr';
  const isCyrPrompt = ex.prompt !== ex.sr && ex.mode === 'sr-nl' && ex.prompt !== '';

  useEffect(() => {
    setReady(
      chosen.length === 0
        ? null
        : () => {
            const tiles = chosen.map((i) => ex.tiles[i]);
            const correct = gradeTiles(tiles, ex.accepted);
            return { correct, answer: ex.answer, answerLang: tileLang };
          }
    );
  }, [chosen, ex, setReady, tileLang]);

  const add = (i: number) => {
    if (locked || chosen.includes(i)) return;
    sfx.tap();
    setChosen([...chosen, i]);
    if (tileLang === 'sr') speak(ex.tiles[i]);
  };
  const remove = (i: number) => {
    if (locked) return;
    setChosen(chosen.filter((x) => x !== i));
  };

  // physical keyboard: backspace removes last tile
  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.key === 'Backspace' && !locked) setChosen((c) => c.slice(0, -1));
    };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [locked]);

  const show = (t: string) => (tileLang === 'sr' ? script(t) : t);

  return (
    <div className="exercise">
      <h1>{ex.mode === 'listen' ? 'Wat hoor je?' : 'Vertaal deze zin'}</h1>
      {ex.mode === 'listen' ? (
        <ListenPrompt text={ex.sr} />
      ) : ex.mode === 'sr-nl' ? (
        isCyrPrompt ? <SrPrompt text={ex.sr} cyrillic /> : <SrPrompt text={ex.sr} />
      ) : (
        <NlPrompt text={ex.prompt} />
      )}
      <div className="answer-area">
        {chosen.map((i) => (
          <button key={i} className="tile" onClick={() => remove(i)} disabled={locked}>
            {show(ex.tiles[i])}
          </button>
        ))}
      </div>
      <div className="tile-bank">
        {ex.tiles.map((t, i) => (
          <button key={i} className={`tile ${chosen.includes(i) ? 'used' : ''}`} onClick={() => add(i)} disabled={locked}>
            {show(t)}
          </button>
        ))}
      </div>
    </div>
  );
}

// ------------------------------------------------------------------
const SPECIAL = ['č', 'ć', 'š', 'ž', 'đ'];
const SPECIAL_CYR = ['ђ', 'ж', 'љ', 'њ', 'ћ', 'ч', 'џ', 'ш'];

export function TypeEx({ ex, locked, setReady }: ExProps<'type'>) {
  const [value, setValue] = useState('');
  const ref = useRef<HTMLTextAreaElement>(null);
  const cyr = useStore((s) => s.settings.cyrillic);

  useEffect(() => {
    // focus without scrolling on mobile
    const t = setTimeout(() => ref.current?.focus({ preventScroll: true }), 200);
    return () => clearTimeout(t);
  }, [ex]);

  useEffect(() => {
    setReady(
      value.trim() === ''
        ? null
        : () => {
            const r = grade(value, ex.accepted);
            if (!r.correct) return { correct: false, answer: ex.answer, answerLang: ex.answerLang };
            if (r.kind === 'diacritics')
              return { correct: true, answer: r.best, answerLang: ex.answerLang, hint: 'Let op de speciale letters (č, ć, š, ž, đ)!' };
            if (r.kind === 'typo') return { correct: true, answer: r.best, answerLang: ex.answerLang, hint: 'Je had een kleine typfout.' };
            return { correct: true };
          }
    );
  }, [value, ex, setReady]);

  const insert = (ch: string) => {
    const el = ref.current;
    if (!el) return setValue(value + ch);
    const start = el.selectionStart ?? value.length;
    const end = el.selectionEnd ?? value.length;
    const nv = value.slice(0, start) + ch + value.slice(end);
    setValue(nv);
    requestAnimationFrame(() => {
      el.focus();
      el.setSelectionRange(start + ch.length, start + ch.length);
    });
  };

  const isWord = !ex.prompt.includes(' ') || ex.key.includes(':');
  const title =
    ex.mode === 'listen'
      ? 'Typ wat je hoort'
      : ex.answerLang === 'sr'
        ? isWord && ex.key.includes(':')
          ? `Hoe zeg je "${ex.prompt}" in het Servisch?`
          : 'Schrijf dit in het Servisch'
        : 'Schrijf dit in het Nederlands';

  return (
    <div className="exercise">
      <h1>{title}</h1>
      {ex.mode === 'listen' ? <ListenPrompt text={ex.sr} /> : ex.mode === 'sr-nl' ? <SrPrompt text={ex.sr} /> : <NlPrompt text={ex.prompt} />}
      <textarea
        ref={ref}
        className="type-input"
        value={value}
        disabled={locked}
        placeholder={ex.answerLang === 'sr' ? (cyr ? 'Typ in het Servisch (Latijn of Cyrillisch)' : 'Typ in het Servisch') : 'Typ in het Nederlands'}
        onChange={(e) => setValue(e.target.value.replace(/\n/g, ''))}
        onKeyDown={(e) => {
          if (e.key === 'Enter') e.preventDefault();
        }}
        autoCapitalize="off"
        autoComplete="off"
        autoCorrect="off"
        spellCheck={false}
        lang={ex.answerLang === 'sr' ? 'sr-Latn' : 'nl'}
      />
      {ex.answerLang === 'sr' && (
        <div className="special-keys">
          {(cyr ? SPECIAL_CYR : SPECIAL).map((c) => (
            <button key={c} type="button" onClick={() => insert(c)} disabled={locked}>
              {c}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ------------------------------------------------------------------
export function FillEx({ ex, locked, setReady }: ExProps<'fill'>) {
  const [sel, setSel] = useState<number | null>(null);
  const script = useScript();
  const pickIt = (i: number) => {
    if (locked) return;
    setSel(i);
    sfx.tap();
    speak(ex.options[i].text);
  };
  useNumberKeys(ex.options.length, pickIt, locked);
  useEffect(() => {
    setReady(sel === null ? null : () => ({ correct: ex.options[sel].correct, answer: ex.sr, answerLang: 'sr' }));
  }, [sel, ex, setReady]);
  return (
    <div className="exercise">
      <h1>Vul het juiste woord in</h1>
      <p className="muted" style={{ marginTop: -8 }}>
        "{ex.nl}"
      </p>
      <div className="fill-sentence">
        {script(ex.before)}
        <span className="blank">{sel !== null ? script(ex.options[sel].text) : ' '}</span>
        {script(ex.after)}
      </div>
      <div className="options" style={{ marginTop: 16 }}>
        {ex.options.map((o, i) => (
          <button key={i} className={`option ${sel === i ? 'selected' : ''}`} onClick={() => pickIt(i)} disabled={locked}>
            <span className="num">{i + 1}</span>
            {script(o.text)}
          </button>
        ))}
      </div>
    </div>
  );
}

// ------------------------------------------------------------------
export function SpeakEx({ ex, locked, finish, setReady }: ExProps<'speak'>) {
  const [state, setState] = useState<'idle' | 'listening' | 'error'>('idle');
  const [heard, setHeard] = useState<string | null>(null);
  const stopRef = useRef<() => void>(() => {});
  const updateSettings = useStore((s) => s.updateSettings);
  const supported = canRecognize();

  useEffect(() => {
    setReady(null);
    return () => stopRef.current();
  }, [ex, setReady]);

  const start = () => {
    if (locked) return;
    setState('listening');
    setHeard(null);
    stopRef.current = recognize((alts, error) => {
      if (!alts) {
        setState('error');
        if (error === 'not-allowed' || error === 'unsupported') setHeard('Geen toegang tot de microfoon.');
        else setHeard('Ik heb niets gehoord. Probeer het nog eens!');
        return;
      }
      setState('idle');
      if (!alts.length) {
        setHeard('Ik heb niets gehoord. Probeer het nog eens!');
        return;
      }
      const target = normalize(ex.sr);
      let best = alts[0];
      let bestScore = 0;
      for (const a of alts) {
        const n = normalize(a);
        const sim = 1 - levenshtein(n, target) / Math.max(n.length, target.length, 1);
        if (sim > bestScore) {
          bestScore = sim;
          best = a;
        }
      }
      setHeard(best);
      finish({ correct: bestScore >= 0.7, answer: ex.sr, answerLang: 'sr' });
    });
  };

  return (
    <div className="exercise">
      <h1>Spreek deze zin uit</h1>
      <SrPrompt text={ex.sr} />
      <p className="muted" style={{ marginTop: -10 }}>
        "{ex.nl}"
      </p>
      {supported ? (
        <button className={`mic ${state === 'listening' ? 'listening' : ''}`} onClick={start} disabled={locked || state === 'listening'}>
          <MicIcon /> {state === 'listening' ? 'Ik luister…' : 'Tik om te spreken'}
        </button>
      ) : (
        <p className="muted">Spraakherkenning wordt niet ondersteund in deze browser.</p>
      )}
      {heard && (
        <p style={{ textAlign: 'center', fontWeight: 700 }}>
          {state === 'error' || heard.startsWith('Ik heb') || heard.startsWith('Geen') ? heard : <>Gehoord: "{heard}"</>}
        </p>
      )}
      <div style={{ flex: 1 }} />
      <button
        className="btn flat"
        disabled={locked}
        onClick={() => {
          stopRef.current();
          updateSettings({ speaking: false });
          finish({ correct: true, skipped: true });
        }}
      >
        Ik kan nu niet spreken
      </button>
    </div>
  );
}

export function cyrDisplay(text: string, lang: 'sr' | 'nl' | 'cyr' | undefined, cyr: boolean) {
  if (lang === 'sr' && cyr) return toCyrillic(text);
  return text;
}
