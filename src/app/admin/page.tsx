import { ChartAreaInteractive } from "./chart-area-interactive";
import { DataTable } from "./data-table";
import { SectionCards } from "./section-cards";
import { createClient } from "@/lib/supabase/server";
import type { ExamAttempt } from "@/types";
import { redirect } from "next/navigation";

export default async function AdminDashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login?next=/admin");
  }

  let attempts: ExamAttempt[] = [];

  try {
    const { data } = await supabase
      .from("exam_attempts")
      .select("*")
      .order("startedAt", { ascending: false })
      .limit(50);
    if (data) {
      attempts = data;
    }
  } catch (error) {
    console.warn("Notice: Admin attempts query:", error);
  }

  const tableData = attempts.map((a, index) => ({
    id: index + 1,
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

  const submittedAttempts = attempts.filter((a) => a.status === "SUBMITTED");
  const meanScore =
    submittedAttempts.length > 0
      ? Math.round(
          submittedAttempts.reduce((acc, a) => acc + (a.totalScaledScore || 310), 0) /
            submittedAttempts.length,
        )
      : 0;

  const b2c1Count = submittedAttempts.filter(
    (a) => a.cefrLevel === "B2" || a.cefrLevel === "C1",
  ).length;
  const b2c1Percentage =
    submittedAttempts.length > 0 ? Math.round((b2c1Count / submittedAttempts.length) * 100) : 0;

  const cleanCount = attempts.filter((a) => (a.tabSwitchCount ?? 0) === 0).length;
  const integrityIndex =
    attempts.length > 0 ? Math.round((cleanCount / attempts.length) * 1000) / 10 : 100;

  // Aggregate daily volume for the throughput chart
  const volumeByDate: { [dateStr: string]: number } = {};
  for (const a of attempts) {
    const dateStr = a.startedAt.slice(0, 10);
    volumeByDate[dateStr] = (volumeByDate[dateStr] || 0) + 1;
  }
  const chartData = Object.entries(volumeByDate)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([date, count]) => ({ date, attempts: count }));

  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <div className="px-4 lg:px-6">
            <h1 className="text-2xl font-bold tracking-tight">Diagnostic Assessment Operations</h1>
            <p className="text-sm text-muted-foreground">
              Real-time psychometrics, candidate cohort throughput, and test delivery telemetry
              conforming to ETS TOEFL ITP® Level 1 benchmark.
            </p>
          </div>

          <SectionCards
            totalCandidates={attempts.length}
            meanScore={meanScore}
            b2c1Percentage={b2c1Percentage}
            integrityIndex={integrityIndex}
          />

          <div className="px-4 lg:px-6">
            <ChartAreaInteractive data={chartData} />
          </div>

          <div className="px-4 lg:px-6">
            <div className="mb-2">
              <h2 className="text-lg font-semibold tracking-tight">
                Recent Candidate Evaluation Registry
              </h2>
              <p className="text-xs text-muted-foreground">
                Audit logs of completed diagnostic sessions, ETS scaled scores, CEFR levels, and
                proctoring telemetry.
              </p>
            </div>
            <DataTable data={tableData} />
          </div>
        </div>
      </div>
    </div>
  );
}
