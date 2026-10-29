import { Card, Chip } from "@heroui/react";
import { buttonVariants } from "@heroui/styles";
import { BookOpen, ShieldCheck } from "lucide-react";
import type { Route } from "next";
import Link from "next/link";

export default function DashboardMetricsSlot() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
      <Card className="border border-border/80 bg-surface/60 backdrop-blur-md p-5 rounded-2xl shadow-sm">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Chip size="sm" variant="soft" className="text-[10px] text-accent">
                Parallel Slot: @metrics
              </Chip>
              <span className="text-xs text-muted-foreground font-mono">
                Standard ETS Algorithm v16
              </span>
            </div>
            <h2 className="text-base font-bold tracking-tight flex items-center gap-2">
              <ShieldCheck className="size-4 text-emerald-500" />
              Standardized Computer-Based Assessment Readiness
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 border border-border px-3 py-1.5 rounded-lg bg-background text-xs">
              <span className="text-muted-foreground">Target CEFR:</span>
              <span className="font-bold text-foreground">B2 (Vantage)</span>
            </div>
            <div className="flex items-center gap-2 border border-border px-3 py-1.5 rounded-lg bg-background text-xs">
              <span className="text-muted-foreground">Scaled Range:</span>
              <span className="font-mono font-bold text-primary">310 – 677</span>
            </div>
            <Link
              href={"/guide" as Route}
              className={buttonVariants({ variant: "outline", size: "sm" })}
            >
              <BookOpen className="size-3.5 mr-1.5" /> Handbook
            </Link>
          </div>
        </div>
      </Card>
    </div>
  );
}
