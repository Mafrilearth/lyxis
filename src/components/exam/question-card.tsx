"use client";

import { Button } from "@heroui/react";
import { useExamStore } from "@/lib/store/exam-store";
import type { CorrectOption, ExamQuestion } from "@/types/exam";
import { Check, Flag } from "lucide-react";
import { useEffect } from "react";

interface QuestionCardProps {
  question: ExamQuestion;
  onAnswerSaved: (questionId: string, option: CorrectOption) => void;
}

export function QuestionCard({ question, onAnswerSaved }: QuestionCardProps) {
  const currentAnswer = useExamStore((state) => state.answers[question.id]);
  const recordAnswer = useExamStore((state) => state.recordAnswer);
  const toggleFlagQuestion = useExamStore((state) => state.toggleFlagQuestion);

  const selectedOption = currentAnswer?.selectedOption;
  const isFlagged = currentAnswer?.isFlagged || false;

  const handleSelect = (option: CorrectOption) => {
    recordAnswer(question.id, option);
    onAnswerSaved(question.id, option);
  };

  // Keyboard shortcut listener for A, B, C, D and F
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      const key = e.key.toUpperCase();
      if (key === "A" || key === "B" || key === "C" || key === "D") {
        e.preventDefault();
        handleSelect(key as CorrectOption);
      } else if (key === "F") {
        e.preventDefault();
        toggleFlagQuestion(question.id);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [question.id, handleSelect, toggleFlagQuestion]);

  const options: Array<{ key: CorrectOption; text: string }> = [
    { key: "A", text: question.optionA },
    { key: "B", text: question.optionB },
    { key: "C", text: question.optionC },
    { key: "D", text: question.optionD },
  ];

  return (
    <div className="space-y-8 w-full py-4">
      {/* Header with question number and flag button */}
      <div className="flex items-center justify-between border-b border-border/60 pb-4">
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground font-black text-sm shadow-xs">
            {question.questionNumber}
          </span>
          <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-muted-foreground">
            {question.skillCategory || "Standard Test Item"}
          </span>
        </div>

        <Button
          variant="ghost"
          onPress={() => toggleFlagQuestion(question.id)}
          className={`h-11 px-4 gap-2 text-xs font-semibold rounded-xl transition-colors ${
            isFlagged
              ? "bg-amber-500/15 text-amber-600 hover:bg-amber-500/25 dark:text-amber-400"
              : "text-muted-foreground hover:text-foreground hover:bg-muted/40"
          }`}
        >
          <Flag className={`h-4 w-4 ${isFlagged ? "fill-amber-500 text-amber-500" : ""}`} />
          <span>{isFlagged ? "Item Flagged" : "Flag Item"}</span>
          <kbd className="rounded bg-muted px-1.5 py-0.5 text-[10px] font-mono border">F</kbd>
        </Button>
      </div>

      {/* Question Prompt: Expansive & Clear */}
      {question.prompt && (
        <div className="text-lg sm:text-xl font-bold leading-relaxed text-foreground">
          {question.prompt}
        </div>
      )}

      {/* Answer Options A, B, C, D: Expansive & Proportional */}
      <div className="space-y-3.5" role="radiogroup" aria-label="Answer options">
        {options.map((opt) => {
          const isSelected = selectedOption === opt.key;
          return (
            <button
              type="button"
              key={opt.key}
              onClick={() => handleSelect(opt.key)}
              role="radio"
              aria-checked={isSelected}
              className={`w-full text-left flex items-start gap-4 p-5 sm:p-6 rounded-2xl border-2 transition-all cursor-pointer ${
                isSelected
                  ? "border-primary bg-primary/10 shadow-sm ring-1 ring-primary/40"
                  : "border-border/70 bg-card hover:border-primary/40 hover:bg-muted/30"
              }`}
            >
              <div
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl font-mono font-bold text-sm transition-colors ${
                  isSelected
                    ? "bg-primary text-primary-foreground shadow-xs"
                    : "bg-muted text-muted-foreground border border-border/80"
                }`}
              >
                {isSelected ? <Check className="h-5 w-5" /> : opt.key}
              </div>

              <div className="flex-1 pt-1 text-base sm:text-lg leading-relaxed text-foreground font-medium">
                {opt.text}
              </div>

              <div className="hidden sm:inline-flex shrink-0 pt-1 text-xs font-mono text-muted-foreground">
                <kbd className="rounded bg-muted px-2 py-1 border text-xs">{opt.key}</kbd>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
