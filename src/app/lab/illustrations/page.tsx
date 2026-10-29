import { IllustrationShowcase } from "@/components/illustrations/illustration-showcase";
import { MinimalInteractiveMark } from "@/components/illustrations/minimal-interactive-mark";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, CheckCircle2, Sparkles } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Motion & Animation Lab — Lyxis",
  description:
    "Interactive comparison of Linear-style technical wireframe illustrations using Pure CSS, Motion, GSAP, Three.js, and Quantum Canvas.",
};

export default function IllustrationsLabPage() {
  return (
    <div className="min-h-screen bg-[#05070A] text-foreground p-6 sm:p-10 lg:p-12 space-y-16 selection:bg-primary/20">
      <div className="max-w-7xl mx-auto space-y-12">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-mono font-bold text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Overview
        </Link>

        {/* ================= PRIMARY FEATURED: MINIMALIST INTERACTIVE ================= */}
        <section className="space-y-6 pt-4 border-b border-border/20 pb-16">
          <div className="space-y-3">
            <Badge
              variant="outline"
              className="border-primary/40 text-primary bg-primary/10 font-mono text-xs uppercase"
            >
              <CheckCircle2 className="w-3.5 h-3.5 mr-1" /> Requested Revision — Minimalist &
              Interactive
            </Badge>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-foreground">
              The Minimalist Calibration Core
            </h1>
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
            <Badge
              variant="outline"
              className="border-border text-muted-foreground font-mono text-xs uppercase"
            >
              <Sparkles className="w-3.5 h-3.5 mr-1" /> Experimental Laboratory Suite (5 Engines)
            </Badge>
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
