import Image from "next/image";

/**
 * Hero mark: the 3D avatar standing in front of concentric orbits that carry
 * technology nodes around it. The rings and glow are SVG + CSS, so the only
 * asset is the portrait itself, and everything holds still under
 * prefers-reduced-motion (see globals.css).
 */
export function HeroVisual({ name }: { name: string }) {
  const nodes = [
    { angle: 0, label: "TS" },
    { angle: 72, label: "React" },
    { angle: 144, label: "Node" },
    { angle: 216, label: "SQL" },
    { angle: 288, label: "Py" },
  ];

  return (
    /*
      Definite width, not w-full: every child here is absolutely positioned, so
      the box has no in-flow content to size from, and a percentage width inside
      the hero's `auto` grid column collapses it to zero.
    */
    <div className="relative mx-auto aspect-square w-[280px] sm:w-[360px] lg:w-[400px] xl:w-[420px]">
      {/* Soft green glow behind the figure — the single largest accent moment. */}
      <div
        className="pulse-ring absolute inset-[16%] rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(34,197,94,0.32), transparent 68%)" }}
        aria-hidden="true"
      />

      <svg viewBox="0 0 400 400" className="absolute inset-0 h-full w-full" aria-hidden="true">
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
                <g className="orbit-node">
                  <circle r="22" fill="#111815" stroke="#2a3a32" strokeWidth="1" />
                  <text
                    textAnchor="middle" dominantBaseline="central"
                    fill="#93a89b" fontSize="10" fontFamily="var(--font-space-grotesk), monospace"
                  >
                    {n.label}
                  </text>
                </g>
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

      </svg>

      <Image
        src="/avatar.webp"
        alt={`3D illustrated portrait of ${name}`}
        width={463}
        height={618}
        priority
        className="absolute bottom-0 left-1/2 h-[94%] w-auto -translate-x-1/2 select-none"
        style={{
          // The portrait is a bust, so it would otherwise end on a hard
          // horizontal edge. Fade the last stretch into the page instead.
          maskImage: "linear-gradient(to bottom, #000 86%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, #000 86%, transparent 100%)",
        }}
      />
    </div>
  );
}
