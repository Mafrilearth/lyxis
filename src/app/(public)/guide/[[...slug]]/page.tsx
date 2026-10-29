import { Card, Chip } from "@heroui/react";
import { buttonVariants } from "@heroui/styles";
import {
  ArrowLeft,
  BookOpen,
  CheckCircle2,
  FileText,
  Lock,
  Scale,
  ShieldAlert,
} from "lucide-react";
import type { Metadata, Route } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

interface GuidePageProps {
  params: Promise<{ slug?: string[] }>;
}

export async function generateMetadata({ params }: GuidePageProps): Promise<Metadata> {
  const { slug } = await params;
  const section = slug?.[0];

  if (!section) {
    return {
      title: "TOEFL ITP® Diagnostic Examination Handbook",
      description:
        "Official guide to testing procedures, scoring conversion, and security policies.",
    };
  }

  const titles: Record<string, string> = {
    scoring: "Standardized Scoring Matrix & CEFR Scale",
    "anti-cheat": "Academic Integrity & Sensor Lockdown Regulations",
    cefr: "Common European Framework of Reference (CEFR) Alignment",
  };

  return {
    title: `${titles[section] || "Examination Guide"} | Lyxis`,
    description:
      "Official documentation and academic specifications for the Lyxis diagnostic platform.",
  };
}

export default async function GuidePage({ params }: GuidePageProps) {
  const { slug } = await params;
  const currentSection = slug ? slug.join("/") : "overview";

  // Validate allowed catch-all paths
  const validSections = ["overview", "scoring", "anti-cheat", "cefr"];
  if (slug && slug.length > 0 && !validSections.includes(slug[0])) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background text-foreground py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between border-b border-border pb-4">
          <Link
            href="/candidate/dashboard"
            className={buttonVariants({ variant: "ghost", size: "sm" })}
          >
            <ArrowLeft className="size-4 mr-2" /> Return to Dashboard
          </Link>
          <div className="flex items-center gap-2">
            <Chip size="sm" variant="soft" className="text-xs">
              Next.js Catch-all: {slug ? `/${slug.join("/")}` : "/guide"}
            </Chip>
          </div>
        </div>

        {/* Header */}
        <div className="space-y-3">
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight flex items-center gap-3">
            <BookOpen className="size-8 text-primary" />
            TOEFL ITP® Diagnostic Handbook
          </h1>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Academic specifications, scaled scoring tables (310–677 scale), and exam integrity
            guidelines.
          </p>
        </div>

        {/* Section Navigation Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          <Link
            href={"/guide" as Route}
            className={buttonVariants({
              variant: currentSection === "overview" ? "primary" : "outline",
              size: "sm",
            })}
          >
            <FileText className="size-3.5 mr-1.5" /> Overview
          </Link>
          <Link
            href={"/guide/scoring" as Route}
            className={buttonVariants({
              variant: currentSection === "scoring" ? "primary" : "outline",
              size: "sm",
            })}
          >
            <Scale className="size-3.5 mr-1.5" /> Scoring Matrix
          </Link>
          <Link
            href={"/guide/anti-cheat" as Route}
            className={buttonVariants({
              variant: currentSection === "anti-cheat" ? "primary" : "outline",
              size: "sm",
            })}
          >
            <ShieldAlert className="size-3.5 mr-1.5" /> Anti-Cheat
          </Link>
          <Link
            href={"/guide/cefr" as Route}
            className={buttonVariants({
              variant: currentSection === "cefr" ? "primary" : "outline",
              size: "sm",
            })}
          >
            <CheckCircle2 className="size-3.5 mr-1.5" /> CEFR Benchmarks
          </Link>
        </div>

        {/* Content Body based on Catch-all Segment */}
        {currentSection === "overview" && (
          <Card className="p-6 space-y-4 border border-border bg-surface">
            <h2 className="text-xl font-bold">Standard Examination Structure</h2>
            <p className="text-sm text-muted-foreground">
              The Lyxis TOEFL ITP® diagnostic assessment evaluates comprehensive English proficiency
              through 140 standardized multiple-choice questions across three discrete sections:
            </p>
            <div className="grid sm:grid-cols-3 gap-4 pt-2">
              <div className="border border-border rounded-xl p-4 space-y-2 bg-background">
                <span className="text-xs font-bold uppercase text-primary">Section 1</span>
                <h3 className="font-bold text-sm">Listening Comprehension</h3>
                <p className="text-xs text-muted-foreground">50 Questions • 35 Minutes</p>
              </div>
              <div className="border border-border rounded-xl p-4 space-y-2 bg-background">
                <span className="text-xs font-bold uppercase text-primary">Section 2</span>
                <h3 className="font-bold text-sm">Structure & Written Expression</h3>
                <p className="text-xs text-muted-foreground">40 Questions • 25 Minutes</p>
              </div>
              <div className="border border-border rounded-xl p-4 space-y-2 bg-background">
                <span className="text-xs font-bold uppercase text-primary">Section 3</span>
                <h3 className="font-bold text-sm">Reading Comprehension</h3>
                <p className="text-xs text-muted-foreground">50 Questions • 55 Minutes</p>
              </div>
            </div>
          </Card>
        )}

        {currentSection === "scoring" && (
          <Card className="p-6 space-y-4 border border-border bg-surface">
            <h2 className="text-xl font-bold">ETS-Standard Scoring Formula</h2>
            <p className="text-sm text-muted-foreground">
              Raw scores are converted into converted scaled scores (31–68) for each section. The
              total score is computed via the official formula:
            </p>
            <div className="bg-background border border-primary/30 p-4 rounded-xl text-center font-mono font-bold text-primary text-base">
              Total Score = ((Scaled Sec 1 + Scaled Sec 2 + Scaled Sec 3) * 10) / 3
            </div>
            <p className="text-xs text-muted-foreground">
              Minimum possible score is 310; maximum theoretical score is 677.
            </p>
          </Card>
        )}

        {currentSection === "anti-cheat" && (
          <Card className="p-6 space-y-4 border border-border bg-surface">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Lock className="size-5 text-warning" />
              Sensor Lockdown & Proctoring
            </h2>
            <p className="text-sm text-muted-foreground">
              The testing engine monitors browser focus events (`blur`), window state
              (`visibilitychange`), and fullscreen compliance in real time.
            </p>
            <ul className="text-xs text-muted-foreground space-y-2 list-disc list-inside">
              <li>Tab-switching triggers an immediate warning dialog.</li>
              <li>
                Every infraction is logged with microsecond timestamps and stored in audit
                telemetry.
              </li>
              <li>
                Attempts exceeding threshold tolerance are flagged for manual administrative review.
              </li>
            </ul>
          </Card>
        )}

        {currentSection === "cefr" && (
          <Card className="p-6 space-y-4 border border-border bg-surface">
            <h2 className="text-xl font-bold">CEFR Equivalency Table</h2>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between p-3 border border-border rounded-lg bg-background">
                <span className="font-bold">CEFR C1 (Effective Operational Proficiency)</span>
                <span className="font-mono text-primary font-bold">627 – 677</span>
              </div>
              <div className="flex justify-between p-3 border border-border rounded-lg bg-background">
                <span className="font-bold">CEFR B2 (Vantage / Upper Intermediate)</span>
                <span className="font-mono text-primary font-bold">543 – 626</span>
              </div>
              <div className="flex justify-between p-3 border border-border rounded-lg bg-background">
                <span className="font-bold">CEFR B1 (Threshold / Intermediate)</span>
                <span className="font-mono text-primary font-bold">460 – 542</span>
              </div>
              <div className="flex justify-between p-3 border border-border rounded-lg bg-background">
                <span className="font-bold">CEFR A2 (Waystage / Elementary)</span>
                <span className="font-mono text-primary font-bold">337 – 459</span>
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
