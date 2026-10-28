import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { BarChart3, Clock, Headphones, QrCode, ShieldCheck, Sparkles } from "lucide-react";

const EQUALIZER_BARS = [
  "animate-wave-1 h-3.5",
  "animate-wave-2 h-5",
  "animate-wave-3 h-2.5",
  "animate-wave-4 h-6",
  "animate-wave-5 h-4",
  "animate-wave-6 h-5",
  "animate-wave-2 h-3.5",
  "animate-wave-4 h-6",
] as const;

const PACING_SECTIONS = [
  { section: "Section 1: Listening", detail: "50 Qs • 35 Mins" },
  { section: "Section 2: Structure", detail: "40 Qs • 25 Mins" },
  { section: "Section 3: Reading", detail: "50 Qs • 55 Mins" },
] as const;

const DIAGNOSTIC_DOMAINS = [
  {
    domain: "Listening (31–68)",
    score: "Score 56",
    value: 82,
    scoreColor: "text-emerald-600 dark:text-emerald-400",
    barColor: "[&_span]:bg-emerald-500",
  },
  {
    domain: "Structure (31–68)",
    score: "Score 52",
    value: 76,
    scoreColor: "text-primary",
    barColor: "[&_span]:bg-primary",
  },
  {
    domain: "Reading (31–67)",
    score: "Score 54",
    value: 80,
    scoreColor: "text-indigo-500",
    barColor: "[&_span]:bg-indigo-500",
  },
] as const;

export function FeatureBento() {
  return (
    <section
      id="features"
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 space-y-10 sm:space-y-12 scroll-mt-24"
    >
      {/* Section Header: Standardized 3-Tier Hierarchy */}
      <div className="text-center max-w-3xl mx-auto space-y-3.5">
        <Badge
          variant="outline"
          className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-semibold tracking-wider uppercase shadow-xs"
        >
          <Sparkles className="h-3.5 w-3.5" /> Examination Structure & Standards
        </Badge>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-foreground leading-tight text-balance">
          Authentic Examination Conditions.{" "}
          <span className="bg-gradient-to-r from-primary via-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Accurate Diagnostic Scaling.
          </span>
        </h2>
        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-2xl mx-auto text-balance">
          Engineered to mirror official computer-based testing conditions: realistic pacing,
          single-play audio, and immediate diagnostic score reporting.
        </p>
      </div>

      {/* Asymmetrical Bento Grid: 100% Strict 12-Column Responsive Layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-6">
        {/* Bento 1: Listening Audio Engine (Col 7) */}
        <Card className="md:col-span-7 h-full rounded-3xl border border-border/40 bg-card/40 backdrop-blur-md p-6 sm:p-8 shadow-xs hover:border-primary/40 hover:bg-card/70 transition-all duration-300 flex flex-col justify-between group gap-6">
          <CardHeader className="p-0 space-y-3.5">
            <div className="flex items-center justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary border border-primary/20 shadow-xs shrink-0">
                <Headphones className="h-5 w-5" />
              </div>
              <Badge
                variant="outline"
                className="font-sans text-xs font-semibold text-primary border-primary/20 bg-primary/5 px-3 py-1 rounded-full"
              >
                Section 1 • 50 Questions
              </Badge>
            </div>

            <div className="space-y-1.5">
              <CardTitle className="text-lg sm:text-xl font-bold text-foreground tracking-tight">
                Single-Play Audio (Listening Comprehension)
              </CardTitle>
              <CardDescription className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Campus dialogues, discussions, and academic talks play strictly once with no replay
                controls, training genuine auditory retention under authentic examination pressure.
              </CardDescription>
            </div>
          </CardHeader>

          {/* Living Audio Equalizer Display */}
          <CardContent className="p-0">
            <div className="rounded-2xl border border-border/70 bg-muted/20 p-4 space-y-2.5 overflow-hidden">
              <div className="flex items-center justify-between text-xs gap-2">
                <div className="flex items-center gap-2 truncate">
                  <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                  <span className="font-sans font-bold text-foreground truncate">
                    Acoustic Calibration
                  </span>
                </div>
                <span className="font-mono text-muted-foreground text-xs shrink-0">
                  35-Minute Allocation
                </span>
              </div>

              <div className="flex items-center justify-between gap-2 h-9 px-3.5 bg-background/70 rounded-xl border border-border/40 overflow-hidden">
                <div className="flex items-end gap-1.5 h-6 shrink-0">
                  {EQUALIZER_BARS.map((bar, idx) => (
                    <span key={`eq-${idx}`} className={`w-1.5 rounded-full bg-primary ${bar}`} />
                  ))}
                </div>
                <span className="text-xs text-primary font-semibold font-sans truncate">
                  Official Standard: Strictly No Replay
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Bento 2: Strict Section Timers (Col 5) */}
        <Card className="md:col-span-5 h-full rounded-3xl border border-border/40 bg-card/40 backdrop-blur-md p-6 sm:p-8 shadow-xs hover:border-primary/40 hover:bg-card/70 transition-all duration-300 flex flex-col justify-between group gap-6">
          <CardHeader className="p-0 space-y-3.5">
            <div className="flex items-center justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary border border-primary/20 shadow-xs shrink-0">
                <Clock className="h-5 w-5" />
              </div>
              <Badge
                variant="outline"
                className="font-sans text-xs font-semibold text-muted-foreground border-border/60 bg-muted/40 px-3 py-1 rounded-full"
              >
                115 Minutes Total
              </Badge>
            </div>

            <div className="space-y-1.5">
              <CardTitle className="text-lg sm:text-xl font-bold text-foreground tracking-tight">
                Independent Section Timers
              </CardTitle>
              <CardDescription className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Individual countdown timers lock answers deterministically at section expiration,
                preventing time overrun and establishing realistic pacing habits.
              </CardDescription>
            </div>
          </CardHeader>

          {/* Pacing Rules */}
          <CardContent className="p-0">
            <div className="space-y-2 text-xs">
              {PACING_SECTIONS.map((sec) => (
                <div
                  key={sec.section}
                  className="flex items-center justify-between p-2.5 rounded-xl border border-border/40 bg-background/50 backdrop-blur-xs"
                >
                  <span className="font-semibold text-foreground">{sec.section}</span>
                  <span className="text-primary font-medium font-mono">{sec.detail}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Bento 3: Instant Digital Verification (Col 5) */}
        <Card className="md:col-span-5 h-full rounded-3xl border border-border/40 bg-card/40 backdrop-blur-md p-6 sm:p-8 shadow-xs hover:border-primary/40 hover:bg-card/70 transition-all duration-300 flex flex-col justify-between group gap-6">
          <CardHeader className="p-0 space-y-3.5">
            <div className="flex items-center justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 shadow-xs shrink-0">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <Badge
                variant="outline"
                className="font-sans text-xs font-semibold text-emerald-600 dark:text-emerald-400 border-emerald-500/30 bg-emerald-500/5 px-3 py-1 rounded-full"
              >
                Instant Issuance
              </Badge>
            </div>

            <div className="space-y-1.5">
              <CardTitle className="text-lg sm:text-xl font-bold text-foreground tracking-tight">
                Verified Digital Credentials
              </CardTitle>
              <CardDescription className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Certificate of Diagnostic Proficiency generated immediately upon completion with a
                unique token and public QR verification link for academic and recruitment
                portfolios.
              </CardDescription>
            </div>
          </CardHeader>

          {/* Certificate Preview Pill */}
          <CardContent className="p-0">
            <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-3.5 sm:p-4 flex items-center gap-3.5 overflow-hidden">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-background border border-border/60 shadow-xs text-emerald-600 dark:text-emerald-400 shrink-0">
                <QrCode className="h-5 w-5" />
              </div>
              <div className="space-y-0.5 overflow-hidden">
                <span className="text-xs font-mono font-bold text-foreground block truncate">
                  TOKEN: LYXIS-2026-VERIFIED
                </span>
                <span className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold block truncate">
                  ✓ Publicly Verifiable Digital Record
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Bento 4: Diagnostic Competency Map (Col 7) */}
        <Card className="md:col-span-7 h-full rounded-3xl border border-border/40 bg-card/40 backdrop-blur-md p-6 sm:p-8 shadow-xs hover:border-primary/40 hover:bg-card/70 transition-all duration-300 flex flex-col justify-between group gap-6">
          <CardHeader className="p-0 space-y-3.5">
            <div className="flex items-center justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary border border-primary/20 shadow-xs shrink-0">
                <BarChart3 className="h-5 w-5" />
              </div>
              <Badge
                variant="outline"
                className="font-sans text-xs font-semibold text-primary border-primary/20 bg-primary/5 px-3 py-1 rounded-full"
              >
                Diagnostic Breakdown
              </Badge>
            </div>

            <div className="space-y-1.5">
              <CardTitle className="text-lg sm:text-xl font-bold text-foreground tracking-tight">
                Domain-by-Domain Diagnostic Profiling
              </CardTitle>
              <CardDescription className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Pinpoint exact strengths and weakness clusters across Listening, Structure, and
                Reading comprehension, allowing targeted study before sitting for official exams.
              </CardDescription>
            </div>
          </CardHeader>

          {/* Diagnostic Progress Demo */}
          <CardContent className="p-0">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
              {DIAGNOSTIC_DOMAINS.map((item) => (
                <div
                  key={item.domain}
                  className="p-3.5 rounded-xl border border-border/40 bg-background/50 backdrop-blur-xs space-y-2 overflow-hidden"
                >
                  <div className="flex justify-between font-semibold gap-2">
                    <span className="text-muted-foreground truncate">{item.domain}</span>
                    <span className={`font-mono font-bold shrink-0 ${item.scoreColor}`}>
                      {item.score}
                    </span>
                  </div>
                  <Progress value={item.value} className={`w-full gap-0 ${item.barColor}`} />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
