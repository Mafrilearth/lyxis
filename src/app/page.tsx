import { CoreFlowGrid } from "@/components/landing/core-flow-grid";
import { FloatingNav } from "@/components/landing/floating-nav";
import { buttonVariants } from "@/components/ui/button";
import { GridCrosshair } from "@/components/ui/grid-crosshair";
import { FOOTER_LINKS } from "@/lib/constants/navigation";
import { cn } from "@/lib/utils";
import { ArrowUpRight, ShieldCheck, Sparkles } from "lucide-react";
import Link from "next/link";

const CORE_METRICS = [
  {
    value: "115 Mins",
    label: "Total Durasi Ujian",
    subtext: "Terbagi dalam 3 seksi ketat",
  },
  {
    value: "140 Soal",
    label: "Butir Evaluasi",
    subtext: "Listening, Structure, Reading",
  },
  {
    value: "310 – 677",
    label: "Skala Skor ETS",
    subtext: "Kalibrasi konversi standar resmi",
  },
  {
    value: "CEFR A2–C1",
    label: "Validasi Global",
    subtext: "Pemetaan kecakapan internasional",
  },
] as const;

export default function HomePage() {
  return (
    <div className="relative min-h-screen bg-background text-foreground flex flex-col selection:bg-primary/20 selection:text-primary">
      {/* Docked Full-Width Top Header */}
      <FloatingNav />

      {/* Main Container Wrapped in Continuous Vertical CAD Grid Rails */}
      <main className="flex-1 max-w-6xl w-full mx-auto border-x border-border/40 bg-background flex flex-col">
        {/* ================= 1. HERO CELL (WRAPPED IN BORDER-B) ================= */}
        <section className="p-8 sm:p-14 lg:p-20 text-center space-y-8 border-b border-border/40 relative">
          {/* Precise Grid Intersection Crosshairs */}
          <GridCrosshair position="bottom-left" />
          <GridCrosshair position="bottom-right" />

          <div className="space-y-5 max-w-4xl mx-auto">
            {/* System Tag */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/40 bg-primary/10 text-primary text-xs font-mono font-semibold tracking-wider uppercase">
              <Sparkles className="h-3.5 w-3.5" />
              <span>TOEFL ITP® INDEPENDENT DIAGNOSTIC ENGINE</span>
            </div>

            {/* Authoritative Solid Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground leading-[1.1] text-balance">
              Standar Diagnostik TOEFL ITP®.{" "}
              <span className="text-primary block sm:inline">Langsung Inti, Bebas Birokrasi.</span>
            </h1>

            {/* Core Value Statement */}
            <p className="text-sm sm:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto font-normal text-balance">
              Software evaluasi mandiri terkalibrasi ke standar skor ETS 310–677. Cukup 3 tahap:
              Daftar akun, selesaikan 140 soal (115 menit), dan terima hasil prediksi instan.
            </p>

            {/* Primary Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3.5 pt-4 w-full max-w-md sm:max-w-none mx-auto font-mono text-sm">
              <Link
                href="/dashboard"
                className={cn(
                  buttonVariants({ variant: "default", size: "default" }),
                  "group w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-lg h-11 px-7 font-bold bg-primary text-primary-foreground hover:bg-primary/90 transition-all",
                )}
              >
                <span>Mulai Tes Sekarang</span>
                <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>

              <Link
                href="/login"
                className={cn(
                  buttonVariants({ variant: "outline", size: "default" }),
                  "w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-lg h-11 px-7 font-semibold border-border/80 bg-background hover:bg-muted transition-all",
                )}
              >
                <span>Masuk Akun</span>
              </Link>
            </div>
          </div>
        </section>

        {/* ================= 2. 3-STAGE CORE FLOW GRID (WRAPPED IN BORDER-B) ================= */}
        <section id="alur-tes" className="border-b border-border/40 bg-background relative">
          <GridCrosshair position="bottom-left" />
          <GridCrosshair position="bottom-right" />

          <div className="px-6 py-4 border-b border-border/40 font-mono text-xs text-muted-foreground flex items-center justify-between">
            <span className="text-foreground font-bold">ALUR UTAMA — 3 TAHAP EVALUASI</span>
            <span>INDEPENDENT CBT ENGINE</span>
          </div>

          {/* 3-Column Wireframe Grid */}
          <CoreFlowGrid />
        </section>

        {/* ================= 3. METRICS CELL (WRAPPED IN BORDER-B) ================= */}
        <section id="metrik" className="border-b border-border/40 bg-muted/5 relative">
          <GridCrosshair position="bottom-left" />
          <GridCrosshair position="bottom-right" />

          <div className="grid grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 divide-x divide-border/40">
            {CORE_METRICS.map((metric) => (
              <div
                key={metric.label}
                className="p-6 sm:p-8 space-y-2 hover:bg-muted/10 transition-colors"
              >
                <div className="font-mono text-2xl sm:text-3xl font-bold tracking-tight text-primary">
                  {metric.value}
                </div>
                <div className="text-xs font-semibold text-foreground tracking-tight">
                  {metric.label}
                </div>
                <p className="text-[11px] text-muted-foreground leading-snug">{metric.subtext}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ================= 4. LAUNCHPAD CONSOLE CELL (WRAPPED IN BORDER-B) ================= */}
        <section className="p-8 sm:p-14 lg:p-16 text-center space-y-6 border-b border-border/40 bg-card/20 relative">
          <GridCrosshair position="bottom-left" />
          <GridCrosshair position="bottom-right" />
          <div className="max-w-2xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-1.5 font-mono text-xs font-bold uppercase tracking-widest text-primary">
              <ShieldCheck className="h-4 w-4" />
              <span>Sesi Mandiri Siap Digunakan</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
              Mulai Sesi Ujian TOEFL ITP Anda
            </h2>

            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed max-w-xl mx-auto">
              Simulasi penuh 140 soal: Listening (35m), Structure (25m), dan Reading (55m).
              Auto-save real-time dengan kalkulasi skor diagnostik instan begitu tes diselesaikan.
            </p>

            <div className="pt-2 flex justify-center">
              <Link
                href="/dashboard"
                className={cn(
                  buttonVariants({ variant: "default", size: "default" }),
                  "group inline-flex items-center gap-2 rounded-lg h-11 px-8 font-mono text-sm font-bold bg-primary text-primary-foreground hover:bg-primary/90 transition-all shadow-md shadow-primary/20",
                )}
              >
                <span>Masuk Ruang Ujian</span>
                <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* ================= FOOTER (WRAPPED IN GRID FRAME) ================= */}
      <footer className="w-full border-t border-border/40 bg-background/90">
        <div className="max-w-6xl mx-auto border-x border-border/40 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 font-mono text-xs">
          <Link href="/" className="flex items-center gap-2 group">
            <span className="font-extrabold text-base tracking-tight text-foreground transition-opacity group-hover:opacity-80">
              Lyxis
            </span>
            <span className="text-[10px] text-muted-foreground">ENGINE</span>
          </Link>

          <nav className="flex flex-wrap items-center gap-6 text-muted-foreground">
            {FOOTER_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="hover:text-foreground transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <Link href="/lab/illustrations" className="hover:text-cyan-400 transition-colors">
              Special Effects Lab
            </Link>
          </nav>

          <div className="text-muted-foreground">© 2026 Lyxis. Independent Standard.</div>
        </div>
      </footer>
    </div>
  );
}
