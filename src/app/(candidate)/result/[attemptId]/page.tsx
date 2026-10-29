import { Certificate } from "./_components/certificate";
import { PrintButton } from "./_components/print-button";
import { CompetencyRadarChart } from "./_components/radar-chart";
import { ScoreCard } from "./_components/score-card";
import { SectionBreakdown } from "./_components/section-breakdown";
import { buttonVariants } from "@heroui/styles";
import type { CefrLevel } from "@/lib/psychometrics/scoring-engine";
import { generateCertificateSignature } from "@/lib/psychometrics/security";
import { createClient } from "@/lib/supabase/server";
import { cn } from "@/lib/utils";
import { AlertCircle, ArrowLeft, Loader2, Sparkles } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import type { CertificateRecord, ExamAttempt } from "@/types";

export const dynamic = "force-dynamic";

interface ResultPageProps {
  params: Promise<{ attemptId: string }>;
}

export async function generateMetadata({ params }: ResultPageProps): Promise<Metadata> {
  const { attemptId } = await params;
  return {
    title: `Diagnostic Score Report (${attemptId.slice(0, 8)}) | Lyxis`,
    description: "Computer-Based Testing diagnostic evaluation results and certificate dossier.",
    robots: {
      index: false,
      follow: false,
      nocache: true,
    },
  };
}

async function ResultContent({ params }: ResultPageProps) {
  const { attemptId } = await params;

  let attempt: ExamAttempt | null = null;
  let certificate: CertificateRecord | null = null;

  try {
    const supabase = await createClient();
    const { data: attemptData } = await supabase
      .from("exam_attempts")
      .select("*")
      .eq("id", attemptId)
      .single();

    if (attemptData) {
      attempt = attemptData;
      const { data: certData } = await supabase
        .from("certificates")
        .select("*")
        .eq("attemptId", attemptId)
        .single();
      if (certData) {
        certificate = certData;
      }
    } else if (attemptId === "demo" || attemptId === "sample") {
      attempt = {
        id: attemptId,
        candidateName: "Muhammad Fakhri",
        candidateEmail: "fakhri@candidate.lyxis.internal",
        status: "SUBMITTED",
        startedAt: new Date(Date.now() - 115 * 60 * 1000).toISOString(),
        totalScaledScore: 583,
        cefrLevel: "B2",
        rawListening: 41,
        scaledListening: 59,
        rawStructure: 33,
        scaledStructure: 57,
        rawReading: 43,
        scaledReading: 59,
        tabSwitchCount: 0,
        verificationToken: "DEMO-VERIFY-2026",
        submittedAt: new Date().toISOString(),
      };
      certificate = {
        id: "cert-demo",
        certificateNumber: "LYXIS-2026-DEMO-583",
        candidateName: "Muhammad Fakhri",
        totalScore: 583,
        cefrLevel: "B2",
        issuedAt: new Date().toISOString(),
        securityHash: "8b7e2c91a4f0d3e5b6c8a2f1e4d7c0b9a3f2e1d0c9b8a7f6e5d4c3b2a1f0e9d8",
      };
    }
  } catch (error) {
    console.warn("Using resilient client evaluation for result presentation:", error);
  }

  if (!attempt) {
    return (
      <div className="min-h-screen bg-background text-foreground flex flex-col justify-center items-center py-16 px-6">
        <div className="max-w-md w-full text-center space-y-5">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-destructive/10 text-destructive mx-auto">
            <AlertCircle className="h-8 w-8" />
          </div>
          <h2 className="text-2xl font-bold">Assessment Record Not Found</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            The requested assessment session could not be located or has not yet been submitted.
            Please verify the session identifier from your candidate command center.
          </p>
          <div className="pt-2">
            <Link
              href="/dashboard"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "gap-2 text-sm font-semibold rounded-2xl",
              )}
            >
              <ArrowLeft className="h-4 w-4" /> Return to Candidate Portal
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const candidateName = attempt.candidateName || "Candidate";
  const totalScore = attempt.totalScaledScore || 310;
  const cefrLevel: CefrLevel = (attempt.cefrLevel as CefrLevel) || "A2";
  const rawListening = attempt.rawListening ?? 0;
  const scaledListening = attempt.scaledListening ?? 24;
  const rawStructure = attempt.rawStructure ?? 0;
  const scaledStructure = attempt.scaledStructure ?? 20;
  const rawReading = attempt.rawReading ?? 0;
  const scaledReading = attempt.scaledReading ?? 21;
  const verificationToken = attempt.verificationToken || attemptId;
  const issuedAt = certificate?.issuedAt || attempt.submittedAt || new Date().toISOString();
  const certNumber =
    certificate?.certificateNumber ||
    `LYXIS-${new Date().getFullYear()}-${attemptId.slice(0, 8).toUpperCase()}`;

  const securityHash =
    certificate?.securityHash ||
    generateCertificateSignature({
      attemptId,
      candidateName,
      totalScore,
      cefrLevel,
      issuedAt,
    });

  return (
    <div className="relative min-h-screen bg-background text-foreground flex flex-col py-10 sm:py-16 px-6 sm:px-10 lg:px-12 selection:bg-primary/20 selection:text-primary">
      {/* Top Ambient Glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[420px] bg-primary/5 blur-3xl pointer-events-none -z-10"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto w-full space-y-12">
        {/* Top Navigation: Spacious & Clean */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/40 pb-6 print:hidden">
          <div className="flex items-center gap-6">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-4 w-4" /> Home
            </Link>
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:text-primary/80 transition-colors"
            >
              Candidate Portal →
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <PrintButton />
          </div>
        </div>

        {/* Section 1: Score Overview Card */}
        <ScoreCard totalScore={totalScore} cefrLevel={cefrLevel} candidateName={candidateName} />

        {/* Section 2: Sectional Breakdown & Psychometric Competency Radar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7">
            <SectionBreakdown
              listening={{ raw: rawListening, scaled: scaledListening }}
              structure={{ raw: rawStructure, scaled: scaledStructure }}
              reading={{ raw: rawReading, scaled: scaledReading }}
            />
          </div>
          <div className="lg:col-span-5 rounded-[2.5rem] border border-border/80 bg-card p-8 sm:p-10 shadow-lg space-y-6">
            <div className="border-b border-border/40 pb-4 flex items-center justify-between">
              <h3 className="font-bold text-base tracking-tight uppercase text-foreground flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" /> Competency Profile Radar
              </h3>
              <span className="text-xs font-mono text-muted-foreground">
                5-Domain Normalization
              </span>
            </div>
            <CompetencyRadarChart
              listeningScore={scaledListening}
              structureScore={scaledStructure}
              readingScore={scaledReading}
            />
          </div>
        </div>

        {/* Section 3: Digital Verifiable Certificate */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold tracking-tight text-foreground">
              Official Digital Credential Dossier
            </h3>
            <span className="text-xs text-muted-foreground font-mono">System Authenticated</span>
          </div>

          <Certificate
            certificateNumber={certNumber}
            candidateName={candidateName}
            totalScore={totalScore}
            cefrLevel={cefrLevel}
            issuedAt={issuedAt}
            securityHash={securityHash}
            verificationToken={verificationToken}
          />
        </div>
      </div>
    </div>
  );
}

export default function ResultPage(props: ResultPageProps) {
  return (
    <Suspense
      fallback={
        <div className="flex h-screen w-full items-center justify-center">
          <Loader2 className="h-10 w-10 animate-spin text-primary" />
        </div>
      }
    >
      <ResultContent {...props} />
    </Suspense>
  );
}
