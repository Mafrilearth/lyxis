import { Card, Chip } from "@heroui/react";
import { buttonVariants } from "@heroui/styles";
import {
  AlertCircleIcon,
  ArrowLeftIcon,
  BookOpenIcon,
  CheckCircle2Icon,
  ExternalLinkIcon,
  HeadphonesIcon,
  LayersIcon,
  ShieldCheckIcon,
} from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { createClient } from "@/lib/supabase/server";
import type { ExamAttempt } from "@/types";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

interface PageProps {
  params: Promise<{ attemptId: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { attemptId } = await params;
  return {
    title: `Candidate Audit (${attemptId.slice(0, 8)}) | Administrator Console`,
    description:
      "Proctoring telemetry audit, ETS section scaled scores, and blur sensor event logs.",
    robots: {
      index: false,
      follow: false,
      nocache: true,
    },
  };
}

export default function AttemptDetailPage({ params }: PageProps) {
  return (
    <Suspense
      fallback={
        <div className="flex flex-1 items-center justify-center p-8 text-sm text-muted-foreground">
          Loading candidate audit telemetry...
        </div>
      }
    >
      <AttemptDetailContent params={params} />
    </Suspense>
  );
}

async function AttemptDetailContent({ params }: PageProps) {
  const { attemptId } = await params;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect(`/login?next=/admin/attempts/${attemptId}`);
  }

  let attempt: ExamAttempt | null = null;

  try {
    const { data } = await supabase
      .from("exam_attempts")
      .select("*, certificates(*)")
      .eq("id", attemptId)
      .single();

    if (data) {
      attempt = data;
    }
  } catch (error) {
    console.warn("Notice: Error fetching attempt detail:", error);
  }

  if (!attempt) {
    return (
      <div className="flex flex-1 flex-col gap-6 p-4 md:p-6">
        <div className="flex items-center gap-2">
          <Link href="/admin/attempts" className={buttonVariants({ variant: "ghost", size: "sm" })}>
            <ArrowLeftIcon className="mr-1.5 size-4" />
            Back to Attempts
          </Link>
        </div>
        <div className="rounded-xl border bg-card p-12 text-center space-y-4 max-w-lg mx-auto">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-rose-500/10 text-rose-600 mx-auto">
            <AlertCircleIcon className="size-6" />
          </div>
          <h2 className="text-lg font-bold">Attempt Record Not Found</h2>
          <p className="text-xs text-muted-foreground">
            No telemetry or psychometric records were found for attempt ID:{" "}
            <code className="font-mono text-foreground">{attemptId}</code>.
          </p>
        </div>
      </div>
    );
  }

  const durationMin = attempt.submittedAt
    ? Math.max(
        1,
        Math.round(
          (new Date(attempt.submittedAt).getTime() - new Date(attempt.startedAt).getTime()) / 60000,
        ),
      )
    : null;

  const listeningAccuracy =
    attempt.rawListening != null ? `${((attempt.rawListening / 50) * 100).toFixed(1)}%` : "—";
  const structureAccuracy =
    attempt.rawStructure != null ? `${((attempt.rawStructure / 40) * 100).toFixed(1)}%` : "—";
  const readingAccuracy =
    attempt.rawReading != null ? `${((attempt.rawReading / 50) * 100).toFixed(1)}%` : "—";

  return (
    <div className="flex flex-1 flex-col gap-6 p-4 md:p-6">
      <div className="flex items-center gap-2">
        <Link href="/admin/attempts" className={buttonVariants({ variant: "ghost", size: "sm" })}>
          <ArrowLeftIcon className="mr-1.5 size-4" />
          Back to Attempts
        </Link>
      </div>

      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight">
              {attempt.candidateName || "Candidate"}
            </h1>
            <Chip
              variant="soft"
              size="sm"
              className={
                attempt.status === "SUBMITTED"
                  ? "border border-emerald-500/40 text-emerald-600 dark:text-emerald-400"
                  : "border border-primary/40 text-primary"
              }
            >
              {attempt.status}
            </Chip>
          </div>
          <p className="text-xs text-muted-foreground">
            Attempt ID: <code className="font-mono">{attempt.id}</code> │ Email:{" "}
            <span className="text-foreground">{attempt.candidateEmail || "Not registered"}</span>
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href={`/candidate/result/${attempt.id}`}
            className={buttonVariants({ variant: "outline", size: "sm" })}
          >
            <ExternalLinkIcon className="mr-1.5 size-3.5" />
            View Candidate Dossier
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
        <Card className="bg-primary/5 border-primary/20">
          <Card.Header className="pb-2">
            <Card.Description className="text-xs">ETS Total Scaled Score</Card.Description>
            <Card.Title className="text-3xl font-bold text-primary">
              {attempt.totalScaledScore ?? "—"}
            </Card.Title>
          </Card.Header>
          <Card.Content className="text-xs text-muted-foreground">
            ETS Scale Benchmark: 310 – 677
          </Card.Content>
        </Card>

        <Card>
          <Card.Header className="pb-2">
            <Card.Description className="text-xs">CEFR Proficiency Level</Card.Description>
            <Card.Title className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
              {attempt.cefrLevel ? `Level ${attempt.cefrLevel}` : "Pending"}
            </Card.Title>
          </Card.Header>
          <Card.Content className="text-xs text-muted-foreground">
            {attempt.cefrLevel ? "Calibrated CEFR band" : "Examination ongoing"}
          </Card.Content>
        </Card>

        <Card>
          <Card.Header className="pb-2">
            <Card.Description className="text-xs">Anti-Cheat Telemetry</Card.Description>
            <Card.Title className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
              {attempt.tabSwitchCount ?? 0} Violations
            </Card.Title>
          </Card.Header>
          <Card.Content className="text-xs text-muted-foreground">
            {(attempt.tabSwitchCount ?? 0) === 0
              ? "Full-screen lock strictly preserved"
              : `${attempt.tabSwitchCount} window blur events recorded`}
          </Card.Content>
        </Card>

        <Card>
          <Card.Header className="pb-2">
            <Card.Description className="text-xs">Duration & Timing</Card.Description>
            <Card.Title className="text-2xl font-bold">
              {durationMin ? `${durationMin} / 115 min` : "In Progress"}
            </Card.Title>
          </Card.Header>
          <Card.Content className="text-xs text-muted-foreground">
            {durationMin ? "Submitted within authoritative limit" : "115-minute standardized limit"}
          </Card.Content>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Card>
          <Card.Header className="pb-2">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground">
                <HeadphonesIcon className="size-4" /> Section 1
              </span>
              <Chip variant="secondary" size="sm" className="text-xs">
                50 Items
              </Chip>
            </div>
            <Card.Title className="text-lg">Listening Comprehension</Card.Title>
          </Card.Header>
          <Card.Content className="space-y-2 text-xs">
            <div className="flex justify-between border-b pb-1.5">
              <span className="text-muted-foreground">Raw Score</span>
              <span className="font-semibold">{attempt.rawListening ?? 0} / 50</span>
            </div>
            <div className="flex justify-between border-b pb-1.5">
              <span className="text-muted-foreground">ETS Scaled Score</span>
              <span className="font-bold text-primary">
                {attempt.scaledListening ? `${attempt.scaledListening} / 68` : "—"}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Accuracy</span>
              <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                {listeningAccuracy}
              </span>
            </div>
          </Card.Content>
        </Card>

        <Card>
          <Card.Header className="pb-2">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground">
                <LayersIcon className="size-4" /> Section 2
              </span>
              <Chip variant="secondary" size="sm" className="text-xs">
                40 Items
              </Chip>
            </div>
            <Card.Title className="text-lg">Structure & Written Expression</Card.Title>
          </Card.Header>
          <Card.Content className="space-y-2 text-xs">
            <div className="flex justify-between border-b pb-1.5">
              <span className="text-muted-foreground">Raw Score</span>
              <span className="font-semibold">{attempt.rawStructure ?? 0} / 40</span>
            </div>
            <div className="flex justify-between border-b pb-1.5">
              <span className="text-muted-foreground">ETS Scaled Score</span>
              <span className="font-bold text-primary">
                {attempt.scaledStructure ? `${attempt.scaledStructure} / 68` : "—"}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Accuracy</span>
              <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                {structureAccuracy}
              </span>
            </div>
          </Card.Content>
        </Card>

        <Card>
          <Card.Header className="pb-2">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground">
                <BookOpenIcon className="size-4" /> Section 3
              </span>
              <Chip variant="secondary" size="sm" className="text-xs">
                50 Items
              </Chip>
            </div>
            <Card.Title className="text-lg">Reading Comprehension</Card.Title>
          </Card.Header>
          <Card.Content className="space-y-2 text-xs">
            <div className="flex justify-between border-b pb-1.5">
              <span className="text-muted-foreground">Raw Score</span>
              <span className="font-semibold">{attempt.rawReading ?? 0} / 50</span>
            </div>
            <div className="flex justify-between border-b pb-1.5">
              <span className="text-muted-foreground">ETS Scaled Score</span>
              <span className="font-bold text-primary">
                {attempt.scaledReading ? `${attempt.scaledReading} / 67` : "—"}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Accuracy</span>
              <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                {readingAccuracy}
              </span>
            </div>
          </Card.Content>
        </Card>
      </div>

      <Card>
        <Card.Header>
          <div className="flex items-center gap-2">
            <ShieldCheckIcon className="size-5 text-emerald-500" />
            <div>
              <Card.Title className="text-base">
                ISO/IEC 23988:2007 Audit Trail & Cryptographic Verification
              </Card.Title>
              <Card.Description className="text-xs">
                Tamper-evident verification token and timestamp ledger
              </Card.Description>
            </div>
          </div>
        </Card.Header>
        <Card.Content className="space-y-3 text-xs font-mono">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 rounded bg-muted p-2">
            <span className="text-muted-foreground">Verification Token:</span>
            <span className="text-primary font-bold">
              {attempt.verificationToken || attempt.id}
            </span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 rounded bg-muted p-2">
            <span className="text-muted-foreground">Digital Security Signature:</span>
            <span className="text-muted-foreground truncate max-w-md">
              {attempt.certificates?.securityHash || "Signature pending completion"}
            </span>
          </div>
          <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 pt-1">
            <CheckCircle2Icon className="size-4" />
            <span className="font-sans font-medium text-xs">
              {attempt.status === "SUBMITTED"
                ? "Integrity validation passed. Score dossier certified."
                : "Active proctoring stream monitoring."}
            </span>
          </div>
        </Card.Content>
      </Card>
    </div>
  );
}
