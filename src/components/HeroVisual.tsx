/**
 * Animated hero mark: concentric orbits carrying technology nodes around a
 * monogram. Pure SVG + CSS so it costs no JavaScript and no image payload,
 * and it holds still under prefers-reduced-motion (see globals.css).
 */
export function HeroVisual({ initials }: { initials: string }) {
  const nodes = [
    { angle: 0, label: "TS" },
    { angle: 72, label: "Go" },
    { angle: 144, label: "Py" },
    { angle: 216, label: "Rs" },
    { angle: 288, label: "SQL" },
  ];

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[420px]" aria-hidden="true">
      {/* Soft green glow behind the mark — the single largest accent moment. */}
      <div
        className="pulse-ring absolute inset-[14%] rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(34,197,94,0.30), transparent 68%)" }}
      />

      <svg viewBox="0 0 400 400" className="relative h-full w-full">
        <defs>
          <linearGradient id="ring-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#22c55e" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#22c55e" stopOpacity="0.05" />
          </linearGradient>
        </defs>

        <circle cx="200" cy="200" r="150" fill="none" stroke="#1e2a24" strokeWidth="1" />
        <circle cx="200" cy="200" r="112" fill="none" stroke="#1e2a24" strokeWidth="1" />

        <g className="orbit-ring">
          <circle
            cx="200" cy="200" r="150"
            fill="none" stroke="url(#ring-grad)" strokeWidth="1.5"
            strokeDasharray="6 14" strokeLinecap="round"
          />
          {nodes.map((n) => {
            const rad = (n.angle * Math.PI) / 180;
            return (
              <g key={n.label} transform={`translate(${200 + 150 * Math.cos(rad)} ${200 + 150 * Math.sin(rad)})`}>
                <circle r="20" fill="#111815" stroke="#2a3a32" strokeWidth="1" />
                <text
                  textAnchor="middle" dominantBaseline="central"
                  fill="#93a89b" fontSize="12" fontFamily="var(--font-space-grotesk), monospace"
                >
                  {n.label}
                </text>
              </g>
            );
          })}
        </g>

        <g className="orbit-ring-reverse">
          <circle
            cx="200" cy="200" r="112"
            fill="none" stroke="#22c55e" strokeOpacity="0.25"
            strokeWidth="1" strokeDasharray="2 10" strokeLinecap="round"
          />
        </g>

        <circle cx="200" cy="200" r="76" fill="#111815" stroke="#22c55e" strokeOpacity="0.45" strokeWidth="1.5" />
        <text
          x="200" y="200" textAnchor="middle" dominantBaseline="central"
          fill="#e8efe9" fontSize="46" fontWeight="600"
          fontFamily="var(--font-space-grotesk), sans-serif" letterSpacing="1"
        >
          {initials}
        </text>
      </svg>
    </div>
  );
}
