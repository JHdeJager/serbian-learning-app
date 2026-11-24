import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  buildLessonSession,
  buildLetterSession,
  buildPracticeSession,
  buildUnitTest,
  type Exercise
} from '../lib/generator';
import { REFILL_COST, todayXp, useStore, type LessonResult } from '../lib/store';
import { sfx, vibrate } from '../lib/sound';
import { CloseIcon } from '../components/Icons';
import { Mascot } from '../components/Mascot';
import { ChoiceEx, FillEx, MatchEx, PicturesEx, SpeakEx, TilesEx, TypeEx } from '../exercises/Exercises';
import type { CheckResult } from '../exercises/common';
import { toCyrillic } from '../lib/translit';
import { UNITS, LESSONS } from '../data/course';
import { hasSerbianVoice, speak } from '../lib/speech';
import { ResultFlow } from './Results';

export type SessionSpec =
  | { kind: 'lesson'; lessonId: string }
  | { kind: 'practice'; focus: 'weak' | 'mistakes' }
  | { kind: 'unitTest'; unitId: string }
  | { kind: 'jump'; unitIndex: number }
  | { kind: 'letters'; id: string };

interface QueueItem {
  ex: Exercise;
  retry: boolean;
  uid: number;
}

const PRAISE = ['Goed zo!', 'Super!', 'Geweldig!', 'Bravo!', 'Odlično!', 'Bravo, Ježa is trots!', 'Uitstekend!', 'Prima!'];

export function LessonScreen({ spec, onExit }: { spec: SessionSpec; onExit: () => void }) {
  const st = useStore();
  const settings = st.settings;
  const usesHearts = (spec.kind === 'lesson' || spec.kind === 'unitTest') && !settings.unlimitedHearts;
  const maxMistakes = spec.kind === 'jump' ? 3 : Infinity;

  const initial = useMemo(() => {
    const opts = { listening: settings.listening && hasSerbianVoice(), speaking: settings.speaking };
    let list: Exercise[] = [];
    if (spec.kind === 'lesson') list = buildLessonSession(spec.lessonId, st.completed[spec.lessonId] ?? 0, opts);
    else if (spec.kind === 'practice') list = buildPracticeSession(st.completed, st.words, st.mistakes, opts, spec.focus);
    else if (spec.kind === 'unitTest') list = buildUnitTest([spec.unitId], opts);
    else if (spec.kind === 'jump') list = buildUnitTest(UNITS.slice(0, spec.unitIndex).map((u) => u.id), opts);
    else if (spec.kind === 'letters') list = buildLetterSession(spec.id);
    return list.map((ex, i) => ({ ex, retry: false, uid: i }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [queue, setQueue] = useState<QueueItem[]>(initial);
  const [pos, setPos] = useState(0);
  const [result, setResult] = useState<CheckResult | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [firstTryCorrect, setFirstTryCorrect] = useState(0);
  const [mistakes, setMistakes] = useState(0);
  const [combo, setCombo] = useState(0);
  const [praise, setPraise] = useState('');
  const [confirmQuit, setConfirmQuit] = useState(false);
  const [noHearts, setNoHearts] = useState(false);
  const [failed, setFailed] = useState(false);
  const [done, setDone] = useState<LessonResult | null>(null);
  const [goalJustReached, setGoalJustReached] = useState(false);
  const startTime = useRef(Date.now());
  const checkRef = useRef<(() => CheckResult) | null>(null);
  const [ready, setReadyState] = useState(false);
  const seenKeys = useRef(new Set<string>());

  const setReady = useCallback((fn: (() => CheckResult) | null) => {
    checkRef.current = fn;
    setReadyState(!!fn);
  }, []);

  const current = queue[pos];
  const total = initial.length;
  const progress = total ? Math.min(1, correctCount / total) : 0;

  const applyResult = useCallback(
    (r: CheckResult) => {
      if (!current) return;
      setResult(r);
      const ex = current.ex;
      if (r.skipped) {
        setCorrectCount((c) => c + 1);
        setFirstTryCorrect((c) => c + 1);
        return;
      }
      const s = useStore.getState();
      ex.wordIds.slice(0, 4).forEach((id) => s.recordWord(id, r.correct));
      if (r.correct) {
        sfx.correct();
        setCorrectCount((c) => c + 1);
        if (!current.retry && !seenKeys.current.has(String(current.uid))) setFirstTryCorrect((c) => c + 1);
        setCombo((c) => c + 1);
        setPraise(PRAISE[Math.floor(Math.random() * PRAISE.length)]);
        if (current.retry) s.clearMistakes([ex.key]);
      } else {
        sfx.wrong();
        vibrate(120);
        setCombo(0);
        setMistakes((m) => m + 1);
        s.addMistake(ex.key);
        // re-queue at the end (Duolingo-style)
        setQueue((q) => [...q, { ex: current.ex, retry: true, uid: current.uid }]);
        if (usesHearts) {
          s.loseHeart();
          if (useStore.getState().hearts <= 0) setNoHearts(true);
        }
        if (mistakes + 1 >= maxMistakes) setFailed(true);
      }
      seenKeys.current.add(String(current.uid));
      // speak the correct Serbian answer after answering
      if (r.answerLang === 'sr' && r.answer && settings.listening && ex.type !== 'speak') speak(r.answer);
    },
    [current, usesHearts, mistakes, maxMistakes, settings.listening]
  );

  const check = () => {
    if (!checkRef.current || result) return;
    applyResult(checkRef.current());
  };

  const finishSession = () => {
    const seconds = Math.round((Date.now() - startTime.current) / 1000);
    const s = useStore.getState();
    const before = todayXp(s);
    let baseXp = 10;
    if (spec.kind === 'unitTest' || spec.kind === 'jump') baseXp = 20;
    if (spec.kind === 'practice') baseXp = 10;
    if (spec.kind === 'letters') baseXp = 10;
    let lessonId: string | undefined;
    if (spec.kind === 'lesson') lessonId = spec.lessonId;
    if (spec.kind === 'letters') lessonId = spec.id;
    const r = s.completeSession({
      lessonId,
      unitTestId: spec.kind === 'unitTest' ? spec.unitId : undefined,
      baseXp,
      correct: firstTryCorrect,
      total,
      seconds,
      healHeart: spec.kind === 'practice'
    });
    if (spec.kind === 'jump') {
      // mark all lessons before this unit as done
      const completed = { ...useStore.getState().completed };
      LESSONS.filter((l) => l.unitIndex < spec.unitIndex).forEach((l) => {
        if (!completed[l.lesson.id]) completed[l.lesson.id] = 1;
      });
      useStore.setState({ completed });
    }
    const after = todayXp(useStore.getState());
    setGoalJustReached(before < s.dailyGoal && after >= s.dailyGoal);
    sfx.complete();
    setDone(r);
  };

  const next = () => {
    if (failed) return;
    const nextPos = pos + 1;
    setResult(null);
    setReady(null);
    if (nextPos >= queue.length) {
      finishSession();
      return;
    }
    setPos(nextPos);
  };

  // keyboard: Enter = check / continue
  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.key !== 'Enter' || done || noHearts || confirmQuit || failed) return;
      e.preventDefault();
      if (result) next();
      else check();
    };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  });

  if (!initial.length) {
    return (
      <div className="center-screen">
        <div className="content">
          <Mascot mood="think" size={140} />
          <h2>Nog niets om te oefenen</h2>
          <p className="muted">Maak eerst een paar lessen, dan kun je hier je woorden herhalen.</p>
        </div>
        <div className="actions">
          <button className="btn block" onClick={onExit}>
            Terug
          </button>
        </div>
      </div>
    );
  }

  if (done) {
    return <ResultFlow result={done} goalJustReached={goalJustReached} spec={spec} onDone={onExit} />;
  }

  const ex = current.ex;
  (window as unknown as { __govoriEx?: Exercise }).__govoriEx = ex;
  const isListen = (ex.type === 'tiles' || ex.type === 'type') && ex.mode === 'listen';
  const answerShown = result && result.answer ? (result.answerLang === 'sr' && settings.cyrillic ? toCyrillic(result.answer) : result.answer) : '';

  const renderEx = () => {
    const common = { locked: !!result, setReady, finish: applyResult };
    const key = `${current.uid}-${pos}`;
    switch (ex.type) {
      case 'pictures':
        return <PicturesEx key={key} ex={ex} {...common} />;
      case 'choice':
        return <ChoiceEx key={key} ex={ex} {...common} />;
      case 'match':
        return <MatchEx key={key} ex={ex} {...common} />;
      case 'tiles':
        return <TilesEx key={key} ex={ex} {...common} />;
      case 'type':
        return <TypeEx key={key} ex={ex} {...common} />;
      case 'fill':
        return <FillEx key={key} ex={ex} {...common} />;
      case 'speak':
        return <SpeakEx key={key} ex={ex} {...common} />;
    }
  };

  const hearts = st.hearts;

  return (
    <div className="lesson">
      <div className="lesson-top">
        <button className="icon-btn" onClick={() => setConfirmQuit(true)} aria-label="Stoppen">
          <CloseIcon />
        </button>
        <div className="progress">
          <div style={{ width: `${Math.max(3, progress * 100)}%` }} />
        </div>
        {usesHearts ? (
          <span className="stat hearts">
            <span className="emoji">❤️</span>
            {hearts}
          </span>
        ) : spec.kind === 'jump' ? (
          <span className="stat hearts">
            <span className="emoji">❤️</span>
            {Math.max(0, maxMistakes - mistakes)}
          </span>
        ) : (
          <span className="stat hearts">
            <span className="emoji">♾️</span>
          </span>
        )}
      </div>

      <div className="lesson-body">
        {current.retry && !result && (
          <div className="exercise" style={{ flex: 0, paddingBottom: 0 }}>
            <div className="new-badge" style={{ color: 'var(--orange)' }}>
              🔁 Vorige fout
            </div>
          </div>
        )}
        {combo >= 3 && !result && (
          <div className="exercise" style={{ flex: 0, paddingBottom: 0 }}>
            <div className="combo">🔥 {combo} op rij!</div>
          </div>
        )}
        {renderEx()}
      </div>

      <div className={`lesson-footer ${result ? (result.correct ? 'correct' : 'wrong') : ''}`}>
        <div className="lesson-footer-inner">
          {result && !result.skipped ? (
            <>
              <div className={`feedback ${result.correct ? 'correct' : 'wrong'}`}>
                <div className="badge">{result.correct ? '✅' : '❌'}</div>
                <div>
                  <h3>{result.correct ? (result.hint ? 'Bijna goed!' : praise) : 'Juiste antwoord:'}</h3>
                  {!result.correct && answerShown && <p>{answerShown}</p>}
                  {result.correct && result.hint && (
                    <p>
                      {result.hint} {answerShown && <>Juist: {answerShown}</>}
                    </p>
                  )}
                </div>
              </div>
              <button className={`btn ${result.correct ? 'green' : 'red'}`} onClick={next} autoFocus>
                Ga door
              </button>
            </>
          ) : result?.skipped ? (
            <>
              <div className="feedback" />
              <button className="btn" onClick={next} autoFocus>
                Ga door
              </button>
            </>
          ) : (
            <>
              {isListen ? (
                <button
                  className="btn ghost"
                  onClick={() => {
                    useStore.getState().updateSettings({ listening: false });
                    applyResult({ correct: true, skipped: true });
                  }}
                >
                  Kan nu niet luisteren
                </button>
              ) : ex.type === 'match' || ex.type === 'speak' ? (
                <span />
              ) : (
                <button className="btn ghost" onClick={() => applyResult({ correct: false, answer: answerOf(ex), answerLang: langOf(ex) })}>
                  Overslaan
                </button>
              )}
              {ex.type !== 'match' && ex.type !== 'speak' && (
                <button className="btn green" disabled={!ready} onClick={check}>
                  Controleer
                </button>
              )}
            </>
          )}
        </div>
      </div>

      {confirmQuit && (
        <div className="overlay" onClick={() => setConfirmQuit(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <Mascot mood="sad" size={110} />
            <h2>Wacht, niet stoppen!</h2>
            <p className="muted">Als je nu stopt, verlies je de voortgang van deze les.</p>
            <button className="btn block" onClick={() => setConfirmQuit(false)}>
              Doorgaan met leren
            </button>
            <button className="btn flat block" style={{ color: 'var(--red)' }} onClick={onExit}>
              Les stoppen
            </button>
          </div>
        </div>
      )}

      {noHearts && (
        <div className="overlay">
          <div className="modal">
            <Mascot mood="sad" size={110} />
            <h2>Je hartjes zijn op!</h2>
            <p className="muted">
              Elke 30 minuten krijg je er een terug. Je kunt ook je hartjes aanvullen met edelstenen, of oefenen om hartjes te
              verdienen.
            </p>
            <button
              className="btn block"
              disabled={st.gems < REFILL_COST}
              onClick={() => {
                if (useStore.getState().buyRefill()) setNoHearts(false);
              }}
            >
              Aanvullen voor 💎 {REFILL_COST}
            </button>
            <button className="btn ghost block" onClick={onExit}>
              Stoppen
            </button>
          </div>
        </div>
      )}

      {failed && (
        <div className="overlay">
          <div className="modal">
            <Mascot mood="sad" size={110} />
            <h2>Net niet gelukt</h2>
            <p className="muted">Je hebt te veel fouten gemaakt om deze units over te slaan. Geen zorgen – begin gewoon bij het begin!</p>
            <button className="btn block" onClick={onExit}>
              Oké
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function answerOf(ex: Exercise): string | undefined {
  switch (ex.type) {
    case 'pictures':
      return ex.options.find((o) => o.correct)?.text;
    case 'choice':
      return ex.options.find((o) => o.correct)?.text;
    case 'tiles':
    case 'type':
      return ex.answer;
    case 'fill':
      return ex.sr;
    default:
      return undefined;
  }
}
function langOf(ex: Exercise): 'sr' | 'nl' | 'cyr' {
  switch (ex.type) {
    case 'pictures':
    case 'fill':
      return 'sr';
    case 'choice':
      return ex.options.find((o) => o.correct)?.lang ?? 'nl';
    case 'tiles':
      return ex.mode === 'sr-nl' ? 'nl' : 'sr';
    case 'type':
      return ex.answerLang;
    default:
      return 'nl';
  }
}
