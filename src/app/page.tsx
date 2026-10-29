import { FloatingNav } from "@/components/landing/floating-nav";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

/**
 * Standard Global 8pt Grid Architecture
 * Homepage strictly contains: Header, Hero, and Footer.
 * - Header: Full width horizontal line at bottom, no left/right borders.
 * - Hero: Centered content wrapped in vertical CAD rails with verified authentic copy.
 * - Footer: Full horizontal top line spanning edge-to-edge, strictly NO bottom border, NO side borders.
 */
export default function HomePage() {
  return (
    <div className="relative min-h-screen bg-background text-foreground flex flex-col selection:bg-primary/20 selection:text-primary">
      {/* 1. HEADER (Full horizontal border-b, no left/right lines) */}
      <FloatingNav />

      {/* 2. HERO GRID CONTAINER (Wrapped in Solid Unfaded Grid Rails) */}
      <main className="flex-1 max-w-6xl w-full mx-auto border-x border-zinc-300 dark:border-zinc-800 bg-background flex flex-col">
        <section className="flex-1 flex flex-col items-center justify-center text-center py-20 sm:py-28 lg:py-32 px-6 sm:px-8 space-y-6 relative">
          <div className="space-y-4 max-w-3xl mx-auto flex flex-col items-center">
            {/* Judul Utama (Deskriptor Sempurna) */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground leading-[1.15] text-balance">
              Standar Diagnostik TOEFL ITP®.{" "}
              <span className="text-primary block sm:inline">Langsung Inti, Bebas Birokrasi.</span>
            </h1>

            {/* Deskripsi Sempurna */}
            <p className="text-sm sm:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto text-balance">
              Software evaluasi mandiri terkalibrasi ke standar skor ETS 310–677. Cukup 3 tahap:
              Daftar akun, selesaikan 140 soal (115 menit), dan terima hasil prediksi instan.
            </p>

            {/* Tombol Aksi Utama: Directionally Centered, No Shadow, No Hover Border Jumping */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-4 w-full max-w-md sm:max-w-none mx-auto text-sm">
              <Link
                href="/dashboard"
                className={cn(
                  buttonVariants({ variant: "default", size: "default" }),
                  "group w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-lg h-11 px-7 font-bold bg-primary text-primary-foreground hover:bg-primary/90 border border-transparent shadow-none transition-colors",
                )}
              >
                <span>Mulai Tes Sekarang</span>
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

      {/* 3. FOOTER (Full horizontal across viewport, no bottom border, no side borders) */}
      <footer className="w-full border-t border-zinc-300 dark:border-zinc-800 bg-background">
        <div className="w-full max-w-6xl mx-auto py-6 px-6 sm:px-8 flex items-center justify-center text-center font-mono text-xs text-muted-foreground">
          <span>© 2026. All rights reserved.</span>
        </div>
      </footer>
    </div>
  );
}
