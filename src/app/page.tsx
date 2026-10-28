import { EnterpriseFlow } from "@/components/landing/enterprise-flow";
import { FeatureBento } from "@/components/landing/feature-bento";
import { FloatingNav } from "@/components/landing/floating-nav";
import { InteractiveFaq } from "@/components/landing/interactive-faq";
import { AmbientMeshCanvas } from "@/components/ui/ambient-mesh-canvas";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FOOTER_LINKS } from "@/lib/constants/navigation";
import { cn } from "@/lib/utils";
import {
  ArrowUpRight,
  Briefcase,
  ChevronDown,
  GraduationCap,
  Scroll,
  Sparkles,
} from "lucide-react";
import Link from "next/link";

const TARGET_AUDIENCE_PILLARS = [
  {
    icon: GraduationCap,
    badge: "Scholarships",
    title: "Scholarship Candidates",
    subtitle: "Fulbright • Chevening • AAS • DAAD",
    description:
      "Benchmark your diagnostic score against official 475, 500, and 550 minimum cutoffs required by global scholarship foundations and international funding agencies.",
    highlight: "500 – 550+ Minimum Cutoff",
  },
  {
    icon: Scroll,
    badge: "Degree Clearance",
    title: "University Students",
    subtitle: "Undergraduate • Master's • Doctoral Defense",
    description:
      "Clear mandatory institutional English graduation standards before thesis defense and graduation clearance under calibrated computer-based testing conditions.",
    highlight: "450 – 500 Degree Requirement",
  },
  {
    icon: Briefcase,
    badge: "Corporate & Public Sector",
    title: "Corporate & Public Sector",
    subtitle: "Executive Hiring • Promotion • Public Sector",
    description:
      "Meet standardized English diagnostic benchmarks required for multinational enterprise recruitment, government hiring, and career advancement.",
    highlight: "Verified Digital Credential",
  },
];

export default function HomePage() {
  return (
    <div className="relative min-h-screen bg-background text-foreground flex flex-col overflow-x-hidden selection:bg-primary/20 selection:text-primary">
      {/* Living Hardware-Accelerated Ambient Light Particle Canvas */}
      <AmbientMeshCanvas />

      {/* Multi-Tier Continuous Ambient Atmosphere */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[700px] bg-gradient-to-b from-primary/15 via-blue-600/5 to-transparent blur-3xl pointer-events-none -z-10"
        aria-hidden="true"
      />
      <div
        className="absolute top-[1200px] left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-primary/5 blur-3xl pointer-events-none -z-10"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-40 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-primary/10 blur-3xl pointer-events-none -z-10"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-grid-subtle text-foreground/[0.025] pointer-events-none -z-10"
        aria-hidden="true"
      />

      {/* Detached Floating Island Navigation */}
      <FloatingNav />

      <main className="flex-1">
        {/* Expansive Hero Section: Proportional, Authoritative, Editorial */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-14 pb-14 sm:pb-18 text-center space-y-10 sm:space-y-14">
          <div className="space-y-6 max-w-4xl mx-auto">
            {/* High-Typography Editorial Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground max-w-4xl mx-auto leading-[1.12] text-balance">
              The Standard in TOEFL&nbsp;ITP® Assessment.{" "}
              <span className="bg-gradient-to-r from-primary via-blue-600 to-indigo-600 bg-clip-text text-transparent block sm:inline">
                Calibrated for Scholarships, Degrees&nbsp;&&nbsp;Careers.
              </span>
            </h1>

            {/* Value-Driven Subhead */}
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto text-balance font-normal">
              High-precision computer-based diagnostic testing mapped to the official{" "}
              <span className="whitespace-nowrap">310–677</span> scaled metric. Benchmark your
              proficiency on demand before official test day.
            </p>

            {/* Action Buttons: Responsive Full-Width on Mobile, Symmetrical on Desktop */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 pt-2 w-full max-w-md sm:max-w-none mx-auto">
              <Link
                href="/dashboard"
                className={cn(
                  buttonVariants({ variant: "default", size: "default" }),
                  "group w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full h-11 sm:h-12 px-6 sm:px-7 text-sm sm:text-base font-bold shadow-md shadow-primary/25 hover:shadow-lg hover:shadow-primary/40 active:scale-[0.98] transition-all duration-300",
                )}
              >
                <span>Start Assessment</span>
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>

              <Link
                href="#features"
                className={cn(
                  buttonVariants({ variant: "outline", size: "default" }),
                  "w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full h-11 sm:h-12 px-6 sm:px-7 text-sm sm:text-base font-semibold border-border/60 bg-background/60 hover:bg-muted/60 backdrop-blur-md active:scale-[0.98] transition-all",
                )}
              >
                <span>Standards & Structure</span>
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              </Link>
            </div>
          </div>

          {/* Symmetrical 3-Column Target Audience Grid: Seamless Glassmorphic Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 text-left pt-2">
            {TARGET_AUDIENCE_PILLARS.map((pillar) => {
              const IconComponent = pillar.icon;
              return (
                <Card
                  key={pillar.title}
                  className="h-full rounded-3xl border border-border/40 bg-card/40 backdrop-blur-md p-6 sm:p-8 shadow-xs hover:border-primary/40 hover:bg-card/70 transition-all duration-300 flex flex-col justify-between group gap-6"
                >
                  <CardHeader className="p-0 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary border border-primary/20 shadow-xs shrink-0">
                        <IconComponent className="h-5 w-5" />
                      </div>
                      <Badge
                        variant="outline"
                        className="font-sans text-xs font-semibold text-primary border-primary/20 bg-primary/5 px-2.5 py-0.5 rounded-full"
                      >
                        {pillar.badge}
                      </Badge>
                    </div>

                    <div className="space-y-1.5">
                      <CardTitle className="text-lg sm:text-xl font-bold text-foreground tracking-tight">
                        {pillar.title}
                      </CardTitle>
                      <div className="text-xs font-semibold text-primary tracking-wide">
                        {pillar.subtitle}
                      </div>
                      <CardDescription className="text-xs sm:text-sm text-muted-foreground leading-relaxed pt-1">
                        {pillar.description}
                      </CardDescription>
                    </div>
                  </CardHeader>

                  <CardFooter className="p-0 pt-4 border-t border-border/40 flex items-center justify-between text-xs bg-transparent rounded-none">
                    <span className="font-semibold text-muted-foreground">Standard:</span>
                    <span className="font-semibold text-foreground bg-background/50 backdrop-blur-xs px-2.5 py-1 rounded-lg border border-border/40 tabular-nums">
                      {pillar.highlight}
                    </span>
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Seamless Hairline Transition */}
        <div
          className="w-full max-w-5xl mx-auto h-px bg-gradient-to-r from-transparent via-border/40 to-transparent"
          aria-hidden="true"
        />

        {/* Core Platform Capabilities */}
        <FeatureBento />

        {/* Seamless Hairline Transition */}
        <div
          className="w-full max-w-5xl mx-auto h-px bg-gradient-to-r from-transparent via-border/40 to-transparent"
          aria-hidden="true"
        />

        {/* 3-Step Simple Testing Flow */}
        <EnterpriseFlow />

        {/* Seamless Hairline Transition */}
        <div
          className="w-full max-w-5xl mx-auto h-px bg-gradient-to-r from-transparent via-border/40 to-transparent"
          aria-hidden="true"
        />

        {/* Frequently Asked Questions */}
        <InteractiveFaq />

        {/* Final High-Impact CTA Banner: Seamless, Editorial, Balanced */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 text-center">
          <Card className="rounded-3xl border border-border/40 bg-gradient-to-b from-card/80 via-card/40 to-primary/10 backdrop-blur-md p-8 sm:p-12 lg:p-16 text-center space-y-6 relative overflow-hidden shadow-sm">
            <div
              className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-64 bg-primary/15 blur-3xl pointer-events-none"
              aria-hidden="true"
            />

            <CardHeader className="p-0 space-y-4 relative z-10 w-full max-w-4xl mx-auto flex flex-col items-center">
              <div className="flex justify-center">
                <Badge
                  variant="outline"
                  className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-semibold tracking-wider uppercase shadow-xs"
                >
                  <Sparkles className="h-3.5 w-3.5" /> 24/7 On-Demand Testing
                </Badge>
              </div>
              <CardTitle className="w-full text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground leading-[1.18]">
                Benchmark Your English Proficiency Today.
                <br className="hidden sm:inline" />{" "}
                <span className="bg-gradient-to-r from-primary via-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Instant Calibrated Scoring.
                </span>
              </CardTitle>
              <CardDescription className="w-full text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto pt-1">
                Take the standardized 115-minute diagnostic assessment and receive your calibrated
                score report with instant QR verification.
              </CardDescription>
            </CardHeader>

            <CardContent className="p-0 pt-2 relative z-10 flex justify-center">
              <Link
                href="/dashboard"
                className={cn(
                  buttonVariants({ variant: "default", size: "default" }),
                  "group w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full h-11 sm:h-12 px-7 sm:px-8 text-sm sm:text-base font-bold shadow-md shadow-primary/25 hover:shadow-lg hover:shadow-primary/40 active:scale-[0.98] transition-all duration-300",
                )}
              >
                <span>Start Assessment</span>
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </CardContent>
          </Card>
        </section>
      </main>

      {/* Clean Commercial Footer: Seamlessly Blended */}
      <footer className="border-t border-border/30 bg-background/50 backdrop-blur-sm py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-xs group-hover:scale-105 transition-transform p-1.5">
              <svg viewBox="0 0 500 500" className="w-full h-full" fill="none" aria-hidden="true">
                <path
                  d="M 246 68 C 248 65, 252 65, 254 68 C 295 125, 385 245, 395 360 C 398 375, 385 388, 370 385 C 335 375, 290 340, 250 290 C 210 340, 165 375, 130 385 C 115 388, 102 375, 105 360 C 115 245, 205 125, 246 68 Z"
                  fill="currentColor"
                />
              </svg>
            </div>
            <span className="font-extrabold text-base tracking-tight text-foreground leading-none">
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

          <div className="text-xs text-muted-foreground text-center sm:text-right">
            © 2026 Lyxis. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
