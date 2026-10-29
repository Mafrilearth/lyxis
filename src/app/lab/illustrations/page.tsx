import { IllustrationShowcase } from "@/components/illustrations/illustration-showcase";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Sparkles } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Motion & Animation Lab — Lyxis",
  description:
    "Interactive comparison of Linear-style technical wireframe illustrations using Pure CSS, Motion, GSAP, and Three.js.",
};

export default function IllustrationsLabPage() {
  return (
    <div className="min-h-screen bg-[#05070A] text-foreground p-6 sm:p-10 lg:p-12 space-y-10 selection:bg-primary/20">
      <div className="max-w-7xl mx-auto space-y-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-mono font-bold text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Overview
        </Link>

        <div className="space-y-3">
          <Badge
            variant="outline"
            className="border-primary/40 text-primary bg-primary/10 font-mono text-xs uppercase"
          >
            <Sparkles className="w-3.5 h-3.5 mr-1" /> Animation Architecture Lab
          </Badge>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-foreground">
            The Psychometric Calibration Engine
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground max-w-2xl leading-relaxed">
            Satu ilustrasi isometrik teknis yang sama untuk konteks TOEFL ITP® Lyxis (3-Tier
            Assessment Core: Listening, Structure, Reading), diimplementasikan dalam 4 engine
            animasi berbeda untuk dibandingkan secara langsung.
          </p>
        </div>

        <IllustrationShowcase />
      </div>
    </div>
  );
}
