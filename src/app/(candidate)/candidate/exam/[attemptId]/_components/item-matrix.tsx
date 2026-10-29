"use client";

import { useExamStore } from "@/lib/store/exam-store";
import { cn } from "@/lib/utils";
import type { ExamQuestion, SectionType } from "@/types/exam";
import { CheckCircle2, Flag } from "lucide-react";

interface ItemMatrixProps {
  questions: ExamQuestion[];
  sectionType: SectionType;
  onSelectQuestion: (index: number) => void;
}

const PART_LABELS: Record<string, Record<number, string>> = {
  LISTENING: {
    0: "Part A: Short Dialogues (1–30)",
    30: "Part B: Extended Conversations (31–38)",
    38: "Part C: Academic Lectures (39–50)",
  },
  STRUCTURE: {
    0: "Part A: Sentence Completion (1–15)",
    15: "Part B: Error Recognition (16–40)",
  },
  READING: {
    0: "Passage 1: Glacial Morphology (1–10)",
    10: "Passage 2: Erie Canal (11–20)",
    20: "Passage 3: Coral Reefs (21–30)",
    30: "Passage 4: Bauhaus Typography (31–40)",
    40: "Passage 5: Karst Hydrology (41–50)",
  },
};

const LEGEND_ITEMS = [
  { label: "Answered", dotClass: "bg-emerald-500" },
  { label: "Active", dotClass: "bg-primary" },
  { label: "Flagged", dotClass: "bg-amber-500" },
];

export function ItemMatrix({ questions, sectionType, onSelectQuestion }: ItemMatrixProps) {
  const currentIndex = useExamStore((state) => state.currentQuestionIndex);
  const answers = useExamStore((state) => state.answers);

  const answeredCount = questions.filter((q) => answers[q.id]?.selectedOption).length;
  const totalCount = questions.length;

  const getPartLabel = (index: number): string | null => PART_LABELS[sectionType]?.[index] ?? null;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between border-b border-border/40 pb-3">
        <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
          Question Matrix
        </span>
        <span className="flex items-center gap-1.5 text-xs font-semibold text-primary">
          <CheckCircle2 className="h-3.5 w-3.5" />
          {answeredCount} / {totalCount} Answered
        </span>
      </div>

      <div className="space-y-3 max-h-[calc(100vh-280px)] overflow-y-auto pr-1">
        <div className="grid grid-cols-5 gap-1.5">
          {questions.map((q, index) => {
            const partLabel = getPartLabel(index);
            const answerData = answers[q.id];
            const isAnswered = Boolean(answerData?.selectedOption);
            const isFlagged = Boolean(answerData?.isFlagged);
            const isActive = currentIndex === index;

            let buttonClasses =
              "border-border bg-card text-muted-foreground hover:border-primary/40 hover:bg-muted/40";

            if (isActive) {
              buttonClasses =
                "border-primary bg-primary text-primary-foreground font-black shadow-sm ring-2 ring-primary/20";
            } else if (isFlagged) {
              buttonClasses =
                "border-amber-500/40 bg-amber-500/15 text-amber-600 dark:text-amber-400 font-bold";
            } else if (isAnswered) {
              buttonClasses =
                "border-emerald-500/40 bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 font-bold";
            }

            return (
              <div key={q.id} className="contents">
                {partLabel && (
                  <div className="col-span-5 text-[10px] font-bold uppercase tracking-wider text-primary border-b border-border/30 pb-0.5 mt-2 mb-1">
                    {partLabel}
                  </div>
                )}
                <button
                  type="button"
                  onClick={() => onSelectQuestion(index)}
                  className={`relative flex aspect-square items-center justify-center rounded-lg border text-xs transition-all cursor-pointer ${buttonClasses}`}
                  aria-label={`Question ${index + 1}${isAnswered ? ", answered" : ""}${isFlagged ? ", flagged" : ""}`}
                >
                  <span>{index + 1}</span>
                  {isFlagged && (
                    <Flag className="absolute top-1 right-1 h-2 w-2 fill-amber-500 text-amber-500" />
                  )}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-1 pt-2 border-t border-border/40 text-[10px] text-muted-foreground">
        {LEGEND_ITEMS.map((item) => (
          <div key={item.label} className="flex items-center gap-1.5">
            <span className={cn("h-2 w-2 rounded-full", item.dotClass)} />
            <span>{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
