import { FloatingNav } from "@/components/landing/floating-nav";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

/**
 * Standard Global 8pt Grid Architecture
 * Homepage strictly contains: Header, Hero, and Footer.
 * All components wrapped in visible, solid, high-contrast CAD grid rails (border-zinc-300 dark:border-zinc-800).
 * Zero fading, zero shadows, content centered along direction axes.
 */
export default function HomePage() {
  return (
    <div className="relative min-h-screen bg-background text-foreground flex flex-col selection:bg-primary/20 selection:text-primary">
      {/* 1. HEADER GRID (Tepat 16 Unit = 64px = 8x8px) */}
      <FloatingNav />

      {/* 2. HERO GRID CONTAINER (Membungkus Konten dalam Garis Grid Solid & Terlihat) */}
      <main className="flex-1 max-w-6xl w-full mx-auto border-x border-zinc-300 dark:border-zinc-800 bg-background flex flex-col">
        <section className="flex-1 flex flex-col items-center justify-center text-center py-20 sm:py-28 lg:py-32 px-6 sm:px-8 space-y-6 border-b border-zinc-300 dark:border-zinc-800 relative">
          <div className="space-y-4 max-w-3xl mx-auto flex flex-col items-center">
            {/* Lencana Identitas Asesmen: Radius Seragam 8px (1 Kotak Grid) */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-lg border border-primary/30 bg-primary/10 text-primary text-xs font-semibold select-none">
              <span>Platform Simulasi Mandiri TOEFL ITP®</span>
            </div>

            {/* Judul Utama yang Jelas, Nyata, dan Terpusat */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground leading-[1.15] text-balance">
              Tes Diagnostik & Simulasi TOEFL ITP® Online
            </h1>

            {/* Penjelasan Nyata & Manusiawi */}
            <p className="text-sm sm:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto text-balance">
              Uji kemampuan bahasa Inggris Anda dengan simulasi lengkap 140 butir soal standar
              resmi. Dapatkan estimasi skor konversi skala 310–677 dan evaluasi kelemahan Anda
              sebelum ujian sesungguhnya.
            </p>

            {/* Tombol Aksi Utama: Terpusat Sejajar, Ukuran Standar, Tanpa Shadow, Tanpa Border Hover */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-4 w-full max-w-md sm:max-w-none mx-auto text-sm">
              <Link
                href="/dashboard"
                className={cn(
                  buttonVariants({ variant: "default", size: "default" }),
                  "group w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-lg h-11 px-7 font-bold bg-primary text-primary-foreground hover:bg-primary/90 border border-transparent shadow-none transition-colors",
                )}
              >
                <span>Mulai Simulasi Tes</span>
                <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>

              <Link
                href="/login"
                className={cn(
                  buttonVariants({ variant: "outline", size: "default" }),
                  "w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-lg h-11 px-7 font-semibold border border-zinc-300 dark:border-zinc-800 bg-background hover:bg-muted text-foreground shadow-none transition-colors",
                )}
              >
                <span>Masuk Akun</span>
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* 3. FOOTER GRID (Garis Grid Solid & Jelas) */}
      <footer className="w-full border-b border-zinc-300 dark:border-zinc-800 bg-background/95">
        <div className="max-w-6xl mx-auto border-x border-zinc-300 dark:border-zinc-800 p-6 sm:p-8 space-y-4 text-xs text-muted-foreground">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <Link href="/" className="flex items-center gap-2">
              <span className="font-extrabold text-base tracking-tight text-foreground">Lyxis</span>
              <span className="text-[10px] text-muted-foreground px-2 py-0.5 rounded-lg border border-zinc-300 dark:border-zinc-800">
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

          <div className="pt-4 border-t border-zinc-300 dark:border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] leading-relaxed">
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
