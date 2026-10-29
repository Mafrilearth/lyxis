"use client";

/**
 * Implementation A: Pure SVG + Hardware-Accelerated CSS
 * - Zero JS bundle overhead (0 KB)
 * - 60-120 FPS buttery smooth via GPU transform compositor
 * - Ambient floating breathing effect
 */
export function PureCssLinearMark() {
  return (
    <div className="relative w-full max-w-[360px] aspect-square mx-auto flex items-center justify-center bg-[#07090E] rounded-2xl border border-border/40 p-6 overflow-hidden select-none">
      {/* Subtle isometric grid background */}
      <svg
        aria-hidden="true"
        className="absolute inset-0 w-full h-full opacity-15 pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <title>Isometric Grid Background</title>
        <defs>
          <pattern id="iso-grid-css" width="40" height="23" patternUnits="userSpaceOnUse">
            <path
              d="M0 11.5 L20 0 L40 11.5 L20 23 Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.5"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#iso-grid-css)" />
      </svg>

      {/* Technical Header Callout */}
      <div className="absolute top-4 left-4 font-mono text-[10px] text-muted-foreground uppercase tracking-widest flex items-center gap-2">
        <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary animate-ping" />
        <span>FIG 0.1 — PURE CSS ENGINE</span>
      </div>

      <div className="absolute top-4 right-4 font-mono text-[9px] text-primary/80 uppercase tracking-wider">
        0 KB JS RUNTIME
      </div>

      {/* Animated SVG Illustration */}
      <svg
        viewBox="0 0 320 320"
        className="w-full h-full drop-shadow-[0_0_24px_rgba(29,78,216,0.15)]"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Pure CSS 3-Tier Isometric Calibration Core"
      >
        <title>Pure CSS 3-Tier Isometric Calibration Core</title>
        <style>{`
          @keyframes float-tier-1 {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-3px); }
          }
          @keyframes float-tier-2 {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-8px); }
          }
          @keyframes float-tier-3 {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-14px); }
          }
          @keyframes scanline {
            0% { transform: translateY(-10px); opacity: 0; }
            50% { opacity: 0.8; }
            100% { transform: translateY(10px); opacity: 0; }
          }
          .tier-base { animation: float-tier-1 5s ease-in-out infinite; transform-origin: center; }
          .tier-mid  { animation: float-tier-2 5s ease-in-out infinite 0.15s; transform-origin: center; }
          .tier-top  { animation: float-tier-3 5s ease-in-out infinite 0.3s; transform-origin: center; }
          .reticle-scan { animation: scanline 2.5s ease-in-out infinite; }
        `}</style>

        {/* ================= TIER 1: BASE (LISTENING COMPREHENSION) ================= */}
        <g className="tier-base">
          <polygon
            points="160,205 240,245 160,285 80,245"
            fill="#090C15"
            stroke="#334155"
            strokeWidth="1.2"
          />
          <polygon
            points="80,245 160,285 160,297 80,257"
            fill="#07090E"
            stroke="#475569"
            strokeWidth="1.2"
          />
          <polygon
            points="160,285 240,245 240,257 160,297"
            fill="#05070A"
            stroke="#334155"
            strokeWidth="1.2"
          />
          <line
            x1="120"
            y1="235"
            x2="150"
            y2="250"
            stroke="#1D4ED8"
            strokeWidth="1"
            strokeDasharray="2 3"
          />
          <line
            x1="170"
            y1="260"
            x2="200"
            y2="245"
            stroke="#1D4ED8"
            strokeWidth="1"
            strokeDasharray="2 3"
          />
        </g>

        {/* ================= TIER 2: MIDDLE (STRUCTURE & SYNTAX) ================= */}
        <g className="tier-mid">
          <polygon
            points="160,160 230,195 160,230 90,195"
            fill="#0B0F19"
            stroke="#64748B"
            strokeWidth="1.2"
          />
          <polygon
            points="90,195 160,230 160,240 90,205"
            fill="#090C15"
            stroke="#475569"
            strokeWidth="1.2"
          />
          <polygon
            points="160,230 230,195 230,205 160,240"
            fill="#07090E"
            stroke="#334155"
            strokeWidth="1.2"
          />
          <circle cx="160" cy="195" r="1.5" fill="#3B82F6" />
          <circle cx="130" cy="180" r="1" fill="#64748B" />
          <circle cx="190" cy="180" r="1" fill="#64748B" />
        </g>

        {/* ================= TIER 3: TOP (READING & CALIBRATION APERTURE) ================= */}
        <g className="tier-top">
          <polygon
            points="160,115 220,145 160,175 100,145"
            fill="#0E1322"
            stroke="#94A3B8"
            strokeWidth="1.4"
          />
          <polygon
            points="100,145 160,175 160,185 100,155"
            fill="#0B0F19"
            stroke="#64748B"
            strokeWidth="1.2"
          />
          <polygon
            points="160,175 220,145 220,155 160,185"
            fill="#090C15"
            stroke="#475569"
            strokeWidth="1.2"
          />

          <ellipse
            cx="160"
            cy="145"
            rx="30"
            ry="16"
            fill="#07090E"
            stroke="#3B82F6"
            strokeWidth="1.4"
          />
          <ellipse
            cx="160"
            cy="145"
            rx="20"
            ry="10.5"
            fill="none"
            stroke="#60A5FA"
            strokeWidth="0.8"
            strokeDasharray="3 3"
          />

          <line x1="160" y1="130" x2="160" y2="160" stroke="#93C5FD" strokeWidth="0.8" />
          <line x1="135" y1="145" x2="185" y2="145" stroke="#93C5FD" strokeWidth="0.8" />
          <circle cx="160" cy="145" r="2" fill="#FFFFFF" />

          <line
            className="reticle-scan"
            x1="140"
            y1="145"
            x2="180"
            y2="145"
            stroke="#60A5FA"
            strokeWidth="1"
          />
        </g>

        {/* Technical Callout Annotations */}
        <line
          x1="220"
          y1="145"
          x2="260"
          y2="125"
          stroke="#475569"
          strokeWidth="0.8"
          strokeDasharray="2 2"
        />
        <text x="265" y="127" fill="#94A3B8" fontSize="8" fontFamily="monospace" fontWeight="bold">
          SEC 0.3 — READING
        </text>

        <line
          x1="80"
          y1="245"
          x2="45"
          y2="260"
          stroke="#475569"
          strokeWidth="0.8"
          strokeDasharray="2 2"
        />
        <text x="15" y="272" fill="#64748B" fontSize="8" fontFamily="monospace">
          SEC 0.1 — LISTENING
        </text>
      </svg>

      {/* Footer Specification Badge */}
      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-[10px] font-mono text-muted-foreground border-t border-border/30 pt-2">
        <span>METRIC: 310–677</span>
        <span className="text-primary font-bold">115M / 140Q</span>
      </div>
    </div>
  );
}
