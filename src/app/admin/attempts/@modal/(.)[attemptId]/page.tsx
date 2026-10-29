import { Card, Chip } from "@heroui/react";
import { buttonVariants } from "@heroui/styles";
import { createClient } from "@/lib/supabase/server";
import { ArrowLeft, ExternalLink, ShieldCheck, User } from "lucide-react";
import type { Route } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

interface ModalAttemptProps {
  params: Promise<{ attemptId: string }>;
}

export default async function InterceptedAttemptModal({ params }: ModalAttemptProps) {
  const { attemptId } = await params;
  const supabase = await createClient();

  const { data: attempt } = await supabase
    .from("exam_attempts")
    .select("*")
    .eq("id", attemptId)
    .single();

  if (!attempt) {
    notFound();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <Card className="max-w-xl w-full border border-border bg-surface p-6 shadow-2xl space-y-6 relative rounded-2xl">
        <div className="flex items-center justify-between border-b border-border pb-4">
          <div className="flex items-center gap-2">
            <Chip size="sm" variant="soft" className="text-[10px] text-primary">
              Intercepted: (.)[attemptId]
            </Chip>
            <span className="text-xs font-mono text-muted-foreground truncate max-w-[200px]">
              {attempt.id}
            </span>
          </div>
          <Link
            href={"/admin/attempts" as Route}
            className={buttonVariants({ variant: "ghost", size: "sm" })}
          >
            <ArrowLeft className="size-3.5 mr-1" /> Close Modal
          </Link>
        </div>

        <div className="space-y-4">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-xl font-bold flex items-center gap-2">
                <User className="size-5 text-primary" />
                {attempt.candidateName || "Candidate"}
              </h2>
              <p className="text-xs text-muted-foreground">{attempt.candidateEmail}</p>
            </div>
            <Chip
              size="sm"
              variant="soft"
              className={attempt.status === "SUBMITTED" ? "text-emerald-500" : "text-amber-500"}
            >
              {attempt.status}
            </Chip>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-2">
            <div className="border border-border rounded-xl p-3 bg-background">
              <span className="text-[10px] uppercase font-bold text-muted-foreground">
                Total Scaled Score
              </span>
              <p className="text-2xl font-mono font-black text-primary">
                {attempt.totalScaledScore || "—"}
              </p>
            </div>
            <div className="border border-border rounded-xl p-3 bg-background">
              <span className="text-[10px] uppercase font-bold text-muted-foreground">
                CEFR Benchmark
              </span>
              <p className="text-2xl font-mono font-black text-foreground">
                {attempt.cefrLevel || "Pending"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs text-muted-foreground border-t border-border pt-4">
            <ShieldCheck className="size-4 text-emerald-500" />
            <span>Anti-cheat sensor blur violations: </span>
            <span className="font-mono font-bold text-foreground">
              {attempt.tabSwitchCount ?? 0}
            </span>
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-2 border-t border-border">
          <Link
            href={`/admin/attempts/${attemptId}` as Route}
            className={buttonVariants({ variant: "primary", size: "sm" })}
          >
            <ExternalLink className="size-3.5 mr-1.5" /> Full Audit Record
          </Link>
        </div>
      </Card>
    </div>
  );
}
