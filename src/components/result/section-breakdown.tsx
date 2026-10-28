import { Progress } from "@/components/ui/progress";
import { BookOpen, Headphones, PenTool } from "lucide-react";

interface SectionBreakdownProps {
  listening: { raw: number; scaled: number };
  structure: { raw: number; scaled: number };
  reading: { raw: number; scaled: number };
}

export function SectionBreakdown({ listening, structure, reading }: SectionBreakdownProps) {
  // Max scaled scores for each section is 68 for L/S and 67 for R
  const lPercent = Math.round(((listening.scaled - 24) / (68 - 24)) * 100);
  const sPercent = Math.round(((structure.scaled - 20) / (68 - 20)) * 100);
  const rPercent = Math.round(((reading.scaled - 21) / (67 - 21)) * 100);

  return (
    <div className="rounded-2xl border border-border/80 bg-card p-6 sm:p-8 space-y-6 shadow-sm">
      <div className="border-b border-border/40 pb-4">
        <h3 className="text-base font-bold tracking-tight">Sectional Competency Breakdown</h3>
        <p className="text-xs text-muted-foreground mt-0.5">
          Granular performance metrics across Listening, Structure, and Reading domains.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Section 1: Listening */}
        <div className="rounded-xl border border-border/60 bg-muted/20 p-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-xs text-foreground flex items-center gap-1.5">
              <Headphones className="h-4 w-4 text-primary" /> Listening
            </span>
            <span className="font-mono font-bold text-sm text-foreground">
              {listening.scaled}{" "}
              <span className="text-[10px] text-muted-foreground font-normal">/ 68</span>
            </span>
          </div>

          <Progress value={Math.max(5, lPercent)} className="h-2" />

          <div className="flex items-center justify-between text-[11px] text-muted-foreground">
            <span>Raw Correct:</span>
            <span className="font-mono font-semibold text-foreground">{listening.raw} / 50</span>
          </div>
        </div>

        {/* Section 2: Structure */}
        <div className="rounded-xl border border-border/60 bg-muted/20 p-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-xs text-foreground flex items-center gap-1.5">
              <PenTool className="h-4 w-4 text-primary" /> Structure
            </span>
            <span className="font-mono font-bold text-sm text-foreground">
              {structure.scaled}{" "}
              <span className="text-[10px] text-muted-foreground font-normal">/ 68</span>
            </span>
          </div>

          <Progress value={Math.max(5, sPercent)} className="h-2" />

          <div className="flex items-center justify-between text-[11px] text-muted-foreground">
            <span>Raw Correct:</span>
            <span className="font-mono font-semibold text-foreground">{structure.raw} / 40</span>
          </div>
        </div>

        {/* Section 3: Reading */}
        <div className="rounded-xl border border-border/60 bg-muted/20 p-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-xs text-foreground flex items-center gap-1.5">
              <BookOpen className="h-4 w-4 text-primary" /> Reading
            </span>
            <span className="font-mono font-bold text-sm text-foreground">
              {reading.scaled}{" "}
              <span className="text-[10px] text-muted-foreground font-normal">/ 67</span>
            </span>
          </div>

          <Progress value={Math.max(5, rPercent)} className="h-2" />

          <div className="flex items-center justify-between text-[11px] text-muted-foreground">
            <span>Raw Correct:</span>
            <span className="font-mono font-semibold text-foreground">{reading.raw} / 50</span>
          </div>
        </div>
      </div>
    </div>
  );
}
