"use client";

import { QuestionCard } from "@/components/exam/question-card";
import type { CorrectOption, ExamQuestion, ExamStimulus } from "@/types/exam";
import { BookOpen } from "lucide-react";

interface ReadingViewProps {
  stimulus?: ExamStimulus | null;
  question: ExamQuestion;
  onAnswerSaved: (questionId: string, option: CorrectOption) => void;
}

export function ReadingView({ stimulus, question, onAnswerSaved }: ReadingViewProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-full items-start">
      {/* Left Pane: Reading Passage with independent scroll */}
      <div className="lg:col-span-7 flex flex-col rounded-2xl border border-border/80 bg-card/60 p-6 sm:p-8 max-h-[calc(100vh-160px)] overflow-y-auto shadow-sm">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary border-b border-border/40 pb-3 mb-4">
          <BookOpen className="h-4 w-4" />
          <span>{stimulus?.title || "Reading Passage"}</span>
        </div>

        <div className="font-serif prose prose-sm sm:prose-base dark:prose-invert max-w-none text-foreground leading-relaxed space-y-4">
          {stimulus?.content ? (
            stimulus.content.split("\n\n").map((para, i) => (
              <p
                key={i}
                className="text-justify leading-relaxed text-[15px] sm:text-[16px] tracking-normal"
              >
                {para}
              </p>
            ))
          ) : (
            <p className="text-muted-foreground italic">
              Passage text is loaded for this question group.
            </p>
          )}
        </div>
      </div>

      {/* Right Pane: Question & Choices */}
      <div className="lg:col-span-5 flex flex-col rounded-2xl border border-border/80 bg-card/60 p-6 sm:p-8 max-h-[calc(100vh-160px)] overflow-y-auto shadow-sm">
        <QuestionCard question={question} onAnswerSaved={onAnswerSaved} />
      </div>
    </div>
  );
}
