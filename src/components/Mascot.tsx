export type Mood = 'happy' | 'sad' | 'cheer' | 'think' | 'sleep';

/** "Ježa" – an original hedgehog mascot drawn in SVG. */
export function Mascot({ mood = 'happy', size = 120, className = '' }: { mood?: Mood; size?: number; className?: string }) {
  const spikes: string[] = [];
  // spiky back: an arc of triangles
  const cx = 100;
  const cy = 112;
  for (let i = 0; i <= 12; i++) {
    const a = Math.PI * (1.02 + (i / 12) * 0.96);
    const a1 = a - 0.13;
    const a2 = a + 0.13;
    const r1 = 62;
    const r2 = 86 + (i % 2) * 8;
    spikes.push(
      `${cx + r1 * Math.cos(a1)},${cy + r1 * Math.sin(a1)} ${cx + r2 * Math.cos(a)},${cy + r2 * Math.sin(a)} ${cx + r1 * Math.cos(a2)},${cy + r1 * Math.sin(a2)}`
    );
  }
  const eyes =
    mood === 'sleep' ? (
      <>
        <path d="M70 108 q8 6 16 0" stroke="#2b1d12" strokeWidth="4" fill="none" strokeLinecap="round" />
        <path d="M114 108 q8 6 16 0" stroke="#2b1d12" strokeWidth="4" fill="none" strokeLinecap="round" />
      </>
    ) : mood === 'cheer' ? (
      <>
        <path d="M68 110 q10 -12 20 0" stroke="#2b1d12" strokeWidth="5" fill="none" strokeLinecap="round" />
        <path d="M112 110 q10 -12 20 0" stroke="#2b1d12" strokeWidth="5" fill="none" strokeLinecap="round" />
      </>
    ) : (
      <>
        <ellipse cx="78" cy="106" rx="8" ry={mood === 'sad' ? 8 : 10} fill="#2b1d12" />
        <ellipse cx="122" cy="106" rx="8" ry={mood === 'sad' ? 8 : 10} fill="#2b1d12" />
        <circle cx="81" cy="102" r="3" fill="#fff" />
        <circle cx="125" cy="102" r="3" fill="#fff" />
        {mood === 'sad' && (
          <>
            <path d="M66 92 l18 6" stroke="#2b1d12" strokeWidth="4" strokeLinecap="round" />
            <path d="M134 92 l-18 6" stroke="#2b1d12" strokeWidth="4" strokeLinecap="round" />
          </>
        )}
        {mood === 'think' && <path d="M112 90 q10 -6 20 0" stroke="#2b1d12" strokeWidth="4" fill="none" strokeLinecap="round" />}
      </>
    );
  const mouth =
    mood === 'sad' ? (
      <path d="M88 140 q12 -10 24 0" stroke="#2b1d12" strokeWidth="4" fill="none" strokeLinecap="round" />
    ) : mood === 'cheer' ? (
      <path d="M84 132 q16 22 32 0 z" fill="#c2255c" stroke="#2b1d12" strokeWidth="3" strokeLinejoin="round" />
    ) : mood === 'think' ? (
      <path d="M90 138 h18" stroke="#2b1d12" strokeWidth="4" strokeLinecap="round" />
    ) : mood === 'sleep' ? (
      <ellipse cx="100" cy="138" rx="6" ry="5" fill="#2b1d12" />
    ) : (
      <path d="M86 134 q14 14 28 0" stroke="#2b1d12" strokeWidth="4" fill="none" strokeLinecap="round" />
    );
  return (
    <svg className={`mascot ${className}`} width={size} height={size} viewBox="0 0 200 200" aria-label="Ježa de egel" role="img">
      {mood === 'cheer' && (
        <>
          <path d="M30 120 q-18 -20 -10 -44" stroke="#8a5a36" strokeWidth="12" fill="none" strokeLinecap="round" />
          <path d="M170 120 q18 -20 10 -44" stroke="#8a5a36" strokeWidth="12" fill="none" strokeLinecap="round" />
        </>
      )}
      <g fill="#6b4226">
        {spikes.map((p, i) => (
          <polygon key={i} points={p} />
        ))}
      </g>
      <ellipse cx="100" cy="122" rx="70" ry="60" fill="#8a5a36" />
      {/* face */}
      <ellipse cx="100" cy="124" rx="50" ry="46" fill="#f3d9b1" />
      {/* ears */}
      <circle cx="56" cy="82" r="13" fill="#f3d9b1" stroke="#8a5a36" strokeWidth="5" />
      <circle cx="144" cy="82" r="13" fill="#f3d9b1" stroke="#8a5a36" strokeWidth="5" />
      {/* cheeks */}
      <ellipse cx="66" cy="128" rx="9" ry="6" fill="#ffa8a8" opacity="0.7" />
      <ellipse cx="134" cy="128" rx="9" ry="6" fill="#ffa8a8" opacity="0.7" />
      {eyes}
      <ellipse cx="100" cy="122" rx="9" ry="7" fill="#2b1d12" />
      {mouth}
      {/* tiny Serbian-flag scarf */}
      <path d="M52 166 q48 22 96 0 l0 8 q-48 22 -96 0 z" fill="#c92a2a" />
      <path d="M52 174 q48 22 96 0 l0 7 q-48 22 -96 0 z" fill="#1c5fb0" />
      <path d="M52 181 q48 22 96 0 l0 6 q-48 20 -96 0 z" fill="#ffffff" />
      {mood === 'sleep' && (
        <text x="150" y="60" fontSize="30" fontWeight="900" fill="#7b858f">
          z
        </text>
      )}
    </svg>
  );
}
