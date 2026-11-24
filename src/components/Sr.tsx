import { useEffect, useRef, useState } from 'react';
import { useStore } from '../lib/store';
import { toCyrillic } from '../lib/translit';
import { hintTokens } from '../data/course';
import type { Lang } from '../lib/generator';
import { speak } from '../lib/speech';

/** Shows Serbian text in the script the user has chosen. */
export function useScript() {
  const cyr = useStore((s) => s.settings.cyrillic);
  return (text: string) => (cyr ? toCyrillic(text) : text);
}

export function Txt({ text, lang }: { text: string; lang: Lang }) {
  const script = useScript();
  if (lang === 'sr') return <>{script(text)}</>;
  return <>{text}</>;
}

/** Serbian sentence where every word can be tapped to see its meaning. */
export function HintSentence({ text, forceCyrillic = false }: { text: string; forceCyrillic?: boolean }) {
  const script = useScript();
  const [open, setOpen] = useState<number | null>(null);
  const ref = useRef<HTMLSpanElement>(null);
  const tokens = hintTokens(text);

  useEffect(() => {
    if (open === null) return;
    const close = (e: Event) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(null);
    };
    document.addEventListener('pointerdown', close);
    return () => document.removeEventListener('pointerdown', close);
  }, [open]);

  return (
    <span ref={ref}>
      {tokens.map((t, i) => (
        <span key={i}>
          {i > 0 && ' '}
          <span
            className={`hint-word ${t.hints.length ? '' : 'nohint'}`}
            onClick={() => {
              if (!t.hints.length) return;
              setOpen(open === i ? null : i);
              speak(t.text.replace(/[.,!?–]/g, ''));
            }}
          >
            {forceCyrillic ? toCyrillic(t.text) : script(t.text)}
            {open === i && (
              <span className="hint-pop">
                {t.hints.slice(0, 3).map((h) => (
                  <div key={h}>{h}</div>
                ))}
              </span>
            )}
          </span>
        </span>
      ))}
    </span>
  );
}
