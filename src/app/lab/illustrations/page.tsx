import { IllustrationShowcase } from "./illustration-showcase";
import { MinimalInteractiveMark } from "./minimal-interactive-mark";
import { PsychometricBeamPipeline } from "./psychometric-beam-pipeline";
import { Chip } from "@heroui/react";
import { ArrowLeft, CheckCircle2, Sparkles, Zap } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Motion & Animation Lab — Lyxis",
  description:
    "Interactive comparison of Linear-style technical wireframe illustrations and Magic UI Animated Beam special effects.",
};

export default function IllustrationsLabPage() {
  return (
    <div className="min-h-screen bg-[#05070A] text-foreground p-6 sm:p-10 lg:p-12 space-y-16 selection:bg-primary/20">
      <div className="max-w-7xl mx-auto space-y-16">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-mono font-bold text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Overview
        </Link>

        {/* ================= SPECIAL EFFECT: MAGIC UI ANIMATED BEAM PIPELINE ================= */}
        <section className="space-y-6 pt-2 border-b border-border/20 pb-16">
          <div className="space-y-3">
            <Chip
              variant="soft"
              className="border border-cyan-500/40 text-cyan-400 bg-cyan-950/20 font-mono text-xs uppercase"
            >
              <Zap className="w-3.5 h-3.5 mr-1" /> Custom Special Effect — Animated Beam
            </Chip>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-foreground">
              Psychometric Animated Beam Pipeline
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground max-w-2xl leading-relaxed">
              Efek khusus seperti pada Magic UI dibuat kustom menggunakan{" "}
              <span className="text-cyan-400 font-mono">motion/react</span> dan SVG Quadratic Bézier
              curves. Menghubungkan titik DOM koordinat seksi TOEFL ITP (Listening, Structure,
              Reading) ke pusat kalkulasi IRT Lyxis dengan aliran partikel cahaya.
            </p>
          </div>

          <div className="p-4 sm:p-8 rounded-3xl bg-[#030508] border border-white/5 flex items-center justify-center">
            <PsychometricBeamPipeline />
          </div>
        </section>

        {/* ================= PRIMARY FEATURED: MINIMALIST INTERACTIVE ================= */}
        <section className="space-y-6 border-b border-border/20 pb-16">
          <div className="space-y-3">
            <Chip
              variant="soft"
              className="border border-primary/40 text-primary bg-primary/10 font-mono text-xs uppercase"
            >
              <CheckCircle2 className="w-3.5 h-3.5 mr-1" /> Minimalist & Quiet Aesthetic
            </Chip>
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-foreground">
              The Minimalist Calibration Core
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground max-w-2xl leading-relaxed">
              Disederhanakan total tanpa elemen visual yang ramai: monolit isometrik murni dengan
              celah optik akustik (*venetian slits*). Interaktif secara langsung melalui kursor
              mouse dan klik.
            </p>
          </div>

          <div className="p-8 sm:p-12 rounded-3xl bg-[#030508] border border-white/5 flex items-center justify-center">
            <MinimalInteractiveMark />
          </div>
        </section>

        {/* ================= EXPERIMENTAL SUITE: 5 ADVANCED ENGINES ================= */}
        <section className="space-y-6">
          <div className="space-y-2">
            <Chip
              variant="soft"
              className="border border-border text-muted-foreground font-mono text-xs uppercase"
            >
              <Sparkles className="w-3.5 h-3.5 mr-1" /> Experimental Laboratory Suite (5 Engines)
            </Chip>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
              MK-IV Advanced Engine Explorations
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground max-w-2xl">
              Eksplorasi teknis mendalam menggunakan CSS Keyframes, Motion Spring, GSAP Scrubber,
              Three.js 3D WebGL, dan Quantum Canvas 2D Vector Field.
            </p>
          </div>

          <IllustrationShowcase />
        </section>
      </div>
    </div>
  );
}
