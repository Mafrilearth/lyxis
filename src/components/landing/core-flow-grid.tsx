"use client";

/**
 * 3-Stage Core Flow Bento Grid Component
 * Wrapped in continuous CAD grid lines with corner crosshair datum marks
 * Represents the fundamental software flow: Daftar -> Ngerjain -> Hasil
 */
export function CoreFlowGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-border/40">
      {/* ================= CELL 1: FIG 0.1 DAFTAR / MASUK ================= */}
      <div className="p-6 sm:p-8 flex flex-col justify-between space-y-6 relative group hover:bg-muted/10 transition-colors">
        {/* Cell Header */}
        <div className="flex items-center justify-between font-mono text-[10px] text-muted-foreground select-none">
          <span className="text-foreground font-semibold">FIG 0.1</span>
          <span>STAGE — 01</span>
        </div>

        {/* Isometric Wireframe SVG Illustration */}
        <div className="w-full aspect-[4/3] flex items-center justify-center p-2">
          <svg
            viewBox="0 0 240 180"
            className="w-full h-full drop-shadow-[0_0_20px_rgba(59,130,246,0.1)]"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-label="Stage 1 Identity Token Isometric Schematic"
          >
            <title>Stage 1 Identity Token Schematic</title>
            {/* Base Plinth */}
            <polygon
              points="120,40 185,77 120,115 55,77"
              fill="#080C14"
              stroke="#27272A"
              strokeWidth="1"
            />
            {/* Front Drops */}
            <polygon
              points="120,115 185,77 185,95 120,133"
              fill="#05070B"
              stroke="#18181B"
              strokeWidth="1"
            />
            <polygon
              points="55,77 120,115 120,133 55,95"
              fill="#0A0E18"
              stroke="#27272A"
              strokeWidth="1"
            />

            {/* Inner Recessed Token Slot */}
            <polygon
              points="120,58 165,84 120,110 75,84"
              fill="#05070B"
              stroke="#3F3F46"
              strokeWidth="0.8"
            />

            {/* Glowing Laser Keyline (Access Granted) */}
            <line
              x1="90"
              y1="84"
              x2="150"
              y2="84"
              stroke="#38BDF8"
              strokeWidth="1.2"
              className="animate-pulse"
            />
            <circle cx="120" cy="84" r="2.5" fill="#38BDF8" />

            {/* Datum Marks */}
            <ellipse cx="65" cy="77" rx="2" ry="1" fill="#71717A" />
            <ellipse cx="175" cy="77" rx="2" ry="1" fill="#71717A" />

            <text x="82" y="145" fill="#71717A" fontSize="6.5" fontFamily="monospace">
              {"TOKEN // ACCESS AUTH"}
            </text>
          </svg>
        </div>

        {/* Cell Text Description */}
        <div className="space-y-2">
          <div className="font-mono text-xs text-primary font-bold tracking-wider uppercase">
            01. Daftar / Masuk
          </div>
          <h3 className="text-lg font-bold text-foreground tracking-tight">Akses Sesi Instan</h3>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Daftar atau masuk akun dalam hitungan detik tanpa birokrasi kampus. Token sesi ujian
            aktif seketika untuk persiapan pengerjaan.
          </p>
        </div>
      </div>

      {/* ================= CELL 2: FIG 0.2 KERJAKAN TES ================= */}
      <div className="p-6 sm:p-8 flex flex-col justify-between space-y-6 relative group hover:bg-muted/10 transition-colors">
        {/* Cell Header */}
        <div className="flex items-center justify-between font-mono text-[10px] text-muted-foreground select-none">
          <span className="text-foreground font-semibold">FIG 0.2</span>
          <span>STAGE — 02</span>
        </div>

        {/* Isometric Wireframe SVG Illustration */}
        <div className="w-full aspect-[4/3] flex items-center justify-center p-2">
          <svg
            viewBox="0 0 240 180"
            className="w-full h-full drop-shadow-[0_0_20px_rgba(59,130,246,0.1)]"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-label="Stage 2 3-Tier Exam Monolith Schematic"
          >
            <title>Stage 2 3-Tier Exam Monolith Schematic</title>
            {/* Tier 1 (Listening) */}
            <polygon
              points="120,70 175,102 120,134 65,102"
              fill="#080C14"
              stroke="#27272A"
              strokeWidth="1"
            />
            <polygon
              points="120,134 175,102 175,114 120,146"
              fill="#05070B"
              stroke="#18181B"
              strokeWidth="1"
            />
            <polygon
              points="65,102 120,134 120,146 65,114"
              fill="#0A0E18"
              stroke="#27272A"
              strokeWidth="1"
            />

            {/* Tier 2 (Structure) */}
            <polygon
              points="120,48 175,80 120,112 65,80"
              fill="#0A0E18"
              stroke="#27272A"
              strokeWidth="1"
            />
            <polygon
              points="120,112 175,80 175,92 120,124"
              fill="#06080D"
              stroke="#18181B"
              strokeWidth="1"
            />
            <polygon
              points="65,80 120,112 120,124 65,92"
              fill="#070A12"
              stroke="#27272A"
              strokeWidth="1"
            />

            {/* Tier 3 (Reading & Live Timer) */}
            <polygon
              points="120,26 175,58 120,90 65,58"
              fill="#0C101D"
              stroke="#38BDF8"
              strokeWidth="1.2"
            />
            <polygon
              points="120,90 175,58 175,70 120,102"
              fill="#07090F"
              stroke="#18181B"
              strokeWidth="1"
            />
            <polygon
              points="65,58 120,90 120,102 65,70"
              fill="#090D17"
              stroke="#27272A"
              strokeWidth="1"
            />

            {/* Stepped Progress Hairlines */}
            <line x1="85" y1="58" x2="155" y2="58" stroke="#38BDF8" strokeWidth="0.8" />
            <line x1="95" y1="64" x2="145" y2="64" stroke="#475569" strokeWidth="0.8" />
            <circle cx="120" cy="58" r="2" fill="#38BDF8" />

            <text x="82" y="156" fill="#71717A" fontSize="6.5" fontFamily="monospace">
              {"140 ITEMS // 115 MINS"}
            </text>
          </svg>
        </div>

        {/* Cell Text Description */}
        <div className="space-y-2">
          <div className="font-mono text-xs text-primary font-bold tracking-wider uppercase">
            02. Kerjakan Tes
          </div>
          <h3 className="text-lg font-bold text-foreground tracking-tight">
            140 Soal Standar Resmi
          </h3>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Selesaikan 3 seksi ujian (Listening 50, Structure 40, Reading 50) dengan timer resmi 115
            menit. Tampilan distraction-free dan penyimpanan jawaban otomatis.
          </p>
        </div>
      </div>

      {/* ================= CELL 3: FIG 0.3 LIHAT HASIL ================= */}
      <div className="p-6 sm:p-8 flex flex-col justify-between space-y-6 relative group hover:bg-muted/10 transition-colors">
        {/* Cell Header */}
        <div className="flex items-center justify-between font-mono text-[10px] text-muted-foreground select-none">
          <span className="text-foreground font-semibold">FIG 0.3</span>
          <span>STAGE — 03</span>
        </div>

        {/* Isometric Wireframe SVG Illustration */}
        <div className="w-full aspect-[4/3] flex items-center justify-center p-2">
          <svg
            viewBox="0 0 240 180"
            className="w-full h-full drop-shadow-[0_0_20px_rgba(59,130,246,0.1)]"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-label="Stage 3 Diagnostic Calibration Gauge Schematic"
          >
            <title>Stage 3 Diagnostic Calibration Gauge Schematic</title>
            {/* Dial Base */}
            <polygon
              points="120,40 185,77 120,115 55,77"
              fill="#080C14"
              stroke="#27272A"
              strokeWidth="1"
            />
            <polygon
              points="120,115 185,77 185,95 120,133"
              fill="#05070B"
              stroke="#18181B"
              strokeWidth="1"
            />
            <polygon
              points="55,77 120,115 120,133 55,95"
              fill="#0A0E18"
              stroke="#27272A"
              strokeWidth="1"
            />

            {/* Circular Calibration Inset */}
            <ellipse
              cx="120"
              cy="77"
              rx="36"
              ry="20"
              fill="#04060A"
              stroke="#38BDF8"
              strokeWidth="1.2"
            />
            <ellipse
              cx="120"
              cy="77"
              rx="24"
              ry="13"
              fill="#020306"
              stroke="#27272A"
              strokeWidth="0.8"
            />

            {/* Radial Dial Ticks */}
            <line x1="120" y1="57" x2="120" y2="61" stroke="#38BDF8" strokeWidth="1" />
            <line x1="156" y1="77" x2="151" y2="77" stroke="#38BDF8" strokeWidth="1" />
            <line x1="84" y1="77" x2="89" y2="77" stroke="#38BDF8" strokeWidth="1" />

            {/* Center Score Core */}
            <circle cx="120" cy="77" r="3" fill="#38BDF8" className="animate-pulse" />

            <text
              x="96"
              y="104"
              fill="#38BDF8"
              fontSize="7"
              fontFamily="monospace"
              fontWeight="bold"
            >
              310 – 677
            </text>
            <text x="84" y="150" fill="#71717A" fontSize="6.5" fontFamily="monospace">
              CEFR A2-C1 VERIFIED
            </text>
          </svg>
        </div>

        {/* Cell Text Description */}
        <div className="space-y-2">
          <div className="font-mono text-xs text-primary font-bold tracking-wider uppercase">
            03. Lihat Hasil
          </div>
          <h3 className="text-lg font-bold text-foreground tracking-tight">
            Skor 310–677 & Diagnostik
          </h3>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Skor konversi resmi ETS dan sertifikat level CEFR keluar instan setelah submit. Lengkap
            dengan analisis kelemahan spesifik per seksi soal.
          </p>
        </div>
      </div>
    </div>
  );
}
