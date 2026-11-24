import { useEffect, useState } from 'react';
import type { LessonResult } from '../lib/store';
import { useStore } from '../lib/store';
import { Mascot } from '../components/Mascot';
import { dayKey, NL_DAYS_SHORT, weekStart, addDays } from '../lib/date';
import type { SessionSpec } from './LessonScreen';

export function Confetti() {
  const colors = ['#1c7ed6', '#e03131', '#fab005', '#37b24d', '#7950f2', '#fd7e14'];
  const pieces = Array.from({ length: 60 }, (_, i) => ({
    left: Math.random() * 100,
    delay: Math.random() * 0.8,
    dur: 2 + Math.random() * 2,
    color: colors[i % colors.length],
    rot: Math.random() * 360
  }));
  return (
    <div className="confetti" aria-hidden>
      {pieces.map((p, i) => (
        <i
          key={i}
          style={{
            left: `${p.left}%`,
            background: p.color,
            animationDuration: `${p.dur}s`,
            animationDelay: `${p.delay}s`,
            transform: `rotate(${p.rot}deg)`
          }}
        />
      ))}
    </div>
  );
}

function fmtTime(sec: number) {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${m}:${String(s).padStart(2, '0')}`;
}

export function WeekDots() {
  const xpByDay = useStore((s) => s.xpByDay);
  const frozen = useStore((s) => s.frozenDays);
  const start = weekStart();
  const today = dayKey();
  return (
    <div className="week-row">
      {NL_DAYS_SHORT.map((d, i) => {
        const key = addDays(start, i);
        const on = (xpByDay[key] ?? 0) > 0;
        const fr = frozen.includes(key);
        return (
          <div key={d} className={`d ${key === today ? 'today' : ''}`}>
            {d}
            <div className={`dot ${on ? 'on' : ''} ${fr ? 'frozen' : ''}`}>{on ? '✓' : fr ? '❄' : ''}</div>
          </div>
        );
      })}
    </div>
  );
}

export function ResultFlow({
  result,
  goalJustReached,
  spec,
  onDone
}: {
  result: LessonResult;
  goalJustReached: boolean;
  spec: SessionSpec;
  onDone: () => void;
}) {
  const steps: ('result' | 'streak' | 'goal')[] = ['result'];
  if (result.streakIncreased) steps.push('streak');
  if (goalJustReached) steps.push('goal');
  const [step, setStep] = useState(0);
  const dailyGoal = useStore((s) => s.dailyGoal);
  const next = () => (step + 1 < steps.length ? setStep(step + 1) : onDone());

  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.key === 'Enter') next();
    };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  });

  const accuracy = result.total ? Math.round((result.correct / result.total) * 100) : 100;
  const title =
    spec.kind === 'unitTest'
      ? 'Unit voltooid!'
      : spec.kind === 'jump'
        ? 'Doorgestoten!'
        : spec.kind === 'practice'
          ? 'Oefening klaar!'
          : result.perfect
            ? 'Foutloze les!'
            : 'Les voltooid!';

  const current = steps[step];
  return (
    <div className="center-screen">
      {current === 'result' && <Confetti />}
      <div className="content">
        {current === 'result' && (
          <>
            <Mascot mood="cheer" size={170} className="bounce" />
            <h1>{title}</h1>
            {spec.kind === 'practice' && <p className="muted">Je hebt een hartje verdiend ❤️</p>}
            <div className="result-boxes">
              <div className="result-box" style={{ borderColor: 'var(--gold)' }}>
                <div className="head" style={{ background: 'var(--gold)' }}>
                  Totaal XP
                </div>
                <div className="val" style={{ color: 'var(--gold-dark)' }}>
                  ⚡ {result.xp}
                </div>
              </div>
              <div className="result-box" style={{ borderColor: 'var(--green)' }}>
                <div className="head" style={{ background: 'var(--green)' }}>
                  {accuracy >= 90 ? 'Geweldig' : accuracy >= 70 ? 'Goed' : 'Score'}
                </div>
                <div className="val" style={{ color: 'var(--green-dark)' }}>
                  🎯 {accuracy}%
                </div>
              </div>
              <div className="result-box" style={{ borderColor: 'var(--blue)' }}>
                <div className="head" style={{ background: 'var(--blue)' }}>
                  Snel
                </div>
                <div className="val" style={{ color: 'var(--blue)' }}>
                  ⏱️ {fmtTime(result.seconds)}
                </div>
              </div>
            </div>
            <p className="muted">+ 💎 {result.gems} edelstenen</p>
          </>
        )}
        {current === 'streak' && (
          <>
            <div className="streak-big">🔥</div>
            <div className="streak-num">{result.newStreak}</div>
            <h2 style={{ color: 'var(--orange)' }}>{result.newStreak === 1 ? 'dag streak!' : 'dagen streak!'}</h2>
            <WeekDots />
            <p className="muted">
              {result.newStreak === 1
                ? 'Een goed begin! Kom morgen terug om je streak te verlengen.'
                : 'Ga zo door! Oefen elke dag om je streak in leven te houden.'}
            </p>
          </>
        )}
        {current === 'goal' && (
          <>
            <Confetti />
            <div style={{ fontSize: 100 }}>🏆</div>
            <h1>Dagdoel gehaald!</h1>
            <p className="muted">Je hebt vandaag {dailyGoal} XP verdiend. Svaka čast! (Petje af!)</p>
          </>
        )}
      </div>
      <div className="actions">
        <button className="btn block" onClick={next} autoFocus>
          Ga door
        </button>
      </div>
    </div>
  );
}
