import { StartTestButton } from "./start-test-button";
import { ThemeToggle } from "@/app/theme-toggle";
import { AmbientMeshCanvas } from "@/app/ambient-mesh-canvas";
import { Card, Chip } from "@heroui/react";
import { buttonVariants } from "@heroui/styles";
import { createClient } from "@/lib/supabase/server";
import { cn } from "@/lib/utils";
import {
  ArrowRight,
  Award,
  BookOpen,
  Calendar,
  CheckCircle2,
  Clock,
  ExternalLink,
  FileCheck2,
  FileText,
  Headphones,
  LogOut,
  PenTool,
  Play,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";
import type { ExamAttempt } from "@/types";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export const metadata = {
  title: "Candidate Command Center — Lyxis",

  description:
    "Review your TOEFL ITP® diagnostic performance history, inspect scaled score predictions, and access verified digital credentials.",
};

async function DashboardContent() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user?.email) {
    redirect("/login?next=/dashboard");
  }

  const candidateEmail = user.email;
  const candidateName =
    (user.user_metadata?.full_name as string | undefined) ||
    (user.user_metadata?.name as string | undefined) ||
    candidateEmail.split("@")[0] ||
    "Candidate";

  let attempts: ExamAttempt[] = [];

  try {
    const { data } = await supabase
      .from("exam_attempts")
      .select("*, certificates(*)")
      .eq("candidateEmail", candidateEmail)
      .order("startedAt", { ascending: false });

    if (data && data.length > 0) {
      attempts = data;
    }
  } catch (error) {
    console.warn("Notice: Dashboard attempts query:", error);
  }

  const completedAttempts = attempts.filter((a) => a.status === "SUBMITTED");
  const inProgressAttempt = attempts.find((a) => a.status === "IN_PROGRESS");
  const displayName = candidateName;

  const bestScore =
    completedAttempts.length > 0
      ? Math.max(...completedAttempts.map((a) => a.totalScaledScore || 310))
      : 0;

  const avgScore =
    completedAttempts.length > 0
      ? Math.round(
          completedAttempts.reduce((acc, a) => acc + (a.totalScaledScore || 310), 0) /
            completedAttempts.length,
        )
      : 0;

  return (
    <div className="relative min-h-screen bg-background text-foreground flex flex-col overflow-x-hidden selection:bg-primary/20 selection:text-primary">
      {/* Living Atmospheric Mesh Background Canvas */}
      <AmbientMeshCanvas />

      {/* Top Ambient Glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[420px] bg-primary/5 blur-3xl pointer-events-none -z-10"
        aria-hidden="true"
      />

      {/* Candidate Top Navigation: Spacious & Proportional */}
      <header className="sticky top-0 z-40 w-full border-b border-border/40 bg-background/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground font-black text-xl shadow-md">
                L
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-lg tracking-tight leading-none text-foreground">
                  Lyxis
                </span>
                <span className="text-xs text-muted-foreground font-medium tracking-wide uppercase mt-0.5">
                  Candidate Portal
                </span>
              </div>
            </Link>
          </div>

          <div className="flex items-center gap-3 sm:gap-4">
            <div className="hidden sm:flex items-center gap-2.5 border border-border/60 rounded-full px-4 py-1.5 bg-muted/30 text-xs">
              <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-semibold text-foreground">{displayName}</span>
              <Chip
                variant="soft"
                size="sm"
                className="text-[10px] px-2 py-0 font-bold bg-primary/10 text-primary border border-primary/20"
              >
                CANDIDATE
              </Chip>
            </div>

            <form action="/auth/signout" method="post">
              <button
                type="submit"
                className={cn(
                  buttonVariants({ variant: "outline", size: "sm" }),
                  "h-10 px-4 rounded-xl gap-2 text-xs font-semibold hover:text-destructive hover:border-destructive/40 transition-colors",
                )}
                title="Sign out of your candidate account"
              >
                <LogOut className="h-4 w-4" />
                <span className="hidden md:inline">Sign Out</span>
              </button>
            </form>

            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Main Content Dashboard: Expansive & Clean */}
      <main className="flex-1 max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 py-10 sm:py-16 w-full space-y-12">
        {/* Welcome Banner: Clean Primary Border Frame */}
        <div className="rounded-[2rem] sm:rounded-[2.5rem] p-1.5 sm:p-2 bg-card border-2 border-primary/20 shadow-lg">
          <div className="rounded-[calc(2rem-0.5rem)] sm:rounded-[calc(2.5rem-0.5rem)] bg-card p-8 sm:p-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary">
                <ShieldCheck className="h-4 w-4" /> Calibrated Benchmark Form A
              </div>
              <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-foreground">
                Welcome, {candidateName}
              </h1>
              <p className="text-base text-muted-foreground leading-relaxed">
                Track your TOEFL ITP® scaled score progression, evaluate CEFR benchmark bands, and
                access official digital credentials backed by public verification.
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0 self-stretch sm:self-auto">
              <StartTestButton candidateName={displayName} candidateEmail={candidateEmail} />
            </div>
          </div>
        </div>

        {/* In-Progress Alert Banner (if candidate has an active session) */}
        {inProgressAttempt && (
          <div className="rounded-3xl border-2 border-primary/40 bg-primary/5 p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-md animate-pulse">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2.5">
                <Chip
                  variant="primary"
                  size="sm"
                  className="text-xs font-bold uppercase tracking-wider px-3 py-1"
                >
                  Active Assessment Session
                </Chip>
                <span className="text-xs text-muted-foreground font-mono">
                  Session #{inProgressAttempt.id.slice(0, 8)}
                </span>
              </div>
              <h3 className="text-lg font-bold text-foreground">
                You have an unfinalized diagnostic assessment in progress.
              </h3>
              <p className="text-sm text-muted-foreground">
                Your server clock and recorded answers are safely preserved. You can resume testing
                at any time.
              </p>
            </div>

            <Link
              href={`/exam/${inProgressAttempt.id}`}
              className={cn(
                buttonVariants({ size: "lg" }),
                "h-12 px-7 rounded-2xl font-bold gap-2 text-sm shrink-0 shadow-md",
              )}
            >
              <Play className="h-4 w-4" /> Resume Assessment <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        )}

        {/* Metric Overview Cards: Expansive & Proportional */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <Card className="rounded-3xl border-border/80 bg-card/75 shadow-xs p-6 space-y-3">
            <Card.Header className="p-0 pb-1">
              <Card.Description className="text-xs font-bold uppercase tracking-wider flex items-center justify-between text-muted">
                <span>Completed Assessments</span>
                <FileCheck2 className="h-5 w-5 text-accent" />
              </Card.Description>
              <Card.Title className="text-4xl font-black font-mono pt-2">
                {completedAttempts.length}
              </Card.Title>
            </Card.Header>
            <Card.Content className="p-0">
              <p className="text-xs text-muted">Standardized Form A sessions (140 Items)</p>
            </Card.Content>
          </Card>

          <Card className="rounded-3xl border-border/80 bg-card/75 shadow-xs p-6 space-y-3">
            <Card.Header className="p-0 pb-1">
              <Card.Description className="text-xs font-bold uppercase tracking-wider flex items-center justify-between text-muted">
                <span>Peak Scaled Score</span>
                <Award className="h-5 w-5 text-emerald-500" />
              </Card.Description>
              <Card.Title className="text-4xl font-black font-mono text-emerald-600 dark:text-emerald-400 pt-2">
                {completedAttempts.length > 0 ? (
                  <>
                    {bestScore}{" "}
                    <span className="text-sm font-normal text-muted font-mono">/ 677</span>
                  </>
                ) : (
                  <span className="text-muted font-sans text-3xl font-semibold">—</span>
                )}
              </Card.Title>
            </Card.Header>
            <Card.Content className="p-0">
              <p className="text-xs text-muted">Official scaled score range (310–677)</p>
            </Card.Content>
          </Card>

          <Card className="rounded-3xl border-border/80 bg-card/75 shadow-xs p-6 space-y-3">
            <Card.Header className="p-0 pb-1">
              <Card.Description className="text-xs font-bold uppercase tracking-wider flex items-center justify-between text-muted">
                <span>Peak CEFR Band</span>
                <TrendingUp className="h-5 w-5 text-accent" />
              </Card.Description>
              <Card.Title className="text-4xl font-black font-mono pt-2">
                {completedAttempts.length > 0 ? (
                  completedAttempts[0]?.cefrLevel || "B1"
                ) : (
                  <span className="text-muted font-sans text-3xl font-semibold">—</span>
                )}
              </Card.Title>
            </Card.Header>
            <Card.Content className="p-0">
              <p className="text-xs text-muted">
                {completedAttempts.length > 0
                  ? "Global CEFR competency band"
                  : "No assessments yet"}
              </p>
            </Card.Content>
          </Card>

          <Card className="rounded-3xl border-border/80 bg-card/75 shadow-xs p-6 space-y-3">
            <Card.Header className="p-0 pb-1">
              <Card.Description className="text-xs font-bold uppercase tracking-wider flex items-center justify-between text-muted">
                <span>Mean Scaled Score</span>
                <Clock className="h-5 w-5 text-accent" />
              </Card.Description>
              <Card.Title className="text-4xl font-black font-mono pt-2">
                {completedAttempts.length > 0 ? (
                  <>
                    {avgScore}{" "}
                    <span className="text-sm font-normal text-muted font-mono">/ 677</span>
                  </>
                ) : (
                  <span className="text-muted font-sans text-3xl font-semibold">—</span>
                )}
              </Card.Title>
            </Card.Header>
            <Card.Content className="p-0">
              <p className="text-xs text-muted">Average across all finished sessions</p>
            </Card.Content>
          </Card>
        </div>

        {/* Available Test Package: Expansive */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold tracking-tight text-foreground">
              Active Assessment Instrument
            </h2>
            <Chip
              variant="soft"
              size="sm"
              className="text-xs font-semibold bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 px-3 py-1"
            >
              <CheckCircle2 className="h-3.5 w-3.5 mr-1.5" /> Self-Service Session Ready
            </Chip>
          </div>

          <div className="rounded-3xl border border-border/80 bg-card p-8 sm:p-10 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div className="space-y-3 max-w-3xl">
              <div className="flex flex-wrap items-center gap-3">
                <h3 className="text-xl font-bold text-foreground">
                  Comprehensive TOEFL ITP® Diagnostic Form A
                </h3>
                <Chip variant="soft" className="text-xs font-mono px-3 py-1">
                  140 Items • 115 Full Minutes
                </Chip>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Rigorous testing framework matching official ETS specifications. Encompasses 50
                Listening items with single-playback audio, 40 Structure & Written Expression items,
                and 50 academic Reading Comprehension items.
              </p>

              <div className="flex flex-wrap items-center gap-6 pt-2 text-xs sm:text-sm text-muted-foreground">
                <span className="flex items-center gap-2">
                  <Headphones className="h-4 w-4 text-primary" /> Listening: 35 Min (50 Items)
                </span>
                <span className="flex items-center gap-2">
                  <PenTool className="h-4 w-4 text-primary" /> Structure: 25 Min (40 Items)
                </span>
                <span className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-primary" /> Reading: 55 Min (50 Items)
                </span>
              </div>
            </div>

            <StartTestButton candidateName={displayName} candidateEmail={candidateEmail} />
          </div>
        </div>

        {/* Examination History & Verified Certificates */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold tracking-tight text-foreground">
              Assessment History & Digital Credentials
            </h2>
            <span className="text-xs font-semibold text-muted-foreground">
              {completedAttempts.length} Completed Sessions
            </span>
          </div>

          {completedAttempts.length > 0 ? (
            <div className="rounded-3xl border border-separator bg-surface overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-sm caption-bottom">
                  <thead className="bg-surface-secondary border-b border-separator">
                    <tr>
                      <th className="text-xs font-bold uppercase py-4 px-4 text-left text-muted">
                        Date Conferred
                      </th>
                      <th className="text-xs font-bold uppercase py-4 px-4 text-left text-muted">
                        Certificate ID
                      </th>
                      <th className="text-xs font-bold uppercase text-center py-4 px-4 text-muted">
                        Scaled Score
                      </th>
                      <th className="text-xs font-bold uppercase text-center py-4 px-4 text-muted">
                        CEFR Band
                      </th>
                      <th className="text-xs font-bold uppercase text-center py-4 px-4 text-muted">
                        Sections (L / S / R)
                      </th>
                      <th className="text-xs font-bold uppercase text-right py-4 px-4 text-muted">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {completedAttempts.map((attempt) => {
                      const dateStr = new Date(
                        attempt.submittedAt || attempt.startedAt,
                      ).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      });
                      const certId =
                        attempt.certificates?.certificateNumber ||
                        `LYXIS-2026-${attempt.id.slice(0, 8).toUpperCase()}`;

                      return (
                        <tr
                          key={attempt.id}
                          className="border-b border-separator hover:bg-surface-secondary/50 transition-colors"
                        >
                          <td className="text-sm font-medium text-foreground py-4 px-4">
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4 text-muted" />
                              {dateStr}
                            </div>
                          </td>
                          <td className="text-xs font-mono font-semibold text-muted py-4 px-4">
                            {certId}
                          </td>
                          <td className="text-center py-4 px-4">
                            <span className="font-mono font-black text-base text-foreground">
                              {attempt.totalScaledScore || 310}
                            </span>
                            <span className="text-xs text-muted font-mono"> / 677</span>
                          </td>
                          <td className="text-center py-4 px-4">
                            <Chip
                              variant="soft"
                              size="sm"
                              className="font-bold text-xs bg-accent/5 text-accent border border-accent/20 px-2.5 py-0.5"
                            >
                              {attempt.cefrLevel || "B1"}
                            </Chip>
                          </td>
                          <td className="text-center font-mono text-sm text-muted py-4 px-4">
                            <span className="font-semibold text-foreground">
                              {attempt.scaledListening || 24}
                            </span>
                            {" / "}
                            <span className="font-semibold text-foreground">
                              {attempt.scaledStructure || 20}
                            </span>
                            {" / "}
                            <span className="font-semibold text-foreground">
                              {attempt.scaledReading || 21}
                            </span>
                          </td>
                          <td className="text-right py-4 px-4">
                            <div className="flex items-center justify-end gap-2">
                              <Link
                                href={`/result/${attempt.id}`}
                                className={cn(
                                  buttonVariants({ variant: "outline", size: "sm" }),
                                  "h-9 px-3 gap-1.5 text-xs font-semibold rounded-xl",
                                )}
                              >
                                Dossier Report <ArrowRight className="h-3.5 w-3.5" />
                              </Link>
                              {attempt.verificationToken && (
                                <Link
                                  href={`/verify/${attempt.verificationToken}`}
                                  target="_blank"
                                  className={cn(
                                    buttonVariants({ variant: "ghost", size: "sm" }),
                                    "h-9 w-9 p-0 text-muted hover:text-foreground rounded-xl",
                                  )}
                                  title="Open Public QR Verification Portal"
                                >
                                  <ExternalLink className="h-4 w-4" />
                                </Link>
                              )}
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="rounded-3xl border border-dashed border-border/80 bg-card/40 p-12 text-center flex flex-col items-center justify-center space-y-4">
              <div className="h-14 w-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
                <FileText className="h-7 w-7" />
              </div>
              <div className="space-y-1.5">
                <h3 className="text-lg font-bold text-foreground">No Assessment Records Yet</h3>
                <p className="text-sm text-muted-foreground max-w-lg mx-auto">
                  You have not yet completed a test session. Launch the 140-item diagnostic
                  benchmark to identify skill gaps, predict your official scaled score, and receive
                  your digital credential.
                </p>
              </div>
              <StartTestButton candidateName={displayName} candidateEmail={candidateEmail} />
            </div>
          )}
        </div>
      </main>

      {/* Footer: Expansive & Clean */}
      <footer className="border-t border-border/40 bg-muted/20 py-8 px-6 sm:px-10 mt-16 text-xs text-muted-foreground text-center">
        <p className="font-medium text-foreground">
          Lyxis — CBT Platform for TOEFL ITP® Prediction
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          Standardized Diagnostic Examination Environment • Candidate Portal
        </p>
      </footer>
    </div>
  );
}

export default function CandidateDashboardPage() {
  return (
    <Suspense
      fallback={
        <div className="flex h-screen w-full items-center justify-center">
          <div className="h-10 w-10 animate-spin rounded-full border-3 border-primary border-t-transparent" />
        </div>
      }
    >
      <DashboardContent />
    </Suspense>
  );
}
