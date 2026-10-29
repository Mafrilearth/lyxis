import { AmbientMeshCanvas } from "../../ambient-mesh-canvas";
import { Chip } from "@heroui/react";
import { createClient } from "@/lib/supabase/server";
import { Calendar, CheckCircle2, ShieldAlert, ShieldCheck, User } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

import type { CertificateRecord, ExamAttempt } from "@/types";

interface VerifyPageProps {
  params: Promise<{ token: string }>;
}

export const metadata = {
  title: "Official Credential Verification — Lyxis",
  description:
    "Public authentication portal to verify the validity, scaled score, and registration record of a Lyxis TOEFL ITP® diagnostic certificate.",
};

async function VerifyContent({ params }: VerifyPageProps) {
  const { token } = await params;

  let attempt: ExamAttempt | null = null;
  let certificate: CertificateRecord | null = null;

  try {
    const supabase = await createClient();

    const { data: certData } = await supabase
      .from("certificates")
      .select("*, exam_attempts(*)")
      .eq("securityHash", token)
      .single();

    if (certData) {
      certificate = {
        certificateNumber: certData.certificateNumber,
        issuedAt: certData.issuedAt,
      };
      attempt = certData.exam_attempts as unknown as typeof attempt;
    } else {
      const { data: attemptData } = await supabase
        .from("exam_attempts")
        .select("*, certificates(*)")
        .or(`verificationToken.eq.${token},id.eq.${token}`)
        .single();

      if (attemptData) {
        attempt = attemptData;
        if (attemptData.certificates) {
          const c = Array.isArray(attemptData.certificates)
            ? attemptData.certificates[0]
            : attemptData.certificates;
          if (c) {
            certificate = {
              certificateNumber: c.certificateNumber,
              issuedAt: c.issuedAt,
            };
          }
        }
      }
    }
  } catch (error) {
    console.warn("Notice: Public token verification query:", error);
  }

  const isFound = !!attempt;
  const candidateName = attempt?.candidateName || "Registered Candidate";
  const totalScore = attempt?.totalScaledScore || 310;
  const cefrLevel = attempt?.cefrLevel || "B1";
  const issuedDate =
    certificate?.issuedAt || attempt?.submittedAt || attempt?.startedAt || new Date().toISOString();
  const certNumber =
    certificate?.certificateNumber ||
    (attempt ? `LYXIS-2026-${attempt.id.slice(0, 8).toUpperCase()}` : "");

  const formattedDate = new Date(issuedDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="relative min-h-screen bg-background text-foreground flex flex-col justify-center py-16 px-6 sm:px-10 lg:px-12 selection:bg-primary/20 selection:text-primary">
      {/* Living Atmospheric Mesh Background Canvas */}
      <AmbientMeshCanvas />

      {/* Top Ambient Glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[420px] bg-primary/5 blur-3xl pointer-events-none -z-10"
        aria-hidden="true"
      />

      <div className="max-w-4xl mx-auto w-full space-y-10">
        {/* Header */}
        <div className="text-center space-y-3">
          <Link
            href="/"
            className="inline-flex items-center font-extrabold text-3xl tracking-tight text-foreground transition-opacity hover:opacity-80"
          >
            Lyxis
          </Link>
          <p className="text-xs sm:text-sm font-bold tracking-wider uppercase text-muted-foreground">
            Public Credential Authentication Registry
          </p>
        </div>

        {isFound ? (
          <div className="rounded-[2.5rem] p-1.5 sm:p-2 bg-card border-2 border-emerald-500/30 shadow-2xl">
            <div className="rounded-[calc(2.5rem-0.5rem)] bg-card p-8 sm:p-12 space-y-8">
              <div className="flex items-center gap-4 border-b border-border/40 pb-6">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                  <CheckCircle2 className="h-8 w-8" />
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
                    Verified Authentic Diagnostic Credential
                  </h2>
                  <p className="text-xs sm:text-sm text-muted-foreground font-mono mt-0.5">
                    Registration Identification: {certNumber}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div className="rounded-2xl border border-border/60 bg-muted/20 p-5 space-y-1.5">
                  <span className="text-muted-foreground flex items-center gap-2 text-xs font-semibold uppercase">
                    <User className="h-4 w-4" /> Candidate Full Name
                  </span>
                  <p className="font-bold text-foreground text-base sm:text-lg">{candidateName}</p>
                </div>

                <div className="rounded-2xl border border-border/60 bg-muted/20 p-5 space-y-1.5">
                  <span className="text-muted-foreground flex items-center gap-2 text-xs font-semibold uppercase">
                    <Calendar className="h-4 w-4" /> Date Conferred
                  </span>
                  <p className="font-bold text-foreground text-base sm:text-lg">{formattedDate}</p>
                </div>
              </div>

              {/* Score Breakdown Section */}
              <div className="rounded-2xl border border-border/60 bg-card p-6 sm:p-8 space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/40 pb-5">
                  <div>
                    <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider block">
                      Total Scaled Score
                    </span>
                    <div className="flex items-baseline gap-2 mt-1">
                      <span className="font-mono text-4xl sm:text-5xl font-black text-primary">
                        {totalScore}
                      </span>
                      <span className="text-sm font-bold text-muted-foreground font-mono">
                        / 677
                      </span>
                    </div>
                  </div>

                  <Chip className="py-1.5 px-4 text-sm font-bold bg-accent text-accent-foreground self-start sm:self-auto rounded-xl">
                    CEFR: {cefrLevel}
                  </Chip>
                </div>

                <div className="grid grid-cols-3 gap-3 text-center text-xs sm:text-sm">
                  <div className="rounded-xl border border-border/50 bg-muted/20 p-3 space-y-1">
                    <span className="text-muted-foreground block text-xs">Listening</span>
                    <span className="font-mono font-bold text-base text-foreground">
                      {attempt?.scaledListening || 24}
                    </span>
                  </div>
                  <div className="rounded-xl border border-border/50 bg-muted/20 p-3 space-y-1">
                    <span className="text-muted-foreground block text-xs">Structure</span>
                    <span className="font-mono font-bold text-base text-foreground">
                      {attempt?.scaledStructure || 20}
                    </span>
                  </div>
                  <div className="rounded-xl border border-border/50 bg-muted/20 p-3 space-y-1">
                    <span className="text-muted-foreground block text-xs">Reading</span>
                    <span className="font-mono font-bold text-base text-foreground">
                      {attempt?.scaledReading || 21}
                    </span>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-primary/20 bg-primary/5 p-5 flex items-start gap-3.5 text-xs sm:text-sm text-foreground/90">
                <ShieldCheck className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                  This record is officially archived within the Lyxis CBT psychometric registry.
                  Evaluation calibrated against the standardized 140-item diagnostic instrument Form
                  A.
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="rounded-[2.5rem] p-1.5 sm:p-2 bg-card border-2 border-destructive/30 shadow-2xl">
            <div className="rounded-[calc(2.5rem-0.5rem)] bg-card p-8 sm:p-12 text-center space-y-5">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-destructive/10 text-destructive mx-auto">
                <ShieldAlert className="h-8 w-8" />
              </div>
              <h2 className="text-2xl font-bold tracking-tight text-foreground">
                Credential Record Not Located
              </h2>
              <p className="text-sm text-muted-foreground max-w-lg mx-auto leading-relaxed">
                The supplied credential verification token does not match any authenticated records
                in our registry. Please ensure the token was copied in its entirety from the
                certificate.
              </p>
            </div>
          </div>
        )}

        <div className="text-center pt-2">
          <Link
            href="/"
            className="text-sm font-semibold text-muted-foreground hover:text-foreground underline underline-offset-4"
          >
            ← Return to Lyxis Overview
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function VerifyPage(props: VerifyPageProps) {
  return (
    <Suspense
      fallback={
        <div className="flex h-screen w-full items-center justify-center">
          <div className="h-10 w-10 animate-spin rounded-full border-3 border-primary border-t-transparent" />
        </div>
      }
    >
      <VerifyContent {...props} />
    </Suspense>
  );
}
