import { DataTable } from "../_components/data-table";
import { Button, Chip } from "@heroui/react";
import { DownloadIcon, ShieldCheckIcon, UsersIcon } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import type { ExamAttempt } from "@/types";
import { redirect } from "next/navigation";

export default async function AttemptsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login?next=/admin/attempts");
  }

  let attempts: ExamAttempt[] = [];

  try {
    const { data } = await supabase
      .from("exam_attempts")
      .select("*")
      .order("startedAt", { ascending: false });
    if (data) {
      attempts = data;
    }
  } catch (error) {
    console.warn("Notice: Error fetching attempts:", error);
  }

  const tableData = attempts.map((a, index) => ({
    id: index + 1,
    attemptId: a.id,
    header: a.candidateName || "Candidate",
    type: "Form A (140 Items)",
    status: a.status === "SUBMITTED" ? "Done" : "In Process",
    target: a.totalScaledScore ? String(a.totalScaledScore) : "—",
    limit:
      a.tabSwitchCount === 0
        ? "0 blurs"
        : `${a.tabSwitchCount} blur${(a.tabSwitchCount ?? 0) > 1 ? "s" : ""}`,
    reviewer: a.cefrLevel ? `CEFR ${a.cefrLevel}` : "Pending Evaluation",
  }));

  const submitted = attempts.filter((a) => a.status === "SUBMITTED" && a.totalScaledScore);
  const cleanCount = attempts.filter((a) => (a.tabSwitchCount ?? 0) === 0).length;
  const zeroViolationRate =
    attempts.length > 0 ? `${((cleanCount / attempts.length) * 100).toFixed(1)}%` : "100%";

  const scores = submitted.map((a) => a.totalScaledScore as number);
  const minScore = scores.length > 0 ? Math.min(...scores) : 0;
  const maxScore = scores.length > 0 ? Math.max(...scores) : 0;
  const scoreRange = scores.length > 0 ? `${minScore} – ${maxScore}` : "—";

  return (
    <div className="flex flex-1 flex-col gap-6 p-4 md:p-6">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Candidate Attempts & Proctoring Audit
          </h1>
          <p className="text-sm text-muted-foreground">
            Complete telemetry logs of all candidate assessment sessions, ETS scaled scores, CEFR
            levels, and anti-cheat blur events.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Chip variant="soft" size="sm" className="gap-1 border border-primary/30">
            <ShieldCheckIcon className="size-3.5 text-primary" />
            ISO/IEC 23988:2007 Audit Trail
          </Chip>
          <Button variant="outline" size="sm">
            <DownloadIcon className="mr-1.5 size-3.5" />
            Export Audit CSV
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-lg border bg-card p-4">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <UsersIcon className="size-4" />
            Total Evaluation Attempts
          </div>
          <div className="mt-2 text-2xl font-bold">{attempts.length} records</div>
          <p className="mt-1 text-xs text-muted-foreground">Standardized 140-item benchmark</p>
        </div>
        <div className="rounded-lg border bg-card p-4">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <ShieldCheckIcon className="size-4 text-emerald-500" />
            Zero-Violation Rate
          </div>
          <div className="mt-2 text-2xl font-bold text-emerald-600 dark:text-emerald-400">
            {zeroViolationRate}
          </div>
          <p className="mt-1 text-xs text-muted-foreground">No window blur or tab-switch events</p>
        </div>
        <div className="rounded-lg border bg-card p-4">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Chip variant="soft" className="text-[10px]">
              CEFR Standard
            </Chip>
            Score Range in Cohort
          </div>
          <div className="mt-2 text-2xl font-bold">{scoreRange}</div>
          <p className="mt-1 text-xs text-muted-foreground">Min / Max ETS Scaled Total</p>
        </div>
      </div>

      <div className="space-y-2">
        <h2 className="text-base font-semibold">Assessment Telemetry Registry</h2>
        <DataTable data={tableData} />
      </div>
    </div>
  );
}
