import { useEffect, useRef, useState } from 'react';
import { LESSONS, UNITS, isLessonDone, isLessonUnlocked, unitDone, currentLessonIndex } from '../data/course';
import { todayXp, useStore } from '../lib/store';
import { Mascot } from '../components/Mascot';
import type { SessionSpec } from './LessonScreen';
import type { Unit } from '../data/types';

export function darken(hex: string, amt = 0.22): string {
  const n = parseInt(hex.slice(1), 16);
  const r = Math.max(0, Math.round(((n >> 16) & 255) * (1 - amt)));
  const g = Math.max(0, Math.round(((n >> 8) & 255) * (1 - amt)));
  const b = Math.max(0, Math.round((n & 255) * (1 - amt)));
  return `rgb(${r},${g},${b})`;
}

const OFFSETS = [0, 44, 70, 44, 0, -44, -70, -44];
const LESSON_ICONS = ['⭐', '📘', '🎧', '💬', '🏋️', '🎯'];

type NodeKind =
  | { kind: 'lesson'; lessonId: string; index: number; title: string; n: number; of: number }
  | { kind: 'chest'; id: string }
  | { kind: 'test'; unitId: string };

function unitNodes(unit: Unit): NodeKind[] {
  const nodes: NodeKind[] = [];
  unit.lessons.forEach((l, i) => {
    const ref = LESSONS.find((x) => x.lesson.id === l.id)!;
    nodes.push({ kind: 'lesson', lessonId: l.id, index: ref.index, title: l.title, n: i + 1, of: unit.lessons.length });
    if (i === 1 && unit.lessons.length >= 3) nodes.push({ kind: 'chest', id: `${unit.id}-chest` });
  });
  nodes.push({ kind: 'test', unitId: unit.id });
  return nodes;
}

export function Home({ start, openGuide, toast }: { start: (s: SessionSpec) => void; openGuide: (unitId: string) => void; toast: (m: string) => void }) {
  const completed = useStore((s) => s.completed);
  const unitTests = useStore((s) => s.unitTests);
  const chests = useStore((s) => s.chests);
  const openChest = useStore((s) => s.openChest);
  const st = useStore();
  const [open, setOpen] = useState<string | null>(null);
  const currentRef = useRef<HTMLDivElement>(null);
  const curIndex = currentLessonIndex(completed);

  useEffect(() => {
    currentRef.current?.scrollIntoView({ block: 'center', behavior: 'auto' });
  }, []);

  useEffect(() => {
    if (!open) return;
    const pop = document.querySelector('.node-wrap .popover');
    pop?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    const close = (e: Event) => {
      const el = e.target as HTMLElement;
      if (!el.closest('.node-wrap')) setOpen(null);
    };
    document.addEventListener('pointerdown', close);
    return () => document.removeEventListener('pointerdown', close);
  }, [open]);

  const firstLockedUnit = UNITS.findIndex((u) => !isLessonUnlocked(completed, LESSONS.find((l) => l.lesson.id === u.lessons[0].id)!.index));
  const goal = st.dailyGoal;
  const xpToday = todayXp(st);

  return (
    <div className="page">
      <div className="card daily-card" style={{ marginTop: 4 }}>
        <div className="chest">{xpToday >= goal ? '🏆' : '🎯'}</div>
        <div className="grow">
          <div className="row" style={{ justifyContent: 'space-between', marginBottom: 6 }}>
            <b>Dagdoel</b>
            <span className="muted" style={{ fontWeight: 800 }}>
              {Math.min(xpToday, goal)} / {goal} XP
            </span>
          </div>
          <div className={`progress ${xpToday >= goal ? 'gold' : ''}`}>
            <div style={{ width: `${Math.min(100, (xpToday / goal) * 100)}%` }} />
          </div>
        </div>
      </div>

      {UNITS.map((unit, ui) => {
        const firstRef = LESSONS.find((l) => l.lesson.id === unit.lessons[0].id)!;
        const unitUnlocked = isLessonUnlocked(completed, firstRef.index);
        const nodes = unitNodes(unit);
        const allDone = unitDone(completed, unit);
        return (
          <section key={unit.id}>
            <div className={`unit-banner ${unitUnlocked ? '' : 'locked'}`} style={{ background: unit.color }}>
              <div>
                <div className="label">
                  Unit {ui + 1} {unit.emoji}
                </div>
                <h2>{unit.title}</h2>
                <p>{unit.description}</p>
              </div>
              <button className="guide-btn" onClick={() => openGuide(unit.id)}>
                <span className="ico">📖</span>
                Gids
              </button>
            </div>
            {ui === firstLockedUnit && ui > 0 && (
              <button className="btn ghost small jump-btn" onClick={() => start({ kind: 'jump', unitIndex: ui })}>
                ⏩ Spring hierheen?
              </button>
            )}
            <div className="path">
              {nodes.map((node, ni) => {
                const offset = OFFSETS[ni % OFFSETS.length];
                let state: 'done' | 'current' | 'open' | 'locked' = 'locked';
                let icon = '⭐';
                let key = '';
                if (node.kind === 'lesson') {
                  key = node.lessonId;
                  const isDone = isLessonDone(completed, node.lessonId);
                  const unlocked = isLessonUnlocked(completed, node.index);
                  state = isDone ? 'done' : unlocked ? 'current' : 'locked';
                  icon = isDone ? '✔' : LESSON_ICONS[(node.n - 1) % LESSON_ICONS.length];
                } else if (node.kind === 'chest') {
                  key = node.id;
                  const prevLesson = nodes[ni - 1] as Extract<NodeKind, { kind: 'lesson' }>;
                  const unlocked = isLessonDone(completed, prevLesson.lessonId);
                  state = chests[node.id] ? 'done' : unlocked ? 'open' : 'locked';
                  icon = chests[node.id] ? '📭' : '🎁';
                } else {
                  key = node.unitId + '-test';
                  state = unitTests[node.unitId] ? 'done' : allDone ? 'open' : 'locked';
                  icon = '🏆';
                }
                const isCurrent = node.kind === 'lesson' && node.index === curIndex;
                const color = unit.color;
                const style =
                  state === 'locked'
                    ? undefined
                    : state === 'done' && node.kind !== 'lesson'
                      ? { background: 'var(--locked)', boxShadow: `0 7px 0 var(--locked-dark)` }
                      : node.kind === 'test'
                        ? { background: 'var(--gold)', boxShadow: `0 7px 0 var(--gold-dark)` }
                        : { background: color, boxShadow: `0 7px 0 ${darken(color)}` };
                const isOpen = open === key;
                return (
                  <div
                    key={key}
                    className="node-wrap"
                    style={{ transform: `translateX(${offset}px)`, zIndex: isOpen ? 9 : 1, marginTop: isCurrent ? 34 : undefined }}
                    ref={isCurrent ? currentRef : undefined}
                  >
                    {isCurrent && !isOpen && <div className="node-start">Start</div>}
                    <button
                      className={`node ${state === 'locked' ? 'locked' : ''}`}
                      style={style}
                      aria-label={node.kind === 'lesson' ? node.title : node.kind === 'chest' ? 'Schatkist' : 'Unit-toets'}
                      onClick={() => {
                        if (node.kind === 'chest' && state === 'open') {
                          const amount = openChest(node.id);
                          if (amount) toast(`🎁 Je hebt ${amount} bonus-XP gevonden!`);
                          return;
                        }
                        setOpen(isOpen ? null : key);
                      }}
                    >
                      {icon}
                    </button>
                    {isOpen && node.kind === 'lesson' && (
                      <div className={`popover ${state === 'locked' ? 'locked' : ''}`} style={state === 'locked' ? undefined : { background: color }}>
                        <h3>{node.title}</h3>
                        {state === 'locked' ? (
                          <p>Voltooi eerst de lessen hierboven om deze te openen!</p>
                        ) : (
                          <>
                            <p>
                              Les {node.n} van {node.of}
                              {state === 'done' && ` · ${completed[node.lessonId]}× gedaan`}
                            </p>
                            <button className="btn block" style={{ color }} onClick={() => start({ kind: 'lesson', lessonId: node.lessonId })}>
                              {state === 'done' ? 'Herhalen +10 XP' : 'Start +10 XP'}
                            </button>
                          </>
                        )}
                      </div>
                    )}
                    {isOpen && node.kind === 'chest' && (
                      <div className="popover locked">
                        <h3>Schatkist</h3>
                        <p>{state === 'done' ? 'Deze kist heb je al geopend.' : 'Voltooi de les hiervoor om deze kist te openen.'}</p>
                      </div>
                    )}
                    {isOpen && node.kind === 'test' && (
                      <div className={`popover ${state === 'locked' ? 'locked' : ''}`} style={state === 'locked' ? undefined : { background: 'var(--gold-dark)' }}>
                        <h3>Unit-toets: {unit.title}</h3>
                        {state === 'locked' ? (
                          <p>Voltooi alle lessen van deze unit om de toets te openen.</p>
                        ) : (
                          <>
                            <p>{state === 'done' ? 'Gehaald! Je kunt hem nog eens doen.' : 'Laat zien wat je hebt geleerd en verdien een trofee!'}</p>
                            <button className="btn block" style={{ color: 'var(--gold-dark)' }} onClick={() => start({ kind: 'unitTest', unitId: unit.id })}>
                              {state === 'done' ? 'Opnieuw +20 XP' : 'Start +20 XP'}
                            </button>
                          </>
                        )}
                      </div>
                    )}
                    {ni === 2 && (
                      <div className="path-mascot" style={{ left: offset > 0 ? -175 : 120, top: -20 }}>
                        <Mascot size={96} mood={unitUnlocked ? (allDone ? 'cheer' : 'happy') : 'sleep'} />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        );
      })}
      <div className="card" style={{ textAlign: 'center', margin: '10px 0 30px' }}>
        <Mascot mood="cheer" size={100} />
        <h3>Meer komt eraan!</h3>
        <p className="muted" style={{ margin: 0 }}>
          Heb je alles af? Blijf oefenen in het tabblad "Oefenen" en lees Cyrillisch in "Letters".
        </p>
      </div>
    </div>
  );
}
