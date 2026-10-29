import { CoreFlowGrid } from "@/components/landing/core-flow-grid";
import { FloatingNav } from "@/components/landing/floating-nav";
import { buttonVariants } from "@/components/ui/button";
import { GridDivider } from "@/components/ui/grid-divider";
import { cn } from "@/lib/utils";
import { ArrowUpRight, BookOpen, FileCode2, Headphones, Trophy } from "lucide-react";
import Link from "next/link";

const EXAM_SECTIONS = [
  {
    icon: Headphones,
    title: "Section 1: Listening",
    items: "50 Soal",
    duration: "35 Menit",
    description: "Percakapan pendek, dialog panjang, dan monolog akademik berbahasa Inggris.",
  },
  {
    icon: FileCode2,
    title: "Section 2: Structure",
    items: "40 Soal",
    duration: "25 Menit",
    description:
      "Kelengkapan kalimat (Structure) dan identifikasi kesalahan tata bahasa (Written Expression).",
  },
  {
    icon: BookOpen,
    title: "Section 3: Reading",
    items: "50 Soal",
    duration: "55 Menit",
    description: "Pemahaman teks bacaan topik universitas, sains, sejarah, dan kosakata akademik.",
  },
  {
    icon: Trophy,
    title: "Estimasi Skor Resmi",
    items: "140 Soal Total",
    duration: "Skala 310 – 677",
    description: "Perhitungan skor konversi standar TOEFL ITP® beserta level kesetaraan CEFR.",
  },
] as const;

export default function HomePage() {
  return (
    <div className="relative min-h-screen bg-background text-foreground flex flex-col selection:bg-primary/20 selection:text-primary">
      {/* Header Navigasi Minimal: Brand Saja, Masuk, Daftar, Toggle Theme */}
      <FloatingNav />

      {/* Kontainer Utama dengan Garis Grid Vertikal Kiri-Kanan */}
      <main className="flex-1 max-w-6xl w-full mx-auto border-x border-border bg-background flex flex-col">
        {/* ================= 1. HERO UTAMA ================= */}
        <section className="p-8 sm:p-14 lg:p-18 text-center space-y-6 relative">
          <div className="space-y-4 max-w-3xl mx-auto">
            {/* Lencana Identitas Asesmen */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-semibold">
              <span>Platform Simulasi Mandiri TOEFL ITP®</span>
            </div>

            {/* Judul Utama yang Jelas dan Nyata */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground leading-[1.15] text-balance">
              Tes Diagnostik & Simulasi TOEFL ITP® Online
            </h1>

            {/* Penjelasan Nyata & Manusiawi */}
            <p className="text-sm sm:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto text-balance">
              Uji kemampuan bahasa Inggris Anda dengan simulasi lengkap 140 butir soal standar
              resmi. Dapatkan estimasi skor konversi skala 310–677 dan evaluasi kelemahan Anda
              sebelum ujian sesungguhnya.
            </p>

            {/* Tombol Aksi Utama */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 pt-3 w-full max-w-md sm:max-w-none mx-auto text-sm">
              <Link
                href="/dashboard"
                className={cn(
                  buttonVariants({ variant: "default", size: "default" }),
                  "group w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-lg h-11 px-7 font-bold bg-primary text-primary-foreground hover:bg-primary/90 transition-all",
                )}
              >
                <span>Mulai Simulasi Tes</span>
                <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>

              <Link
                href="/login"
                className={cn(
                  buttonVariants({ variant: "outline", size: "default" }),
                  "w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-lg h-11 px-7 font-semibold border-border bg-background hover:bg-muted transition-all",
                )}
              >
                <span>Masuk Akun</span>
              </Link>
            </div>
          </div>
        </section>

        {/* Pembatas Garis Grid 3-Kolom Alur Ujian */}
        <GridDivider columns={3} />

        {/* ================= 2. ALUR UTAMA: DAFTAR -> NGERJAIN -> HASIL ================= */}
        <section id="alur-tes" className="bg-background relative">
          <div className="px-6 py-3.5 border-b border-border text-xs font-semibold text-muted-foreground flex items-center justify-between">
            <span className="text-foreground uppercase tracking-wider">Alur Pengerjaan Tes</span>
            <span>3 Langkah Mandiri</span>
          </div>

          {/* 3 Kotak Alur Pengerjaan */}
          <CoreFlowGrid />
        </section>

        {/* Pembatas Garis Grid 4-Kolom Rincian Seksi Ujian */}
        <GridDivider columns={4} />

        {/* ================= 3. STRUKTUR RESMI 3 SEKSI TOEFL ITP ================= */}
        <section id="struktur-tes" className="bg-muted/5 relative">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-border">
            {EXAM_SECTIONS.map((sec) => {
              const Icon = sec.icon;
              return (
                <div key={sec.title} className="p-6 space-y-3 hover:bg-muted/10 transition-colors">
                  <div className="flex items-center justify-between text-muted-foreground">
                    <Icon className="w-5 h-5 text-primary" />
                    <span className="text-[11px] font-mono">{sec.duration}</span>
                  </div>
                  <div>
                    <div className="text-sm font-bold text-foreground">{sec.title}</div>
                    <div className="text-xs text-primary font-semibold">{sec.items}</div>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">{sec.description}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Pembatas Garis Grid Penutup */}
        <GridDivider columns={1} />

        {/* ================= 4. KOTAK AJAKAN MEMULAI TES ================= */}
        <section className="p-8 sm:p-14 text-center space-y-5 bg-card/10 relative">
          <div className="max-w-xl mx-auto space-y-3">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
              Siap Menguji Kemampuan Anda?
            </h2>

            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Tidak ada batasan waktu kapan harus memulai. Sediakan headphone untuk seksi Listening
              dan koneksi internet yang stabil selama 115 menit.
            </p>

            <div className="pt-2 flex justify-center">
              <Link
                href="/dashboard"
                className={cn(
                  buttonVariants({ variant: "default", size: "default" }),
                  "group inline-flex items-center gap-2 rounded-lg h-11 px-8 text-sm font-bold bg-primary text-primary-foreground hover:bg-primary/90 transition-all",
                )}
              >
                <span>Buka Lembar Ujian Sekarang</span>
                <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </div>
        </section>

        {/* Pembatas Garis Grid Sebelum Footer */}
        <GridDivider columns={1} />
      </main>

      {/* ================= FOOTER RESMI & NYATA ================= */}
      <footer className="w-full border-t border-border bg-background/95">
        <div className="max-w-6xl mx-auto border-x border-border p-6 sm:p-8 space-y-4 text-xs text-muted-foreground">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <Link href="/" className="flex items-center gap-2">
              <span className="font-extrabold text-base tracking-tight text-foreground">Lyxis</span>
              <span className="text-[10px] text-muted-foreground px-1.5 py-0.5 rounded border border-border">
                Simulator Mandiri
              </span>
            </Link>

            <nav className="flex flex-wrap items-center gap-6">
              <Link href="/login" className="hover:text-foreground transition-colors">
                Masuk Akun
              </Link>
              <Link href="/register" className="hover:text-foreground transition-colors">
                Daftar Baru
              </Link>
              <Link href="/dashboard" className="hover:text-foreground transition-colors">
                Mulai Tes
              </Link>
            </nav>
          </div>

          <div className="pt-4 border-t border-border/50 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] leading-relaxed">
            <p>
              © 2026 Lyxis. TOEFL ITP® adalah merek dagang terdaftar dari Educational Testing
              Service (ETS). Platform ini dikembangkan secara independen sebagai simulator
              diagnostik persiapan ujian.
            </p>
            <p className="shrink-0 text-zinc-500">Durasi 115 Menit • 140 Soal • Skala 310–677</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
