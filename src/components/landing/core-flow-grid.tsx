"use client";

/**
 * 3-Stage Core Flow Bento Grid Component
 * Wrapped in continuous CAD grid lines
 * Represents the fundamental user journey: Daftar -> Ngerjain -> Hasil
 */
export function CoreFlowGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-border">
      {/* ================= CELL 1: LANGKAH 1 DAFTAR / MASUK ================= */}
      <div className="p-6 sm:p-8 flex flex-col justify-between space-y-6 relative group hover:bg-muted/10 transition-colors">
        {/* Cell Header */}
        <div className="flex items-center justify-between font-mono text-[10px] text-muted-foreground select-none">
          <span className="text-foreground font-semibold">LANGKAH 01</span>
          <span>PERSIAPAN</span>
        </div>

        {/* Isometric Wireframe SVG Illustration */}
        <div className="w-full aspect-[4/3] flex items-center justify-center p-2">
          <svg
            viewBox="0 0 240 180"
            className="w-full h-full"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-label="Langkah 1 Pendaftaran Akun"
          >
            <title>Langkah 1 Pendaftaran Akun</title>
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

            {/* Glowing Laser Keyline */}
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

            <text x="84" y="145" fill="#71717A" fontSize="7" fontFamily="monospace">
              {"SESI UJIAN AKTIF"}
            </text>
          </svg>
        </div>

        {/* Cell Text Description */}
        <div className="space-y-2">
          <div className="text-xs text-primary font-bold uppercase tracking-wider">
            01. Daftar & Masuk
          </div>
          <h3 className="text-base sm:text-lg font-bold text-foreground tracking-tight">
            Buat Akun Mandiri
          </h3>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Cukup masukkan nama dan email Anda. Akun langsung aktif seketika untuk membuka lembar
            ujian simulasi TOEFL ITP®.
          </p>
        </div>
      </div>

      {/* ================= CELL 2: LANGKAH 2 KERJAKAN TES ================= */}
      <div className="p-6 sm:p-8 flex flex-col justify-between space-y-6 relative group hover:bg-muted/10 transition-colors">
        {/* Cell Header */}
        <div className="flex items-center justify-between font-mono text-[10px] text-muted-foreground select-none">
          <span className="text-foreground font-semibold">LANGKAH 02</span>
          <span>PENGERJAAN</span>
        </div>

        {/* Isometric Wireframe SVG Illustration */}
        <div className="w-full aspect-[4/3] flex items-center justify-center p-2">
          <svg
            viewBox="0 0 240 180"
            className="w-full h-full"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-label="Langkah 2 Pengerjaan 140 Soal"
          >
            <title>Langkah 2 Pengerjaan 140 Soal</title>
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

            {/* Tier 3 (Reading) */}
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

            <text x="82" y="156" fill="#71717A" fontSize="7" fontFamily="monospace">
              {"140 SOAL // 115 MENIT"}
            </text>
          </svg>
        </div>

        {/* Cell Text Description */}
        <div className="space-y-2">
          <div className="text-xs text-primary font-bold uppercase tracking-wider">
            02. Kerjakan Ujian
          </div>
          <h3 className="text-base sm:text-lg font-bold text-foreground tracking-tight">
            140 Soal Standar Resmi
          </h3>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Selesaikan 3 seksi ujian berurutan: Listening (35 mnt), Structure (25 mnt), dan Reading
            (55 mnt). Dilengkapi pemutar audio terintegrasi dan timer otomatis.
          </p>
        </div>
      </div>

      {/* ================= CELL 3: LANGKAH 3 LIHAT HASIL ================= */}
      <div className="p-6 sm:p-8 flex flex-col justify-between space-y-6 relative group hover:bg-muted/10 transition-colors">
        {/* Cell Header */}
        <div className="flex items-center justify-between font-mono text-[10px] text-muted-foreground select-none">
          <span className="text-foreground font-semibold">LANGKAH 03</span>
          <span>EVALUASI</span>
        </div>

        {/* Isometric Wireframe SVG Illustration */}
        <div className="w-full aspect-[4/3] flex items-center justify-center p-2">
          <svg
            viewBox="0 0 240 180"
            className="w-full h-full"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-label="Langkah 3 Skor dan Hasil Diagnostik"
          >
            <title>Langkah 3 Skor dan Hasil Diagnostik</title>
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
            <text x="82" y="150" fill="#71717A" fontSize="7" fontFamily="monospace">
              {"SKOR RESMI ETS ITP"}
            </text>
          </svg>
        </div>

        {/* Cell Text Description */}
        <div className="space-y-2">
          <div className="text-xs text-primary font-bold uppercase tracking-wider">
            03. Dapatkan Hasil
          </div>
          <h3 className="text-base sm:text-lg font-bold text-foreground tracking-tight">
            Prediksi Skor & Evaluasi
          </h3>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Hasil estimasi skor skala 310–677 dan level CEFR langsung tampil begitu tes
            diselesaikan, lengkap dengan rincian kelemahan per seksi soal.
          </p>
        </div>
      </div>
    </div>
  );
}
