import { FloatingNav } from "@/components/landing/floating-nav";
import { AmbientMeshCanvas } from "@/components/ui/ambient-mesh-canvas";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FOOTER_LINKS } from "@/lib/constants/navigation";
import { cn } from "@/lib/utils";
import { ArrowUpRight, ShieldCheck, Sparkles } from "lucide-react";
import Link from "next/link";

const CORE_METRICS = [
  {
    value: "115 Mins",
    label: "Standard Duration",
    subtext: "Paced Across 3 Sections",
  },
  {
    value: "140 Items",
    label: "Diagnostic Questions",
    subtext: "Listening, Structure, Reading",
  },
  {
    value: "310 – 677",
    label: "Scaled Score Range",
    subtext: "Official ETS Diagnostic Metric",
  },
  {
    value: "CEFR A2–C1",
    label: "Global Benchmark",
    subtext: "Instant Cryptographic QR Hash",
  },
] as const;

export default function HomePage() {
  return (
    <div className="relative min-h-screen bg-background text-foreground flex flex-col overflow-x-hidden selection:bg-primary/20 selection:text-primary">
      {/* Living Ambient Canvas */}
      <AmbientMeshCanvas />

      {/* Solid Primary Atmosphere Glow (No Gradients) */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[500px] bg-primary/5 blur-3xl pointer-events-none -z-10"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-grid-subtle text-foreground/[0.025] pointer-events-none -z-10"
        aria-hidden="true"
      />

      {/* Detached Floating Island Navigation */}
      <FloatingNav />

      <main className="flex-1">
        {/* Core Hero Section: Authoritative, Editorial, Direct */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-20 pb-16 sm:pb-24 text-center space-y-12">
          <div className="space-y-6 max-w-4xl mx-auto">
            {/* Core Badge */}
            <div className="flex justify-center">
              <Badge
                variant="outline"
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-semibold tracking-wider uppercase shadow-xs"
              >
                <Sparkles className="h-3.5 w-3.5" /> TOEFL ITP® Diagnostic Standard
              </Badge>
            </div>

            {/* Authoritative Heading (Pure Solid Typography, No Gradients) */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-foreground max-w-4xl mx-auto leading-[1.08] text-balance">
              The Standard in TOEFL ITP® Assessment.{" "}
              <span className="text-primary block sm:inline">
                Calibrated for Scholarships & Degrees.
              </span>
            </h1>

            {/* Core Value Statement */}
            <p className="text-base sm:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto font-normal text-balance">
              Calibrated 115-minute diagnostic testing mapped to the official 310–677 scaled metric.
              Benchmark your proficiency on demand with verified cryptographic credentials.
            </p>

            {/* Core Action CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3.5 pt-4 w-full max-w-md sm:max-w-none mx-auto">
              <Link
                href="/dashboard"
                className={cn(
                  buttonVariants({ variant: "default", size: "default" }),
                  "group w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full h-12 px-8 text-base font-bold bg-primary text-primary-foreground hover:bg-primary/90 shadow-md shadow-primary/20 active:scale-[0.98] transition-all",
                )}
              >
                <span>Start Assessment</span>
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>

              <Link
                href="/login"
                className={cn(
                  buttonVariants({ variant: "outline", size: "default" }),
                  "w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full h-12 px-8 text-base font-semibold border-border bg-card/80 hover:bg-muted active:scale-[0.98] transition-all",
                )}
              >
                <span>Candidate Portal</span>
              </Link>
            </div>
          </div>

          {/* Core Metrics: Straight to the Point (Solid Primary, No Gradients) */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 pt-4">
            {CORE_METRICS.map((metric) => (
              <Card
                key={metric.label}
                className="rounded-3xl border border-border/80 bg-card/60 backdrop-blur-md p-6 sm:p-8 text-left shadow-xs border-t-2 border-t-primary transition-all"
              >
                <div className="space-y-2">
                  <div className="font-mono text-2xl sm:text-3xl font-bold tracking-tight text-primary">
                    {metric.value}
                  </div>
                  <div className="text-sm font-semibold text-foreground tracking-tight">
                    {metric.label}
                  </div>
                  <p className="text-xs text-muted-foreground leading-snug">{metric.subtext}</p>
                </div>
              </Card>
            ))}
          </div>

          {/* Core Direct Test Launch Console (Solid Primary Styling, No Gradients) */}
          <Card className="rounded-3xl border-2 border-primary/30 bg-card/80 backdrop-blur-md p-8 sm:p-12 lg:p-16 text-center space-y-6 shadow-sm max-w-4xl mx-auto">
            <CardHeader className="p-0 space-y-4 max-w-2xl mx-auto">
              <div className="flex items-center justify-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-primary">
                <ShieldCheck className="h-4 w-4" /> Ready for Immediate Evaluation
              </div>
              <CardTitle className="text-2xl sm:text-4xl font-extrabold tracking-tight text-foreground leading-tight">
                Begin Your Diagnostic Test Now.
              </CardTitle>
              <CardDescription className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                Take the full 140-item examination across Listening (35m), Structure (25m), and
                Reading (55m). Real-time server state persistence and instant calibrated score
                reporting upon completion.
              </CardDescription>
            </CardHeader>

            <CardContent className="p-0 pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/dashboard"
                className={cn(
                  buttonVariants({ variant: "default", size: "default" }),
                  "group w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full h-12 px-8 text-base font-bold bg-primary text-primary-foreground hover:bg-primary/90 shadow-md shadow-primary/25 active:scale-[0.98] transition-all",
                )}
              >
                <span>Take Diagnostic Test</span>
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </CardContent>
          </Card>
        </section>
      </main>

      {/* Clean Commercial Footer */}
      <footer className="border-t border-border/40 bg-background/50 backdrop-blur-sm py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <Link href="/" className="flex items-center group">
            <span className="font-extrabold text-lg tracking-tight text-foreground leading-none transition-opacity group-hover:opacity-80">
              Lyxis
            </span>
          </Link>

          <nav className="flex flex-wrap items-center gap-6 sm:gap-8 text-xs sm:text-sm font-semibold text-muted-foreground">
            {FOOTER_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="hover:text-foreground transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="text-xs text-muted-foreground text-center sm:text-right font-mono">
            © 2026 Lyxis. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
