import { AmbientMeshCanvas } from "@/components/ui/ambient-mesh-canvas";
import { Badge } from "@/components/ui/badge";
import { Headphones, QrCode, ShieldCheck, Sparkles } from "lucide-react";
import Link from "next/link";
import type React from "react";

export function AuthShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen w-full flex items-center justify-center p-6 sm:p-10 lg:p-14 bg-background text-foreground overflow-hidden selection:bg-primary/20 selection:text-primary">
      {/* Living Atmospheric Mesh Background Canvas */}
      <AmbientMeshCanvas />

      {/* Top Ambient Glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-[480px] bg-gradient-to-b from-primary/15 via-blue-500/5 to-transparent blur-3xl pointer-events-none -z-10"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-grid-subtle text-foreground/[0.025] pointer-events-none -z-10"
        aria-hidden="true"
      />

      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left Column: Expansive Editorial Showcase */}
        <div className="lg:col-span-6 space-y-8 text-left">
          <Link href="/" className="inline-flex items-center gap-3 group">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#07090E] border border-border/80 shadow-sm transition-transform duration-300 group-hover:scale-105 p-2">
              <svg
                viewBox="0 0 500 500"
                className="w-full h-full text-foreground"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M 246 68 C 248 65, 252 65, 254 68 C 295 125, 385 245, 395 360 C 398 375, 385 388, 370 385 C 335 375, 290 340, 250 290 C 210 340, 165 375, 130 385 C 115 388, 102 375, 105 360 C 115 245, 205 125, 246 68 Z"
                  fill="currentColor"
                />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-2xl tracking-tight leading-none text-foreground">
                Lyxis
              </span>
              <span className="text-xs text-muted-foreground font-medium tracking-wide mt-1">
                Psychometric English Diagnostic Engine
              </span>
            </div>
          </Link>

          <div className="space-y-4">
            <Badge
              variant="outline"
              className="text-xs sm:text-sm font-semibold px-3.5 py-1 text-primary border-primary/20 bg-primary/5 gap-2"
            >
              <Sparkles className="h-4 w-4" /> Candidate Command Center
            </Badge>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground leading-[1.14]">
              The Calibration of Academic Mastery.
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
              Sign in or create an account to access your private candidate terminal, launch the
              standardized diagnostic assessment, and retain verifiable credentials.
            </p>
          </div>

          {/* 3 Key Trust Pillars: Spacious & Clean */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-3 p-3.5 rounded-2xl border border-border/60 bg-muted/20">
              <ShieldCheck className="h-5 w-5 text-primary shrink-0" />
              <span className="text-sm font-semibold text-foreground">
                140 Comprehensive Items Conforming to Official Form A
              </span>
            </div>

            <div className="flex items-center gap-3 p-3.5 rounded-2xl border border-border/60 bg-muted/20">
              <Headphones className="h-5 w-5 text-primary shrink-0" />
              <span className="text-sm font-semibold text-foreground">
                Single-Play High-Fidelity Audio Listening Stream
              </span>
            </div>

            <div className="flex items-center gap-3 p-3.5 rounded-2xl border border-border/60 bg-muted/20">
              <QrCode className="h-5 w-5 text-emerald-500 shrink-0" />
              <span className="text-sm font-semibold text-foreground">
                Digital Certificate with Publicly Verifiable QR Authentication
              </span>
            </div>
          </div>

          <div className="pt-2">
            <Link
              href="/"
              className="text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors underline underline-offset-4"
            >
              ← Return to Lyxis Overview
            </Link>
          </div>
        </div>

        {/* Right Column: Calibrated Double-Bezel Auth Card */}
        <div className="lg:col-span-6 w-full">
          <div className="rounded-3xl p-1.5 sm:p-2 bg-gradient-to-b from-primary/20 via-border/40 to-muted/20 ring-1 ring-border/80 shadow-xl">
            <div className="rounded-[calc(1.5rem-0.125rem)] bg-card p-6 sm:p-8 lg:p-10">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
