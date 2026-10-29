import { CheckCircle2, ExternalLink, ShieldAlert, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { NextLogo } from "@/components/shared/next-logo";

interface CertificateProps {
  certificateNumber: string;
  candidateName: string;
  totalScore: number;
  cefrLevel: string;
  issuedAt: string;
  securityHash: string;
  verificationToken: string;
}

export function Certificate({
  certificateNumber,
  candidateName,
  totalScore,
  cefrLevel,
  issuedAt,
  securityHash,
  verificationToken,
}: CertificateProps) {
  const formattedDate = new Date(issuedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const isGraduationQualified = totalScore >= 450;

  return (
    <div className="rounded-2xl border-2 border-primary/20 bg-card p-8 sm:p-12 shadow-xl relative overflow-hidden print:border-black print:shadow-none selection:bg-primary/20">
      <div className="flex flex-col items-center text-center space-y-6 relative z-10">
        {/* Official The Calibration Keystone Seal */}
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-primary-foreground border border-border p-3.5 shadow-xl shadow-primary/20 ring-1 ring-white/10">
          <NextLogo className="w-full h-full" />
        </div>

        <div className="space-y-1">
          <div className="flex items-center justify-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-primary">
            <ShieldCheck className="h-4 w-4" /> Official Standardized Evaluation
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold tracking-tight text-foreground uppercase">
            Certificate of Diagnostic Proficiency
          </h2>
          <p className="text-xs text-muted-foreground font-mono">
            Credential Identification: {certificateNumber}
          </p>
        </div>

        <div className="w-16 h-0.5 bg-primary/40 rounded-full" />

        <div className="space-y-2">
          <p className="text-xs uppercase tracking-wider text-muted-foreground font-mono">
            This verified diagnostic record is officially awarded to
          </p>
          <h3 className="text-2xl sm:text-4xl font-serif font-bold tracking-tight text-foreground italic">
            {candidateName}
          </h3>
        </div>

        <div className="max-w-xl text-xs sm:text-sm text-foreground/80 leading-relaxed font-serif">
          for successfully undertaking the standardized 140-item computer-based diagnostic
          evaluation conforming to ETS TOEFL ITP® Level 1 psychometric scaling parameters across
          Listening Comprehension, Structure & Written Expression, and Reading Comprehension.
        </div>

        {/* Highlight Score & CEFR Pill */}
        <div className="rounded-xl border border-primary/20 bg-primary/5 p-4 sm:p-6 flex flex-wrap items-center justify-center gap-8 text-center">
          <div>
            <div className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider font-mono">
              Total Scaled Score
            </div>
            <div className="text-3xl sm:text-4xl font-black font-mono text-primary mt-0.5">
              {totalScore}{" "}
              <span className="text-xs font-normal text-muted-foreground font-mono">/ 677</span>
            </div>
          </div>

          <div className="h-10 w-px bg-border/60 hidden sm:block" />

          <div>
            <div className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider font-mono">
              CEFR Benchmark
            </div>
            <div className="text-3xl sm:text-4xl font-black font-mono text-foreground mt-0.5">
              Level {cefrLevel}
            </div>
          </div>
        </div>

        {/* Institutional Graduation Benchmark Indicator */}
        <div
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono font-bold tracking-wide border ${
            isGraduationQualified
              ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
              : "bg-red-500/10 text-red-400 border-red-500/30"
          }`}
        >
          {isGraduationQualified ? (
            <>
              <CheckCircle2 className="h-4 w-4 text-emerald-400" />
              <span>PASSING THRESHOLD: 450 • STATUS: QUALIFIED FOR GRADUATION</span>
            </>
          ) : (
            <>
              <ShieldAlert className="h-4 w-4 text-red-400" />
              <span>PASSING THRESHOLD: 450 • STATUS: BELOW GRADUATION THRESHOLD</span>
            </>
          )}
        </div>

        {/* Verification & Security Footer */}
        <div className="w-full pt-6 border-t border-border/40 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <div className="text-center sm:text-left space-y-0.5">
            <div>
              Date Conferred: <span className="font-semibold text-foreground">{formattedDate}</span>
            </div>
            <div className="font-mono text-[10px] break-all max-w-md">
              Digital Security Hash: {securityHash.slice(0, 24)}... (HMAC-SHA256)
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3">
            <Link
              href={`/verify/${verificationToken}`}
              className="inline-flex items-center gap-1.5 font-semibold text-primary hover:underline text-xs"
            >
              <ExternalLink className="h-3.5 w-3.5" /> Verify Public Credential
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
