import { ProgressBar } from "@heroui/react";
import { BookOpen, Headphones, PenTool } from "lucide-react";

interface SectionBreakdownProps {
  listening: { raw: number; scaled: number };
  structure: { raw: number; scaled: number };
  reading: { raw: number; scaled: number };
}

export function SectionBreakdown({ listening, structure, reading }: SectionBreakdownProps) {
  const sections = [
    {
      id: "listening",
      name: "Listening",
      icon: Headphones,
      scaled: listening.scaled,
      maxScaled: 68,
      raw: listening.raw,
      maxRaw: 50,
      percent: Math.round(((listening.scaled - 24) / (68 - 24)) * 100),
    },
    {
      id: "structure",
      name: "Structure",
      icon: PenTool,
      scaled: structure.scaled,
      maxScaled: 68,
      raw: structure.raw,
      maxRaw: 40,
      percent: Math.round(((structure.scaled - 20) / (68 - 20)) * 100),
    },
    {
      id: "reading",
      name: "Reading",
      icon: BookOpen,
      scaled: reading.scaled,
      maxScaled: 67,
      raw: reading.raw,
      maxRaw: 50,
      percent: Math.round(((reading.scaled - 21) / (67 - 21)) * 100),
    },
  ];

  return (
    <div className="rounded-2xl border border-border/80 bg-card p-6 sm:p-8 space-y-6 shadow-sm">
      <div className="border-b border-border/40 pb-4">
        <h3 className="text-base font-bold tracking-tight">Sectional Competency Breakdown</h3>
        <p className="text-xs text-muted-foreground mt-0.5">
          Granular performance metrics across Listening, Structure, and Reading domains.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {sections.map((section) => {
          const SectionIcon = section.icon;
          return (
            <div
              key={section.id}
              className="rounded-xl border border-border/60 bg-muted/20 p-4 space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="font-semibold text-xs text-foreground flex items-center gap-1.5">
                  <SectionIcon className="h-4 w-4 text-primary" /> {section.name}
                </span>
                <span className="font-mono font-bold text-sm text-foreground">
                  {section.scaled}{" "}
                  <span className="text-[10px] text-muted-foreground font-normal">
                    / {section.maxScaled}
                  </span>
                </span>
              </div>

              <ProgressBar
                aria-label={`${section.name} progress`}
                value={Math.max(5, section.percent)}
                className="w-full"
              >
                <ProgressBar.Track className="h-2 w-full rounded-full bg-default/40 overflow-hidden">
                  <ProgressBar.Fill className="h-full bg-accent transition-all duration-300" />
                </ProgressBar.Track>
              </ProgressBar>

              <div className="flex items-center justify-between text-[11px] text-muted-foreground">
                <span>Raw Correct:</span>
                <span className="font-mono font-semibold text-foreground">
                  {section.raw} / {section.maxRaw}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
