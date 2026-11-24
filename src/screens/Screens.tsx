import { useMemo, useRef, useState } from 'react';
import { DOUBLE_XP_COST, exportState, FREEZE_COST, MAX_HEARTS, REFILL_COST, HEART_REFILL_MS, useStore } from '../lib/store';
import { Mascot } from '../components/Mascot';
import { learnedWords, findUnit, UNITS, LESSONS, isLessonDone } from '../data/course';
import { LETTER_LESSONS } from '../lib/generator';
import { ALPHABET, toCyrillic } from '../lib/translit';
import { speak, hasSerbianVoice, voiceName } from '../lib/speech';
import type { SessionSpec } from './LessonScreen';
import { competitors, daysLeftInWeek, LEAGUES } from '../lib/league';
import { addDays, dayKey, NL_DAYS_SHORT, parseDay } from '../lib/date';
import { useScript } from '../components/Sr';
import { SpeakBtn } from '../exercises/Exercises';
import { BackIcon } from '../components/Icons';
import { WeekDots } from './Results';
import { StoriesList } from './Stories';

// ------------------------------------------------------------------
export function Practice({ start, openWords, openStory }: { start: (s: SessionSpec) => void; openWords: () => void; openStory: (id: string) => void }) {
  const completed = useStore((s) => s.completed);
  const mistakes = useStore((s) => s.mistakes);
  const words = useStore((s) => s.words);
  const learned = learnedWords(completed);
  const weak = learned.filter((w) => (words[w.id]?.s ?? 0) < 3).length;
  return (
    <div className="page">
      <h1 className="section-title">Oefenen</h1>
      <p className="muted">Herhaal wat je hebt geleerd. Oefenen kost geen hartjes – je verdient er zelfs een mee!</p>
      <div className="card row">
        <div style={{ fontSize: 40 }}>💪</div>
        <div className="grow">
          <b>Persoonlijke oefening</b>
          <div className="muted" style={{ fontSize: 15 }}>
            {weak > 0 ? `${weak} woorden kunnen wel wat oefening gebruiken` : 'Houd je woorden fris'}
          </div>
        </div>
        <button className="btn small" disabled={learned.length < 4} onClick={() => start({ kind: 'practice', focus: 'weak' })}>
          Start
        </button>
      </div>
      <div className="card row">
        <div style={{ fontSize: 40 }}>🔁</div>
        <div className="grow">
          <b>Fouten herhalen</b>
          <div className="muted" style={{ fontSize: 15 }}>
            {mistakes.length ? `${mistakes.length} recente fouten` : 'Je hebt geen recente fouten 🎉'}
          </div>
        </div>
        <button className="btn small" disabled={!mistakes.length || learned.length < 4} onClick={() => start({ kind: 'practice', focus: 'mistakes' })}>
          Start
        </button>
      </div>
      <div className="card row">
        <div style={{ fontSize: 40 }}>📚</div>
        <div className="grow">
          <b>Mijn woorden</b>
          <div className="muted" style={{ fontSize: 15 }}>
            {learned.length} woorden geleerd
          </div>
        </div>
        <button className="btn small ghost" onClick={openWords}>
          Bekijk
        </button>
      </div>
      <h2 className="section-title" style={{ fontSize: 19 }}>
        📖 Verhalen
      </h2>
      <p className="muted" style={{ marginTop: -6 }}>
        Lees korte gesprekken in het Servisch en beantwoord de vragen.
      </p>
      <StoriesList open={openStory} />
      {learned.length < 4 && (
        <div style={{ textAlign: 'center', marginTop: 24 }}>
          <Mascot mood="think" size={110} />
          <p className="muted">Maak eerst je eerste lessen om te kunnen oefenen.</p>
        </div>
      )}
    </div>
  );
}

export function Words({ back }: { back: () => void }) {
  const completed = useStore((s) => s.completed);
  const stats = useStore((s) => s.words);
  const [q, setQ] = useState('');
  const script = useScript();
  const learned = learnedWords(completed);
  const filtered = learned.filter((w) => {
    const t = q.trim().toLowerCase();
    if (!t) return true;
    return w.sr.toLowerCase().includes(t) || w.nl.toLowerCase().includes(t) || toCyrillic(w.sr).toLowerCase().includes(t);
  });
  return (
    <div className="page">
      <div className="row" style={{ marginTop: 6 }}>
        <button className="icon-btn" onClick={back} aria-label="Terug">
          <BackIcon />
        </button>
        <h1 className="section-title" style={{ margin: 0 }}>
          Mijn woorden ({learned.length})
        </h1>
      </div>
      <input className="search" placeholder="Zoek een woord…" value={q} onChange={(e) => setQ(e.target.value)} style={{ margin: '14px 0' }} />
      {learned.length === 0 && <p className="muted">Nog geen woorden geleerd. Begin met de eerste les!</p>}
      <div className="card" style={{ padding: '4px 14px' }}>
        {filtered.map((w) => {
          const s = stats[w.id]?.s ?? 0;
          return (
            <div key={w.id} className="list-item">
              <div style={{ fontSize: 26, width: 34, textAlign: 'center' }}>{w.emoji ?? '•'}</div>
              <div className="grow">
                <b>{script(w.sr)}</b>
                <div className="muted" style={{ fontSize: 15 }}>
                  {w.nl}
                  {w.note ? ` · ${w.note}` : ''}
                </div>
              </div>
              <div className="strength" title={`Sterkte ${s}/5`}>
                {[1, 2, 3, 4, 5].map((i) => (
                  <i key={i} className={s >= i ? 'on' : ''} />
                ))}
              </div>
              <button className="icon-btn" onClick={() => speak(w.sr)} aria-label="Uitspreken">
                🔊
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ------------------------------------------------------------------
export function Letters({ start }: { start: (s: SessionSpec) => void }) {
  const completed = useStore((s) => s.completed);
  const cyr = useStore((s) => s.settings.cyrillic);
  const update = useStore((s) => s.updateSettings);
  const learnedLetters = new Set(LETTER_LESSONS.filter((l) => (completed[l.id] ?? 0) > 0).flatMap((l) => l.letters));
  const next = LETTER_LESSONS.find((l) => !(completed[l.id] ?? 0));
  return (
    <div className="page">
      <h1 className="section-title">Cyrillisch alfabet</h1>
      <p className="muted">
        Servisch kun je in twee schriften schrijven. Op straat, op borden en in de krant zie je vaak het Cyrillisch (ćirilica). Elke letter
        hoort bij precies één klank – leer ze hier!
      </p>
      <div className="card row" style={{ marginBottom: 16 }}>
        <div style={{ fontSize: 40 }}>🔤</div>
        <div className="grow">
          <b>{next ? next.title : 'Alle letters geleerd!'}</b>
          <div className="muted" style={{ fontSize: 15 }}>
            {next ? next.description : 'Oefen nog eens of zet de cursus in het Cyrillisch.'}
          </div>
        </div>
        <button className="btn small" onClick={() => start({ kind: 'letters', id: (next ?? LETTER_LESSONS[LETTER_LESSONS.length - 1]).id })}>
          {next ? 'Leer' : 'Oefen'}
        </button>
      </div>
      <div className="card row" style={{ marginBottom: 16 }}>
        <div className="grow">
          <b>Toon de cursus in het Cyrillisch</b>
          <div className="muted" style={{ fontSize: 15 }}>
            Alle Servische woorden verschijnen dan als {toCyrillic('ćirilica')}
          </div>
        </div>
        <button className={`toggle ${cyr ? 'on' : ''}`} onClick={() => update({ cyrillic: !cyr })} aria-label="Cyrillisch aan/uit" />
      </div>
      <h2 className="section-title" style={{ fontSize: 19 }}>
        Lessen
      </h2>
      <div className="card" style={{ padding: '4px 14px', marginBottom: 16 }}>
        {LETTER_LESSONS.map((l, i) => {
          const done = (completed[l.id] ?? 0) > 0;
          const unlocked = i === 0 || (completed[LETTER_LESSONS[i - 1].id] ?? 0) > 0;
          return (
            <div key={l.id} className="list-item">
              <div className="avatar" style={done ? { background: 'var(--gold)', borderColor: 'var(--gold-dark)' } : undefined}>
                {done ? '✔' : l.letters[0] ?? '📖'}
              </div>
              <div className="grow">
                <b>{l.title}</b>
                <div className="muted" style={{ fontSize: 14 }}>
                  {l.letters.length ? l.letters.join(' ') : l.description}
                </div>
              </div>
              <button className={`btn small ${done ? 'ghost' : ''}`} disabled={!unlocked} onClick={() => start({ kind: 'letters', id: l.id })}>
                {done ? 'Herhaal' : unlocked ? 'Start' : '🔒'}
              </button>
            </div>
          );
        })}
      </div>
      <h2 className="section-title" style={{ fontSize: 19 }}>
        Alle letters
      </h2>
      <p className="muted" style={{ marginTop: -6 }}>
        Tik op een letter om een voorbeeld te horen.
      </p>
      <div className="letter-grid">
        {ALPHABET.map((a) => (
          <button
            key={a.cyr}
            className="letter"
            onClick={() => speak(a.example)}
            title={`${a.sound} – ${toCyrillic(a.example)} (${a.example}) = ${a.exampleNl}`}
          >
            <b>{a.cyr}</b>
            <span>{a.lat}</span>
            <div className="bar">
              <div style={{ width: learnedLetters.has(a.cyr) ? '100%' : '0%' }} />
            </div>
          </button>
        ))}
      </div>
      <div className="card" style={{ marginTop: 16 }}>
        <b>Uitspraak</b>
        {ALPHABET.map((a) => (
          <div key={a.cyr} className="list-item" style={{ padding: '8px 0' }}>
            <b style={{ width: 70, fontSize: 20 }}>
              {a.cyr} {a.cyr.toLowerCase()}
            </b>
            <div className="grow" style={{ fontSize: 15 }}>
              <div>
                <b>{a.lat}</b> – {a.sound}
              </div>
              <div className="muted">
                {toCyrillic(a.example)} ({a.example}) = {a.exampleNl}
              </div>
            </div>
            <SpeakBtn text={a.example} />
          </div>
        ))}
      </div>
    </div>
  );
}

// ------------------------------------------------------------------
export function League() {
  const league = useStore((s) => s.league);
  const name = useStore((s) => s.name);
  const list = competitors(league, name);
  const tier = LEAGUES[league.tier];
  const days = daysLeftInWeek(league.week);
  return (
    <div className="page">
      <div style={{ textAlign: 'center', marginTop: 10 }}>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 10, fontSize: 40 }}>
          {LEAGUES.map((l, i) => (
            <span key={l.name} style={{ opacity: i === league.tier ? 1 : 0.3, transform: i === league.tier ? 'scale(1.25)' : undefined }}>
              {l.emoji}
            </span>
          ))}
        </div>
        <h1 className="section-title" style={{ marginTop: 10 }}>
          Liga {tier.name}
        </h1>
        <p className="muted" style={{ marginTop: -6 }}>
          De top 5 promoveert naar de volgende liga · nog {days} {days === 1 ? 'dag' : 'dagen'}
        </p>
      </div>
      {league.lastResult && (
        <div className="card" style={{ textAlign: 'center', marginBottom: 12 }}>
          <b>
            Vorige week: plek {league.lastResult.rank}.{' '}
            {league.lastResult.moved === 'up'
              ? `Gepromoveerd naar ${LEAGUES[league.lastResult.tier].name}! 🎉`
              : league.lastResult.moved === 'down'
                ? `Gedegradeerd naar ${LEAGUES[league.lastResult.tier].name}.`
                : 'Je blijft in deze liga.'}
          </b>
        </div>
      )}
      <div className="card" style={{ padding: '4px 10px' }}>
        {list.map((c, i) => (
          <div key={c.name + i}>
            {i === 5 && league.tier < LEAGUES.length - 1 && <div className="zone up">▲ Promotiezone ▲</div>}
            {i === 12 && league.tier > 0 && <div className="zone down">▼ Degradatiezone ▼</div>}
            <div className={`list-item league-row ${c.isMe ? 'me' : ''}`}>
              <div className={`rank ${i < 5 ? 'up' : i >= 12 ? 'down' : ''}`}>{i < 3 ? ['🥇', '🥈', '🥉'][i] : i + 1}</div>
              <div className="avatar">{c.avatar}</div>
              <div className="grow">
                <b>{c.isMe ? `${c.name || 'Jij'} (jij)` : c.name}</b>
              </div>
              <div style={{ fontWeight: 800 }}>{c.xp} XP</div>
            </div>
          </div>
        ))}
      </div>
      <p className="muted" style={{ fontSize: 13, textAlign: 'center' }}>
        De andere spelers in de liga zijn computerspelers om je te motiveren.
      </p>
    </div>
  );
}

// ------------------------------------------------------------------
export function Shop({ toast }: { toast: (m: string) => void }) {
  const st = useStore();
  const refillIn = st.hearts < MAX_HEARTS ? Math.max(0, HEART_REFILL_MS - (Date.now() - st.heartsUpdatedAt)) : 0;
  const doubleActive = st.doubleXpUntil > Date.now();
  return (
    <div className="page">
      <h1 className="section-title">Winkel</h1>
      <div className="card row" style={{ marginBottom: 14 }}>
        <div style={{ fontSize: 34 }}>💎</div>
        <div className="grow">
          <b style={{ fontSize: 22 }}>{st.gems}</b>
          <div className="muted" style={{ fontSize: 14 }}>
            edelstenen. Verdien er meer met lessen, kisten en toetsen.
          </div>
        </div>
      </div>
      <h2 className="section-title" style={{ fontSize: 19 }}>
        Hartjes
      </h2>
      <div className="card row">
        <div style={{ fontSize: 40 }}>❤️</div>
        <div className="grow">
          <b>Hartjes aanvullen</b>
          <div className="muted" style={{ fontSize: 14 }}>
            {st.hearts}/{MAX_HEARTS} hartjes
            {refillIn > 0 && ` · volgende over ${Math.ceil(refillIn / 60000)} min`}
          </div>
        </div>
        <button
          className="btn small"
          disabled={st.hearts >= MAX_HEARTS || st.gems < REFILL_COST}
          onClick={() => st.buyRefill() && toast('❤️ Hartjes aangevuld!')}
        >
          💎 {REFILL_COST}
        </button>
      </div>
      <div className="card row">
        <div style={{ fontSize: 40 }}>♾️</div>
        <div className="grow">
          <b>Onbeperkt hartjes</b>
          <div className="muted" style={{ fontSize: 14 }}>
            Gratis! Zet hartjes uit als je zonder druk wilt leren.
          </div>
        </div>
        <button
          className={`toggle ${st.settings.unlimitedHearts ? 'on' : ''}`}
          onClick={() => st.updateSettings({ unlimitedHearts: !st.settings.unlimitedHearts })}
          aria-label="Onbeperkt hartjes"
        />
      </div>
      <h2 className="section-title" style={{ fontSize: 19 }}>
        Power-ups
      </h2>
      <div className="card row">
        <div style={{ fontSize: 40 }}>🧊</div>
        <div className="grow">
          <b>Streak bevriezen</b>
          <div className="muted" style={{ fontSize: 14 }}>
            Beschermt je streak als je een dag mist. Je hebt er {st.streakFreezes}/2.
          </div>
        </div>
        <button className="btn small" disabled={st.streakFreezes >= 2 || st.gems < FREEZE_COST} onClick={() => st.buyFreeze() && toast('🧊 Streak-bevriezer gekocht!')}>
          💎 {FREEZE_COST}
        </button>
      </div>
      <div className="card row">
        <div style={{ fontSize: 40 }}>⚡</div>
        <div className="grow">
          <b>Dubbele XP</b>
          <div className="muted" style={{ fontSize: 14 }}>
            {doubleActive
              ? `Actief! Nog ${Math.ceil((st.doubleXpUntil - Date.now()) / 60000)} minuten.`
              : 'Verdien 15 minuten lang dubbele XP.'}
          </div>
        </div>
        <button className="btn small" disabled={doubleActive || st.gems < DOUBLE_XP_COST} onClick={() => st.buyDoubleXp() && toast('⚡ Dubbele XP is actief!')}>
          💎 {DOUBLE_XP_COST}
        </button>
      </div>
    </div>
  );
}

// ------------------------------------------------------------------
interface Achievement {
  id: string;
  emoji: string;
  title: string;
  desc: string;
  value: number;
  goal: number;
}

function achievements(st: ReturnType<typeof useStore.getState>): Achievement[] {
  const words = learnedWords(st.completed).length;
  const units = UNITS.filter((u) => st.unitTests[u.id]).length;
  const letters = LETTER_LESSONS.filter((l) => (st.completed[l.id] ?? 0) > 0).length;
  return [
    { id: 'streak', emoji: '🔥', title: 'Volhouder', desc: 'Haal een streak van 7 dagen', value: st.longestStreak, goal: 7 },
    { id: 'streak30', emoji: '🌋', title: 'Onstuitbaar', desc: 'Haal een streak van 30 dagen', value: st.longestStreak, goal: 30 },
    { id: 'xp', emoji: '⚡', title: 'XP-verzamelaar', desc: 'Verdien 1000 XP', value: st.xp, goal: 1000 },
    { id: 'lessons', emoji: '📚', title: 'Leergierig', desc: 'Voltooi 25 lessen', value: st.lessonsDone, goal: 25 },
    { id: 'perfect', emoji: '🎯', title: 'Perfectionist', desc: 'Maak 10 lessen zonder fouten', value: st.perfectLessons, goal: 10 },
    { id: 'words', emoji: '🧠', title: 'Woordenschat', desc: 'Leer 200 woorden', value: words, goal: 200 },
    { id: 'units', emoji: '🏆', title: 'Kampioen', desc: 'Haal 5 unit-toetsen', value: units, goal: 5 },
    { id: 'letters', emoji: '🔤', title: 'Ćirilica', desc: 'Voltooi alle Cyrillische lessen', value: letters, goal: LETTER_LESSONS.length }
  ];
}

function XpChart() {
  const xpByDay = useStore((s) => s.xpByDay);
  const today = dayKey();
  const days = Array.from({ length: 7 }, (_, i) => addDays(today, i - 6));
  const vals = days.map((d) => xpByDay[d] ?? 0);
  const max = Math.max(20, ...vals);
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8, height: 120, padding: '8px 0' }}>
      {days.map((d, i) => (
        <div key={d} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, height: '100%' }}>
          <div style={{ flex: 1, display: 'flex', alignItems: 'flex-end', width: '100%' }}>
            <div
              title={`${vals[i]} XP`}
              style={{
                width: '100%',
                height: `${(vals[i] / max) * 100}%`,
                minHeight: vals[i] ? 4 : 2,
                background: d === today ? 'var(--gold)' : 'var(--blue)',
                borderRadius: '6px 6px 2px 2px',
                opacity: vals[i] ? 1 : 0.25
              }}
            />
          </div>
          <span className="muted" style={{ fontSize: 12, fontWeight: 800 }}>
            {NL_DAYS_SHORT[(parseDay(d).getDay() + 6) % 7]}
          </span>
        </div>
      ))}
    </div>
  );
}

export function Profile({ openSettings }: { openSettings: () => void }) {
  const st = useStore();
  const learned = learnedWords(st.completed).length;
  const ach = achievements(st);
  const doneLessons = LESSONS.filter((l) => isLessonDone(st.completed, l.lesson.id)).length;
  const since = new Date(st.createdAt).toLocaleDateString('nl-NL', { month: 'long', year: 'numeric' });
  return (
    <div className="page">
      <div className="row" style={{ marginTop: 10 }}>
        <div className="avatar" style={{ width: 80, height: 80, fontSize: 44 }}>
          🦔
        </div>
        <div className="grow">
          <h1 style={{ margin: 0 }}>{st.name || 'Leerling'}</h1>
          <div className="muted">Lid sinds {since}</div>
          <div className="chip" style={{ marginTop: 6 }}>
            🇷🇸 Servisch · {LEAGUES[st.league.tier].emoji} {LEAGUES[st.league.tier].name}
          </div>
        </div>
        <button className="icon-btn" onClick={openSettings} aria-label="Instellingen" style={{ fontSize: 26 }}>
          ⚙️
        </button>
      </div>
      <h2 className="section-title">Statistieken</h2>
      <div className="grid2">
        <div className="statbox">
          <span className="emoji">🔥</span>
          <div>
            <b>{st.streak}</b>
            <span>Dagen streak</span>
          </div>
        </div>
        <div className="statbox">
          <span className="emoji">⚡</span>
          <div>
            <b>{st.xp}</b>
            <span>Totaal XP</span>
          </div>
        </div>
        <div className="statbox">
          <span className="emoji">📚</span>
          <div>
            <b>
              {doneLessons}/{LESSONS.length}
            </b>
            <span>Lessen</span>
          </div>
        </div>
        <div className="statbox">
          <span className="emoji">🧠</span>
          <div>
            <b>{learned}</b>
            <span>Woorden</span>
          </div>
        </div>
        <div className="statbox">
          <span className="emoji">🏅</span>
          <div>
            <b>{st.longestStreak}</b>
            <span>Langste streak</span>
          </div>
        </div>
        <div className="statbox">
          <span className="emoji">⏱️</span>
          <div>
            <b>{Math.round(st.minutesLearned)}</b>
            <span>Minuten geleerd</span>
          </div>
        </div>
      </div>
      <h2 className="section-title">Deze week</h2>
      <div className="card">
        <WeekDots />
        <XpChart />
      </div>
      <h2 className="section-title">Prestaties</h2>
      <div className="card" style={{ padding: '4px 14px' }}>
        {ach.map((a) => {
          const done = a.value >= a.goal;
          return (
            <div key={a.id} className="list-item">
              <div className="avatar" style={{ fontSize: 26, ...(done ? { background: 'var(--gold)', borderColor: 'var(--gold-dark)' } : { filter: 'grayscale(0.7)' }) }}>
                {a.emoji}
              </div>
              <div className="grow">
                <b>{a.title}</b>
                <div className="muted" style={{ fontSize: 14, marginBottom: 6 }}>
                  {a.desc}
                </div>
                <div className={`progress ${done ? 'gold' : ''}`} style={{ height: 12 }}>
                  <div style={{ width: `${Math.min(100, (a.value / a.goal) * 100)}%` }} />
                </div>
              </div>
              <div className="muted" style={{ fontWeight: 800, fontSize: 14, minWidth: 54, textAlign: 'right' }}>
                {Math.min(a.value, a.goal)}/{a.goal}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ------------------------------------------------------------------
export function SettingsScreen({ back, toast }: { back: () => void; toast: (m: string) => void }) {
  const st = useStore();
  const s = st.settings;
  const fileRef = useRef<HTMLInputElement>(null);
  const [confirmReset, setConfirmReset] = useState(false);
  const voice = useMemo(() => voiceName(), []);
  const toggles: { key: keyof typeof s; title: string; desc: string }[] = [
    { key: 'sound', title: 'Geluidseffecten', desc: 'Piepjes bij goed en fout' },
    { key: 'listening', title: 'Luisteroefeningen', desc: 'Servische zinnen worden voorgelezen' },
    { key: 'speaking', title: 'Spreekoefeningen', desc: 'Zinnen inspreken met de microfoon' },
    { key: 'cyrillic', title: 'Cyrillisch schrift', desc: 'Toon Servisch als ćirilica (Ћирилица)' },
    { key: 'unlimitedHearts', title: 'Onbeperkt hartjes', desc: 'Geen hartjes verliezen bij fouten' }
  ];
  const download = () => {
    const blob = new Blob([exportState()], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `govori-voortgang-${dayKey()}.json`;
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };
  return (
    <div className="page">
      <div className="row" style={{ marginTop: 6 }}>
        <button className="icon-btn" onClick={back} aria-label="Terug">
          <BackIcon />
        </button>
        <h1 className="section-title" style={{ margin: 0 }}>
          Instellingen
        </h1>
      </div>
      <h2 className="section-title" style={{ fontSize: 19 }}>
        Profiel
      </h2>
      <div className="card">
        <label className="muted" style={{ fontWeight: 800, fontSize: 14 }}>
          Naam
        </label>
        <input className="search" value={st.name} onChange={(e) => st.setName(e.target.value)} style={{ marginTop: 6 }} />
        <div className="muted" style={{ fontWeight: 800, fontSize: 14, marginTop: 14 }}>
          Dagdoel
        </div>
        <div className="row" style={{ flexWrap: 'wrap', gap: 8, marginTop: 6 }}>
          {[10, 20, 30, 50].map((g) => (
            <button key={g} className={`btn small ${st.dailyGoal === g ? '' : 'ghost'}`} onClick={() => st.setDailyGoal(g)}>
              {g} XP
            </button>
          ))}
        </div>
      </div>
      <h2 className="section-title" style={{ fontSize: 19 }}>
        Leren
      </h2>
      <div className="card" style={{ padding: '4px 14px' }}>
        {toggles.map((t) => (
          <div key={t.key} className="list-item">
            <div className="grow">
              <b>{t.title}</b>
              <div className="muted" style={{ fontSize: 14 }}>
                {t.desc}
              </div>
            </div>
            <button className={`toggle ${s[t.key] ? 'on' : ''}`} onClick={() => st.updateSettings({ [t.key]: !s[t.key] })} aria-label={t.title} />
          </div>
        ))}
      </div>
      <div className="card" style={{ marginTop: 14 }}>
        <b>Servische stem</b>
        <p className="muted" style={{ fontSize: 14, margin: '4px 0 10px' }}>
          {hasSerbianVoice()
            ? `Gebruikt: ${voice ?? 'standaardstem'}`
            : 'Er is geen Servische (of Kroatische) stem gevonden op dit apparaat. Installeer er een via de instellingen voor tekst-naar-spraak van je telefoon of computer om luisteroefeningen te krijgen.'}
        </p>
        <button className="btn small ghost" onClick={() => speak('Zdravo! Kako si?')}>
          🔊 Test de stem
        </button>
      </div>
      <h2 className="section-title" style={{ fontSize: 19 }}>
        Voortgang
      </h2>
      <div className="card">
        <p className="muted" style={{ fontSize: 14, marginTop: 0 }}>
          Je voortgang wordt alleen op dit apparaat bewaard. Maak een back-up om hem op een ander apparaat te gebruiken.
        </p>
        <div className="row" style={{ flexWrap: 'wrap', gap: 10 }}>
          <button className="btn small" onClick={download}>
            ⬇️ Back-up downloaden
          </button>
          <button className="btn small ghost" onClick={() => fileRef.current?.click()}>
            ⬆️ Back-up terugzetten
          </button>
          <input
            ref={fileRef}
            type="file"
            accept="application/json,.json"
            hidden
            onChange={async (e) => {
              const f = e.target.files?.[0];
              if (!f) return;
              const ok = st.importState(await f.text());
              toast(ok ? '✅ Voortgang teruggezet!' : '❌ Dit bestand kon niet worden gelezen.');
              e.target.value = '';
            }}
          />
        </div>
        <button className="btn small flat" style={{ color: 'var(--red)', marginTop: 10, paddingLeft: 0 }} onClick={() => setConfirmReset(true)}>
          Alle voortgang wissen
        </button>
      </div>
      <p className="muted" style={{ fontSize: 13, textAlign: 'center', margin: '24px 0' }}>
        Govori! · gemaakt met ❤️ om Servisch te leren
      </p>
      {confirmReset && (
        <div className="overlay" onClick={() => setConfirmReset(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <Mascot mood="sad" size={100} />
            <h2>Alles wissen?</h2>
            <p className="muted">Al je XP, streaks en lessen worden verwijderd. Dit kan niet ongedaan worden gemaakt.</p>
            <button
              className="btn red block"
              onClick={() => {
                st.resetAll();
                setConfirmReset(false);
                back();
              }}
            >
              Ja, wis alles
            </button>
            <button className="btn ghost block" onClick={() => setConfirmReset(false)}>
              Annuleren
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ------------------------------------------------------------------
export function Guide({ unitId, back }: { unitId: string; back: () => void }) {
  const unit = findUnit(unitId);
  const script = useScript();
  if (!unit) return null;
  const words = unit.lessons.flatMap((l) => l.words);
  return (
    <div className="page guide">
      <div className="row" style={{ marginTop: 6 }}>
        <button className="icon-btn" onClick={back} aria-label="Terug">
          <BackIcon />
        </button>
        <div>
          <div className="muted" style={{ fontWeight: 800, fontSize: 13, textTransform: 'uppercase' }}>
            Gids · Unit {UNITS.indexOf(unit) + 1}
          </div>
          <h1 style={{ margin: 0 }}>
            {unit.emoji} {unit.title}
          </h1>
        </div>
      </div>
      {unit.guide.map((g) => {
        const rows = g.body.filter((b) => b.startsWith('|'));
        const paras = g.body.filter((b) => !b.startsWith('|'));
        return (
          <section key={g.title}>
            <h2>{g.title}</h2>
            {g.body.map((b, i) => {
              if (b.startsWith('|')) {
                // render consecutive rows as one table (at the first row)
                if (i > 0 && g.body[i - 1].startsWith('|')) return null;
                const block: string[] = [];
                for (let j = i; j < g.body.length && g.body[j].startsWith('|'); j++) block.push(g.body[j]);
                return (
                  <table key={i}>
                    <tbody>
                      {block.map((r) => {
                        const [a, b2] = r.slice(1).split('|').map((x) => x.trim());
                        return (
                          <tr key={r}>
                            <td>{script(a)}</td>
                            <td>{b2}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                );
              }
              return <p key={i}>{b}</p>;
            })}
            {g.examples?.map((ex) => (
              <div key={ex.sr} className="example">
                <SpeakBtn text={ex.sr} />
                <div>
                  <b>{script(ex.sr)}</b>
                  <span className="muted">{ex.nl}</span>
                </div>
              </div>
            ))}
            {rows.length === 0 && paras.length === 0 && null}
          </section>
        );
      })}
      <h2>Woorden in deze unit</h2>
      <div className="card" style={{ padding: '4px 14px', marginBottom: 30 }}>
        {words.map((w) => (
          <div key={w.id} className="list-item">
            <div style={{ fontSize: 24, width: 32, textAlign: 'center' }}>{w.emoji}</div>
            <div className="grow">
              <b>{script(w.sr)}</b>
              <div className="muted" style={{ fontSize: 14 }}>
                {w.nl}
                {w.note ? ` · ${w.note}` : ''}
              </div>
            </div>
            <button className="icon-btn" onClick={() => speak(w.sr)} aria-label="Uitspreken">
              🔊
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

// ------------------------------------------------------------------
export function Onboarding() {
  const finish = useStore((s) => s.finishOnboarding);
  const [step, setStep] = useState(0);
  const [name, setName] = useState('');
  const [goal, setGoal] = useState(20);
  const goals = [
    { xp: 10, label: 'Rustig', time: '5 min per dag' },
    { xp: 20, label: 'Normaal', time: '10 min per dag' },
    { xp: 30, label: 'Serieus', time: '15 min per dag' },
    { xp: 50, label: 'Intensief', time: '20+ min per dag' }
  ];
  return (
    <div className="onboarding">
      {step === 0 && (
        <>
          <div className="content">
            <Mascot mood="cheer" size={190} className="bounce" />
            <h1 style={{ fontSize: 34, color: 'var(--blue)' }}>
              Govori<span style={{ color: 'var(--red)' }}>!</span>
            </h1>
            <p style={{ fontSize: 20, fontWeight: 700, margin: 0 }}>Leer Servisch, een paar minuten per dag.</p>
            <p className="muted">
              Hoi! Ik ben Ježa (spreek uit: "jezja"), de egel. Ik help je om Servisch te leren – gratis, leuk en in kleine stapjes.
            </p>
          </div>
          <button className="btn block" onClick={() => setStep(1)}>
            Aan de slag
          </button>
        </>
      )}
      {step === 1 && (
        <>
          <div className="content">
            <Mascot mood="happy" size={130} />
            <h2>Hoe heet je?</h2>
            <input className="name-input" placeholder="Je naam" value={name} onChange={(e) => setName(e.target.value)} autoFocus maxLength={24} />
          </div>
          <button className="btn block" disabled={!name.trim()} onClick={() => setStep(2)}>
            Ga door
          </button>
        </>
      )}
      {step === 2 && (
        <>
          <div className="content">
            <Mascot mood="think" size={110} />
            <h2>Kies je dagdoel</h2>
            <div className="options" style={{ width: '100%' }}>
              {goals.map((g) => (
                <button key={g.xp} className={`option goal-option ${goal === g.xp ? 'selected' : ''}`} onClick={() => setGoal(g.xp)}>
                  <span>{g.label}</span>
                  <span className="muted" style={{ fontWeight: 700 }}>
                    {g.time}
                  </span>
                </button>
              ))}
            </div>
          </div>
          <button className="btn block" onClick={() => setStep(3)}>
            Ga door
          </button>
        </>
      )}
      {step === 3 && (
        <>
          <div className="content">
            <Mascot mood="cheer" size={150} />
            <h2>Super, {name.trim()}!</h2>
            <p className="muted">
              Je begint bij het begin: begroetingen. Tik op een Servisch woord in een zin om te zien wat het betekent. Elke dag oefenen
              houdt je streak 🔥 in leven!
            </p>
            {!hasSerbianVoice() && (
              <p className="muted" style={{ fontSize: 14 }}>
                Tip: op dit apparaat is geen Servische stem gevonden. Luisteroefeningen worden daarom overgeslagen. Je kunt een stem installeren via
                de spraakinstellingen van je apparaat.
              </p>
            )}
          </div>
          <button className="btn green block" onClick={() => finish(name, goal)}>
            Start mijn eerste les
          </button>
        </>
      )}
    </div>
  );
}
