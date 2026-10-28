import { Badge } from "@/components/ui/badge";
import type { CefrLevel } from "@/lib/psychometrics/scoring-engine";
import { Award, CheckCircle2, TrendingUp } from "lucide-react";

interface ScoreCardProps {
  totalScore: number;
  cefrLevel: CefrLevel;
  candidateName: string;
}

export function ScoreCard({ totalScore, cefrLevel, candidateName }: ScoreCardProps) {
  const getCefrDescription = (level: CefrLevel) => {
    switch (level) {
      case "C1":
        return "Advanced / Effective Operational Proficiency. Demonstrates fluent, spontaneous academic discourse comprehension, parsing dense scientific syntax and abstract academic vocabulary without strain.";
      case "B2":
        return "Vantage / High Independent Operational User. Consistently identifies thesis arguments, draws subtle contextual inferences, and recognizes syntactical or stylistic structural inaccuracies.";
      case "B1":
        return "Threshold / Intermediate User. Comprehends core information in standard university lectures and campus conversations. Developing mastery over compound and complex clausal relationships.";
      case "A2":
        return "Waystage / Basic User. Understands routine high-frequency terminology. Requires targeted reinforcement in complex syntax, transitional connectors, and extended academic listening.";
      default:
        return "Standardized diagnostic assessment completed.";
    }
  };

  return (
    <div className="rounded-[2.5rem] p-2 bg-gradient-to-b from-primary/20 via-border/40 to-muted/20 ring-1 ring-border/80 shadow-xl">
      <div className="rounded-[calc(2.5rem-0.5rem)] bg-card p-8 sm:p-12 space-y-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 border-b border-border/40 pb-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Scaled Diagnostic Score Dossier
              </span>
              <Badge
                variant="outline"
                className="text-xs font-semibold bg-emerald-500/10 text-emerald-600 border-emerald-500/20 px-2.5 py-0.5"
              >
                <CheckCircle2 className="h-3.5 w-3.5 mr-1" /> Psychometrically Calibrated
              </Badge>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-foreground">
              {candidateName}
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <Badge className="py-2 px-4 text-sm font-bold bg-primary text-primary-foreground uppercase tracking-wider rounded-xl">
              CEFR Benchmark: {cefrLevel}
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          {/* Giant Scaled Score Display: Expansive & Bold */}
          <div className="md:col-span-5 flex flex-col items-start justify-center border-b md:border-b-0 md:border-r border-border/40 pb-8 md:pb-0 md:pr-8">
            <span className="text-xs sm:text-sm font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
              <Award className="h-5 w-5 text-primary" /> Total Scaled Score
            </span>
            <div className="flex items-baseline gap-3 mt-2">
              <span className="text-6xl sm:text-7xl font-black font-mono tracking-tight text-primary">
                {totalScore}
              </span>
              <span className="text-lg font-bold text-muted-foreground font-mono">/ 677</span>
            </div>
            <span className="text-xs text-muted-foreground mt-2">
              Official Scaled Range (310 – 677)
            </span>
          </div>

          {/* CEFR Interpretation: Spacious & Clear */}
          <div className="md:col-span-7 space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary">
              <TrendingUp className="h-4 w-4" /> Global CEFR Competency Evaluation
            </div>
            <p className="text-sm sm:text-base text-foreground/90 leading-relaxed">
              {getCefrDescription(cefrLevel)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
