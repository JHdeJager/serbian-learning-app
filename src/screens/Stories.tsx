import { useEffect, useRef, useState } from 'react';
import { STORIES, type Story } from '../data/stories';
import { findUnit, unitDone, UNITS } from '../data/course';
import { useStore } from '../lib/store';
import { HintSentence } from '../components/Sr';
import { CloseIcon } from '../components/Icons';
import { SpeakBtn } from '../exercises/Exercises';
import { hasSerbianVoice, speak } from '../lib/speech';
import { sfx } from '../lib/sound';
import { Mascot } from '../components/Mascot';
import { Confetti } from './Results';

export function storyUnlocked(completed: Record<string, number>, story: Story): boolean {
  const unit = findUnit(story.afterUnit);
  return !!unit && unitDone(completed, unit);
}

export function StoriesList({ open }: { open: (id: string) => void }) {
  const completed = useStore((s) => s.completed);
  return (
    <div className="card" style={{ padding: '4px 14px' }}>
      {STORIES.map((s) => {
        const unlocked = storyUnlocked(completed, s);
        const done = (completed[s.id] ?? 0) > 0;
        const unitNo = UNITS.findIndex((u) => u.id === s.afterUnit) + 1;
        return (
          <div key={s.id} className="list-item">
            <div className="avatar" style={done ? { background: 'var(--gold)', borderColor: 'var(--gold-dark)' } : unlocked ? undefined : { filter: 'grayscale(1)', opacity: 0.6 }}>
              {s.emoji}
            </div>
            <div className="grow">
              <b>{s.title}</b>
              <div className="muted" style={{ fontSize: 14 }}>
                {done ? 'Gelezen ✓' : unlocked ? 'Nieuw verhaal!' : `Voltooi eerst unit ${unitNo}`}
              </div>
            </div>
            <button className={`btn small ${done ? 'ghost' : ''}`} disabled={!unlocked} onClick={() => open(s.id)}>
              {unlocked ? (done ? 'Lees' : 'Start') : '🔒'}
            </button>
          </div>
        );
      })}
    </div>
  );
}

export function StoryScreen({ id, onExit }: { id: string; onExit: () => void }) {
  const story = STORIES.find((s) => s.id === id)!;
  const listening = useStore((s) => s.settings.listening) && hasSerbianVoice();
  const [shown, setShown] = useState(1);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [revealed, setRevealed] = useState<Record<number, boolean>>({});
  const [mistakes, setMistakes] = useState(0);
  const [finished, setFinished] = useState<{ xp: number } | null>(null);
  const start = useRef(Date.now());
  const bottomRef = useRef<HTMLDivElement>(null);

  const steps = story.steps.slice(0, shown);
  const last = story.steps[shown - 1];
  const lastIndex = shown - 1;
  const waitingForAnswer = last.kind === 'question' && answers[lastIndex] !== last.answer;
  const atEnd = shown >= story.steps.length && !waitingForAnswer;

  useEffect(() => {
    if (last.kind === 'line' && listening) speak(last.sr);
    bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [shown, last, listening]);

  const next = () => {
    if (waitingForAnswer) return;
    if (atEnd) {
      const st = useStore.getState();
      const qs = story.steps.filter((s) => s.kind === 'question').length;
      const r = st.completeSession({
        lessonId: story.id,
        baseXp: 15,
        correct: Math.max(0, qs - mistakes),
        total: qs,
        seconds: Math.round((Date.now() - start.current) / 1000)
      });
      sfx.complete();
      setFinished({ xp: r.xp });
      return;
    }
    sfx.tap();
    setShown(shown + 1);
  };

  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.key === 'Enter') (finished ? onExit : next)();
    };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  });

  if (finished) {
    return (
      <div className="center-screen">
        <Confetti />
        <div className="content">
          <Mascot mood="cheer" size={160} className="bounce" />
          <h1>Verhaal uitgelezen!</h1>
          <p className="muted">
            "{story.title}" · +{finished.xp} XP
          </p>
        </div>
        <div className="actions">
          <button className="btn block" onClick={onExit}>
            Ga door
          </button>
        </div>
      </div>
    );
  }

  const progress = shown / story.steps.length;

  return (
    <div className="lesson">
      <div className="lesson-top">
        <button className="icon-btn" onClick={onExit} aria-label="Stoppen">
          <CloseIcon />
        </button>
        <div className="progress">
          <div style={{ width: `${progress * 100}%` }} />
        </div>
      </div>
      <div className="lesson-body">
        <div className="exercise" style={{ gap: 14 }}>
          <h1 style={{ textAlign: 'center' }}>
            {story.emoji} {story.title}
          </h1>
          {steps.map((s, i) => {
            if (s.kind === 'line') {
              return (
                <div key={i} className="row" style={{ alignItems: 'flex-start' }}>
                  <div className="avatar" title={s.speaker}>
                    {story.speakers[s.speaker] ?? '🙂'}
                  </div>
                  <div className="grow">
                    <div className="muted" style={{ fontSize: 13, fontWeight: 800 }}>
                      {s.speaker}
                    </div>
                    <div className="row" style={{ gap: 8, alignItems: 'flex-start' }}>
                      {listening && <SpeakBtn text={s.sr} />}
                      <div style={{ fontSize: 19, fontWeight: 700, paddingTop: 6 }}>
                        <HintSentence text={s.sr} />
                      </div>
                    </div>
                    {revealed[i] ? (
                      <div className="muted" style={{ fontSize: 15, marginTop: 4 }}>
                        {s.nl}
                      </div>
                    ) : (
                      <button className="btn flat small" style={{ padding: '4px 0', minHeight: 0 }} onClick={() => setRevealed({ ...revealed, [i]: true })}>
                        Vertaling tonen
                      </button>
                    )}
                  </div>
                </div>
              );
            }
            const picked = answers[i];
            const solved = picked === s.answer;
            return (
              <div key={i} className="card" style={{ background: 'var(--bg-soft)' }}>
                <b>❓ {s.question}</b>
                <div className="options" style={{ marginTop: 10 }}>
                  {s.options.map((o, oi) => (
                    <button
                      key={oi}
                      className={`option ${picked === oi ? (oi === s.answer ? 'good' : 'bad') : ''} ${solved && oi === s.answer ? 'good' : ''}`}
                      disabled={solved}
                      onClick={() => {
                        setAnswers({ ...answers, [i]: oi });
                        if (oi === s.answer) sfx.correct();
                        else {
                          sfx.wrong();
                          setMistakes((m) => m + 1);
                        }
                      }}
                    >
                      {o}
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
          <div ref={bottomRef} />
        </div>
      </div>
      <div className="lesson-footer">
        <div className="lesson-footer-inner">
          <span />
          <button className="btn green" disabled={waitingForAnswer} onClick={next}>
            {atEnd ? 'Klaar' : 'Ga door'}
          </button>
        </div>
      </div>
    </div>
  );
}
