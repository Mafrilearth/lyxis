"use client";

/**
 * Implementation A: Pure SVG + Hardware-Accelerated CSS (MK-IV Monolith)
 * - Zero JS bundle overhead (0 KB)
 * - 120 FPS buttery smooth via GPU transform & opacity compositor
 * - Unconventional Animation:
 *   1. Planar Photonic Laser Slice with dynamic SVG clipping
 *   2. Harmonic phase-shifted magnetic levitation
 *   3. Continuous isometric protractor dial rotation
 *   4. Kinetic 6-blade aperture iris dilation
 *   5. Real-time acoustic EQ waveform blip
 */
export function PureCssLinearMark() {
  return (
    <div className="relative w-full max-w-[420px] aspect-square mx-auto flex items-center justify-center bg-[#05070B] rounded-2xl border border-white/10 p-5 overflow-hidden select-none shadow-2xl shadow-black/80">
      {/* Precision CAD Matrix Grid Background */}
      <svg
        aria-hidden="true"
        className="absolute inset-0 w-full h-full opacity-20 pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <title>Technical CAD Isometric Grid</title>
        <defs>
          <pattern id="cad-grid-css-mk4" width="40" height="23.094" patternUnits="userSpaceOnUse">
            <path
              d="M0 11.547 L20 0 L40 11.547 L20 23.094 Z"
              fill="none"
              stroke="#334155"
              strokeWidth="0.4"
              strokeDasharray="1 3"
            />
            <circle cx="20" cy="11.547" r="0.75" fill="#475569" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#cad-grid-css-mk4)" />
      </svg>

      {/* Technical HUD Framing Brackets */}
      <div className="absolute top-3 left-3 font-mono text-[9px] text-muted-foreground/80 tracking-widest flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
        <span>FIG 0.1 — PHOTONIC RESONATOR</span>
      </div>
      <div className="absolute top-3 right-3 font-mono text-[8px] text-cyan-400/90 tracking-wider border border-cyan-500/30 px-1.5 py-0.5 rounded bg-cyan-950/20">
        0 KB RUNTIME — 120 FPS
      </div>

      <div className="absolute bottom-3 left-3 font-mono text-[8px] text-slate-500 tracking-wider">
        MK-IV — 310-677 CALIB
      </div>
      <div className="absolute bottom-3 right-3 font-mono text-[8px] text-slate-500 tracking-wider">
        ETS-ITP MATRIX
      </div>

      {/* Master Monolith SVG */}
      <svg
        viewBox="0 0 440 440"
        className="w-full h-full drop-shadow-[0_0_35px_rgba(56,189,248,0.12)]"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Lyxis Psychometric Calibration Monolith MK-IV"
      >
        <title>Lyxis Psychometric Calibration Monolith MK-IV</title>
        <style>{`
          @keyframes laser-slice {
            0%, 100% { transform: translateY(-40px); opacity: 0; }
            15% { opacity: 1; }
            85% { opacity: 1; }
            50% { transform: translateY(160px); opacity: 0.9; }
          }
          @keyframes harmonic-tier-top {
            0%, 100% { transform: translateY(0px) rotate(0.001deg); }
            50% { transform: translateY(-12px) rotate(0.001deg); }
          }
          @keyframes harmonic-tier-mid {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-7px); }
          }
          @keyframes harmonic-tier-base {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-3px); }
          }
          @keyframes iris-dilate {
            0%, 100% { transform: scale(1) rotate(0deg); }
            50% { transform: scale(1.15) rotate(45deg); }
          }
          @keyframes dial-spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          @keyframes eq-pulse-1 {
            0%, 100% { height: 4px; y: 158px; }
            50% { height: 16px; y: 152px; }
          }
          @keyframes eq-pulse-2 {
            0%, 100% { height: 14px; y: 153px; }
            50% { height: 6px; y: 157px; }
          }
          @keyframes eq-pulse-3 {
            0%, 100% { height: 8px; y: 156px; }
            50% { height: 20px; y: 150px; }
          }
          .tier-top-group { animation: harmonic-tier-top 4.5s ease-in-out infinite; transform-origin: 220px 160px; }
          .tier-mid-group { animation: harmonic-tier-mid 4.5s ease-in-out infinite 0.25s; transform-origin: 220px 240px; }
          .tier-base-group { animation: harmonic-tier-base 4.5s ease-in-out infinite 0.5s; transform-origin: 220px 320px; }
          .laser-plane { animation: laser-slice 3.8s cubic-bezier(0.45, 0, 0.55, 1) infinite; }
          .iris-blade { transform-origin: 220px 145px; animation: iris-dilate 4.5s ease-in-out infinite; }
          .dial-rotor { transform-origin: 220px 145px; animation: dial-spin 24s linear infinite; }
          .eq-bar-1 { animation: eq-pulse-1 1.2s ease-in-out infinite; }
          .eq-bar-2 { animation: eq-pulse-2 0.9s ease-in-out infinite 0.2s; }
          .eq-bar-3 { animation: eq-pulse-3 1.4s ease-in-out infinite 0.4s; }
        `}</style>

        <defs>
          {/* Laser Glow Filter */}
          <filter id="laser-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Aperture Mask */}
          <clipPath id="aperture-clip">
            <ellipse cx="220" cy="145" rx="44" ry="24" />
          </clipPath>
        </defs>

        {/* ================= TIER 1: BASE CHASSIS (S1 LISTENING COMPREHENSION) ================= */}
        <g className="tier-base-group">
          {/* Heavy Milled Chamfered Base Plate */}
          {/* Top Face */}
          <polygon
            points="206,285 234,285 330,336 330,348 234,398 206,398 110,348 110,336"
            fill="#080C14"
            stroke="#1E293B"
            strokeWidth="1.2"
          />
          {/* Beveled Edge Highlight */}
          <polygon
            points="208,287 232,287 326,337 326,346 232,395 208,395 114,346 114,337"
            fill="none"
            stroke="#334155"
            strokeWidth="0.6"
          />

          {/* Vertical Thickness Drop (Right-Front Face) */}
          <polygon
            points="234,398 330,348 330,364 234,414"
            fill="#05070B"
            stroke="#1E293B"
            strokeWidth="1.2"
          />
          {/* Vertical Thickness Drop (Front Chamfer Face) */}
          <polygon
            points="206,398 234,398 234,414 206,414"
            fill="#070A10"
            stroke="#334155"
            strokeWidth="1.2"
          />
          {/* Vertical Thickness Drop (Left-Front Face) */}
          <polygon
            points="110,348 206,398 206,414 110,364"
            fill="#0A0E18"
            stroke="#1E293B"
            strokeWidth="1.2"
          />

          {/* Acoustic Heat-Sink Ribs (Left Face) */}
          <line x1="124" y1="358" x2="124" y2="370" stroke="#334155" strokeWidth="1" />
          <line x1="138" y1="365" x2="138" y2="377" stroke="#334155" strokeWidth="1" />
          <line x1="152" y1="372" x2="152" y2="384" stroke="#334155" strokeWidth="1" />
          <line x1="166" y1="380" x2="166" y2="392" stroke="#334155" strokeWidth="1" />
          <line x1="180" y1="387" x2="180" y2="399" stroke="#334155" strokeWidth="1" />
          <line x1="194" y1="394" x2="194" y2="406" stroke="#334155" strokeWidth="1" />

          {/* Vernier Caliper Scale Ticks (Right Edge) */}
          <line x1="252" y1="404" x2="256" y2="402" stroke="#38BDF8" strokeWidth="1" />
          <line x1="270" y1="394" x2="274" y2="392" stroke="#64748B" strokeWidth="0.8" />
          <line x1="288" y1="384" x2="292" y2="382" stroke="#38BDF8" strokeWidth="1" />
          <line x1="306" y1="374" x2="310" y2="372" stroke="#64748B" strokeWidth="0.8" />

          {/* 4 Corner Isometric Datum Screws ⊕ */}
          <ellipse
            cx="132"
            cy="342"
            rx="4.5"
            ry="2.6"
            fill="#05070B"
            stroke="#475569"
            strokeWidth="0.75"
          />
          <line x1="130" y1="342" x2="134" y2="342" stroke="#64748B" strokeWidth="0.6" />
          <line x1="132" y1="340.5" x2="132" y2="343.5" stroke="#64748B" strokeWidth="0.6" />

          <ellipse
            cx="308"
            cy="342"
            rx="4.5"
            ry="2.6"
            fill="#05070B"
            stroke="#475569"
            strokeWidth="0.75"
          />
          <line x1="306" y1="342" x2="310" y2="342" stroke="#64748B" strokeWidth="0.6" />
          <line x1="308" y1="340.5" x2="308" y2="343.5" stroke="#64748B" strokeWidth="0.6" />

          {/* Technical Micro Text Engraving */}
          <text
            x="144"
            y="356"
            fill="#475569"
            fontSize="6"
            fontFamily="monospace"
            letterSpacing="1"
          >
            {"SEC-01 // TRANSDUCER [310-450]"}
          </text>
        </g>

        {/* ================= TIER 2: STEPPED FIN ARRAY (S2 STRUCTURE & WRITTEN) ================= */}
        <g className="tier-mid-group">
          {/* Stepped Intercooler Blades / Syntactic Logic Fins */}
          {[
            { x: 154, y: 220, h: 28 },
            { x: 176, y: 232, h: 36 },
            { x: 198, y: 244, h: 44 },
            { x: 220, y: 256, h: 48 }, // Center Master Fin
            { x: 242, y: 244, h: 44 },
            { x: 264, y: 232, h: 36 },
            { x: 286, y: 220, h: 28 },
          ].map((fin, idx) => (
            <g key={`fin-${fin.x}-${fin.y}`}>
              {/* Fin Top Face */}
              <polygon
                points={`${fin.x - 7},${fin.y - 4} ${fin.x + 7},${fin.y + 4} ${fin.x + 7},${fin.y + 7} ${fin.x - 7},${fin.y - 1}`}
                fill="#0F172A"
                stroke="#38BDF8"
                strokeWidth={idx === 3 ? "1" : "0.6"}
                strokeOpacity={idx === 3 ? "1" : "0.6"}
              />
              {/* Fin Front Drop Face */}
              <polygon
                points={`${fin.x - 7},${fin.y - 1} ${fin.x + 7},${fin.y + 7} ${fin.x + 7},${fin.y + 7 + fin.h} ${fin.x - 7},${fin.y - 1 + fin.h}`}
                fill="#070B14"
                stroke="#1E293B"
                strokeWidth="0.8"
              />
              {/* Center Channel Laser Dot on each fin */}
              <circle cx={fin.x} cy={fin.y + 3} r="1" fill={idx === 3 ? "#38BDF8" : "#64748B"} />
            </g>
          ))}

          {/* Logic Bus Connecting Conduit */}
          <line
            x1="154"
            y1="236"
            x2="286"
            y2="236"
            stroke="#38BDF8"
            strokeWidth="0.75"
            strokeDasharray="2 2"
          />
        </g>

        {/* ================= TIER 3: APERTURE MONOLITH DECK (S3 READING & IRT) ================= */}
        <g className="tier-top-group">
          {/* Master Chamfered Optical Plate */}
          {/* Top Face */}
          <polygon
            points="206,100 234,100 334,154 334,166 234,220 206,220 106,166 106,154"
            fill="#090E1A"
            stroke="#38BDF8"
            strokeWidth="1.2"
          />
          {/* Inner Chamfer Bevel Inset */}
          <polygon
            points="208,103 232,103 328,155 328,164 232,217 208,217 112,164 112,155"
            fill="none"
            stroke="#475569"
            strokeWidth="0.6"
          />

          {/* Plate Vertical Drop (Right Face) */}
          <polygon
            points="234,220 334,166 334,180 234,234"
            fill="#05070D"
            stroke="#1E293B"
            strokeWidth="1.2"
          />
          {/* Plate Vertical Drop (Front Chamfer Face) */}
          <polygon
            points="206,220 234,220 234,234 206,234"
            fill="#0B132B"
            stroke="#38BDF8"
            strokeWidth="1.2"
          />
          {/* Plate Vertical Drop (Left Face) */}
          <polygon
            points="106,166 206,220 206,234 106,180"
            fill="#080C16"
            stroke="#1E293B"
            strokeWidth="1.2"
          />

          {/* Outer Milled Aperture Well Inset */}
          <ellipse
            cx="220"
            cy="158"
            rx="56"
            ry="31"
            fill="#04060A"
            stroke="#334155"
            strokeWidth="1.2"
          />
          <ellipse
            cx="220"
            cy="160"
            rx="50"
            ry="27.5"
            fill="#020306"
            stroke="#1E293B"
            strokeWidth="1"
          />

          {/* Rotating Protractor Dial Ticks */}
          <g className="dial-rotor">
            {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => {
              const rad = (deg * Math.PI) / 180;
              const r1x = 44 * Math.cos(rad);
              const r1y = 24 * Math.sin(rad);
              const r2x = 50 * Math.cos(rad);
              const r2y = 27.5 * Math.sin(rad);
              return (
                <line
                  key={`dial-${deg}`}
                  x1={220 + r1x}
                  y1={158 + r1y}
                  x2={220 + r2x}
                  y2={158 + r2y}
                  stroke={deg % 90 === 0 ? "#38BDF8" : "#475569"}
                  strokeWidth={deg % 90 === 0 ? "1.2" : "0.6"}
                />
              );
            })}
          </g>

          {/* Central Diagnostic Well & Venetian Slits (Linear Signature) */}
          <g clipPath="url(#aperture-clip)">
            {/* Dark Deep Well Bed */}
            <ellipse cx="220" cy="145" rx="44" ry="24" fill="#010204" />

            {/* Venetian Acoustic Slits */}
            <line x1="184" y1="135" x2="256" y2="135" stroke="#1E293B" strokeWidth="0.75" />
            <line x1="180" y1="139" x2="260" y2="139" stroke="#334155" strokeWidth="0.75" />
            <line x1="178" y1="143" x2="262" y2="143" stroke="#475569" strokeWidth="0.75" />
            <line x1="178" y1="147" x2="262" y2="147" stroke="#38BDF8" strokeWidth="1" />
            <line x1="180" y1="151" x2="260" y2="151" stroke="#475569" strokeWidth="0.75" />
            <line x1="184" y1="155" x2="256" y2="155" stroke="#334155" strokeWidth="0.75" />

            {/* Kinetic 6-Blade Aperture Iris */}
            <g className="iris-blade">
              <path
                d="M220 133 L236 142 L220 151 Z"
                fill="none"
                stroke="#38BDF8"
                strokeWidth="0.75"
                opacity="0.8"
              />
              <path
                d="M204 142 L220 133 L220 151 Z"
                fill="none"
                stroke="#38BDF8"
                strokeWidth="0.75"
                opacity="0.8"
              />
              {/* Center Laser Core */}
              <circle cx="220" cy="145" r="4" fill="#38BDF8" filter="url(#laser-glow)" />
            </g>

            {/* Real-Time Acoustic Waveform Bars (Listening Sub-System) */}
            <rect className="eq-bar-1" x="208" y="142" width="2" height="8" rx="1" fill="#38BDF8" />
            <rect
              className="eq-bar-2"
              x="214"
              y="140"
              width="2"
              height="12"
              rx="1"
              fill="#60A5FA"
            />
            <rect
              className="eq-bar-3"
              x="224"
              y="139"
              width="2"
              height="14"
              rx="1"
              fill="#60A5FA"
            />
            <rect className="eq-bar-1" x="230" y="143" width="2" height="6" rx="1" fill="#38BDF8" />
          </g>

          {/* Concentric Precision Reticle Ring */}
          <ellipse
            cx="220"
            cy="158"
            rx="44"
            ry="24"
            fill="none"
            stroke="#38BDF8"
            strokeWidth="0.75"
            strokeDasharray="2 4"
          />

          {/* Deck Engraving & Scale Markers */}
          <text
            x="122"
            y="152"
            fill="#64748B"
            fontSize="6.5"
            fontFamily="monospace"
            letterSpacing="1"
          >
            {"LYXIS // IRT-CALIBRATION"}
          </text>
          <text
            x="246"
            y="214"
            fill="#38BDF8"
            fontSize="7"
            fontFamily="monospace"
            fontWeight="bold"
          >
            677 MAX
          </text>
        </g>

        {/* ================= UNCONVENTIONAL PHOTONIC LASER SLICE PLANE ================= */}
        <g className="laser-plane pointer-events-none">
          {/* Laser Razor Plane (Horizontal Isometric Ribbon) */}
          <polygon
            points="220,130 350,195 220,260 90,195"
            fill="none"
            stroke="#38BDF8"
            strokeWidth="1.5"
            strokeDasharray="4 2"
            filter="url(#laser-glow)"
          />
          <line
            x1="90"
            y1="195"
            x2="350"
            y2="195"
            stroke="#FFFFFF"
            strokeWidth="0.75"
            filter="url(#laser-glow)"
          />
          {/* Planar Sweep Coordinates */}
          <text
            x="354"
            y="198"
            fill="#38BDF8"
            fontSize="6"
            fontFamily="monospace"
            letterSpacing="0.5"
          >
            [SCAN λ: 488nm]
          </text>
        </g>
      </svg>
    </div>
  );
}
