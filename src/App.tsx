import { useEffect, useRef, useState } from 'react';
import { useStore, MAX_HEARTS, todayXp } from './lib/store';
import { Home } from './screens/Home';
import { LessonScreen, type SessionSpec } from './screens/LessonScreen';
import { Guide, Letters, Onboarding, Practice, Profile, SettingsScreen, Words } from './screens/Screens';
import { Mascot } from './components/Mascot';
import { onVoicesChanged } from './lib/speech';
import { StoryScreen } from './screens/Stories';

type Tab = 'learn' | 'letters' | 'practice' | 'profile';
type Sub = { kind: 'guide'; unitId: string } | { kind: 'settings' } | { kind: 'words' } | null;

const TABS: { id: Tab; label: string; ico: string }[] = [
  { id: 'learn', label: 'Leren', ico: '🏠' },
  { id: 'letters', label: 'Letters', ico: 'Ћ' },
  { id: 'practice', label: 'Oefenen', ico: '💪' },
  { id: 'profile', label: 'Profiel', ico: '🦔' }
];

function SidePanel() {
  const st = useStore();
  const xpToday = todayXp(st);
  return (
    <>
      <div className="card">
        <div className="row" style={{ justifyContent: 'space-between' }}>
          <b>Dagdoel</b>
          <span className="muted" style={{ fontWeight: 800 }}>
            {Math.min(xpToday, st.dailyGoal)}/{st.dailyGoal} XP
          </span>
        </div>
        <div className={`progress ${xpToday >= st.dailyGoal ? 'gold' : ''}`} style={{ marginTop: 10 }}>
          <div style={{ width: `${Math.min(100, (xpToday / st.dailyGoal) * 100)}%` }} />
        </div>
      </div>
      <div className="card row">
        <Mascot size={70} mood={st.streak ? 'cheer' : 'happy'} />
        <div>
          <b>
            🔥 {st.streak} {st.streak === 1 ? 'dag' : 'dagen'} streak
          </b>
          <p className="muted" style={{ margin: '4px 0 0', fontSize: 15 }}>
            {xpToday > 0 ? 'Je hebt vandaag al geleerd. Odlično!' : 'Doe vandaag een les om je streak te verlengen.'}
          </p>
        </div>
      </div>
    </>
  );
}

export default function App() {
  const onboarded = useStore((s) => s.onboarded);
  const st = useStore();
  const [tab, setTab] = useState<Tab>('learn');
  const [sub, setSub] = useState<Sub>(null);
  const [session, setSession] = useState<SessionSpec | null>(null);
  const [sessionId, setSessionId] = useState(0);
  const [story, setStory] = useState<string | null>(null);
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const [heartsModal, setHeartsModal] = useState(false);
  const [streakModal, setStreakModal] = useState(false);
  const [, force] = useState(0);
  const ignorePop = useRef(0);

  useEffect(() => {
    const s = useStore.getState();
    s.syncHearts();
    s.checkStreak();
    const iv = setInterval(() => useStore.getState().syncHearts(), 30000);
    const off = onVoicesChanged(() => force((x) => x + 1));
    return () => {
      clearInterval(iv);
      off();
    };
  }, []);

  // Android back button / browser back: close sub screens and lessons
  useEffect(() => {
    const onPop = () => {
      if (ignorePop.current > 0) {
        ignorePop.current -= 1;
        return;
      }
      if (session) setSession(null);
      else if (story) setStory(null);
      else if (sub) setSub(null);
      else if (tab !== 'learn') setTab('learn');
    };
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, [session, sub, tab, story]);

  const pushNav = () => history.pushState({ govori: true }, '');

  const toast = (m: string) => {
    setToastMsg(m);
    setTimeout(() => setToastMsg(null), 2600);
  };

  const start = (spec: SessionSpec) => {
    const s = useStore.getState();
    s.syncHearts();
    const usesHearts = (spec.kind === 'lesson' || spec.kind === 'unitTest') && !s.settings.unlimitedHearts;
    if (usesHearts && s.hearts <= 0) {
      setHeartsModal(true);
      return;
    }
    pushNav();
    setSessionId((x) => x + 1);
    setSession(spec);
  };

  const exitSession = () => {
    setSession(null);
    if (history.state?.govori) {
      ignorePop.current += 1;
      history.back();
    }
  };

  if (!onboarded) return <Onboarding />;

  if (story)
    return (
      <StoryScreen
        key={story}
        id={story}
        onExit={() => {
          setStory(null);
          if (history.state?.govori) {
      ignorePop.current += 1;
      history.back();
    }
        }}
      />
    );

  if (session) return <LessonScreen key={sessionId} spec={session} onExit={exitSession} />;

  const goTab = (t: Tab) => {
    setSub(null);
    setTab(t);
    window.scrollTo({ top: 0 });
  };
  const openSub = (s: Sub) => {
    pushNav();
    setSub(s);
    window.scrollTo({ top: 0 });
  };
  const closeSub = () => {
    setSub(null);
    if (history.state?.govori) {
      ignorePop.current += 1;
      history.back();
    }
  };

  let content;
  if (sub?.kind === 'guide') content = <Guide unitId={sub.unitId} back={closeSub} />;
  else if (sub?.kind === 'settings') content = <SettingsScreen back={closeSub} toast={toast} />;
  else if (sub?.kind === 'words') content = <Words back={closeSub} />;
  else if (tab === 'learn') content = <Home start={start} openGuide={(unitId) => openSub({ kind: 'guide', unitId })} toast={toast} />;
  else if (tab === 'letters') content = <Letters start={start} />;
  else if (tab === 'practice') content = <Practice
        start={start}
        openWords={() => openSub({ kind: 'words' })}
        openStory={(id) => {
          pushNav();
          setStory(id);
        }}
      />;
  else content = <Profile openSettings={() => openSub({ kind: 'settings' })} />;

  const unlimited = st.settings.unlimitedHearts;

  return (
    <div className="app">
      <nav className="nav">
        <div className="brand">
          🦔 Govori<span>!</span>
        </div>
        {TABS.map((t) => (
          <button key={t.id} className={tab === t.id && !sub ? 'active' : ''} onClick={() => goTab(t.id)}>
            <span className="ico" style={t.id === 'letters' ? { fontWeight: 900, fontSize: 24, color: 'var(--red)' } : undefined}>
              {t.ico}
            </span>
            {t.label}
          </button>
        ))}
      </nav>
      <div className="main">
        <header className="topbar">
          <div className="topbar-inner">
            <span className="stat" title="Servisch">
              <span className="emoji">🇷🇸</span>
            </span>
            <button className={`stat streak ${st.streak ? '' : 'off'}`} onClick={() => setStreakModal(true)}>
              <span className="emoji">🔥</span>
              {st.streak}
            </button>
            <button className="stat hearts" onClick={() => setHeartsModal(true)}>
              <span className="emoji">❤️</span>
              {unlimited ? '∞' : st.hearts}
            </button>
          </div>
        </header>
        <div className="main-row">
          <div className="main-col">{content}</div>
          <aside className="aside">
            <SidePanel />
          </aside>
        </div>
      </div>

      {heartsModal && (
        <div className="overlay" onClick={() => setHeartsModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div style={{ fontSize: 60 }}>{'❤️'.repeat(1)}</div>
            <h2>{unlimited ? 'Onbeperkt hartjes' : st.hearts >= MAX_HEARTS ? 'Je hartjes zijn vol!' : `Je hebt ${st.hearts} hartjes`}</h2>
            <p className="muted">
              {unlimited
                ? 'Je verliest geen hartjes bij fouten. Dit kun je uitzetten in Profiel → Instellingen.'
                : 'Bij elke fout in een les verlies je een hartje. Elke 30 minuten krijg je er een terug, en met oefenen verdien je er een.'}
            </p>
            {!unlimited && st.hearts < MAX_HEARTS && (
              <>
                <button
                  className="btn block"
                  onClick={() => {
                    st.updateSettings({ unlimitedHearts: true });
                    setHeartsModal(false);
                    toast('♾️ Onbeperkt hartjes staat aan');
                  }}
                >
                  Onbeperkt hartjes aanzetten
                </button>
                <button
                  className="btn ghost block"
                  onClick={() => {
                    setHeartsModal(false);
                    start({ kind: 'practice', focus: 'weak' });
                  }}
                >
                  Oefenen voor een hartje
                </button>
              </>
            )}
            <button className="btn flat block" onClick={() => setHeartsModal(false)}>
              Sluiten
            </button>
          </div>
        </div>
      )}

      {streakModal && (
        <div className="overlay" onClick={() => setStreakModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="streak-big" style={{ fontSize: 80, filter: st.streak ? undefined : 'grayscale(1)' }}>
              🔥
            </div>
            <h2>
              {st.streak} {st.streak === 1 ? 'dag' : 'dagen'} streak
            </h2>
            <p className="muted">
              {st.streak
                ? 'Doe elke dag minstens één les om je streak te verlengen.'
                : 'Doe vandaag een les om een nieuwe streak te beginnen!'}
              {st.streakFreezes > 0 && ` Je hebt ${st.streakFreezes} streak-bevriezer${st.streakFreezes > 1 ? 's' : ''} 🧊.`}
            </p>
            <Mascot mood={st.streak ? 'cheer' : 'sad'} size={90} />
            <button className="btn block" onClick={() => setStreakModal(false)}>
              Oké
            </button>
          </div>
        </div>
      )}

      {toastMsg && <div className="toast">{toastMsg}</div>}
    </div>
  );
}
