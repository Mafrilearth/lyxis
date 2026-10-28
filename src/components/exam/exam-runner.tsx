"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { AntiCheatSensor } from "@/components/exam/anti-cheat";
import { AudioPlayer } from "@/components/exam/audio-player";
import { ExamHeader } from "@/components/exam/exam-header";
import { ItemMatrix } from "@/components/exam/item-matrix";
import { QuestionCard } from "@/components/exam/question-card";
import { ReadingView } from "@/components/exam/reading-view";
import { useExamStore } from "@/lib/store/exam-store";
import { saveAnswerAction, submitExamAction } from "@/actions/exam";
import type { CorrectOption, ExamSection } from "@/types/exam";
import { cn } from "@/lib/utils";
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  Headphones,
  Loader2,
  PenTool,
  Send,
  Sparkles,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface ExamRunnerProps {
  attemptId: string;
  initialCandidateName?: string;
  sections: ExamSection[];
}

export function ExamRunner({
  attemptId,
  initialCandidateName = "Candidate",
  sections,
}: ExamRunnerProps) {
  const router = useRouter();

  const currentSectionIndex = useExamStore((state) => state.currentSectionIndex);
  const currentQuestionIndex = useExamStore((state) => state.currentQuestionIndex);
  const answers = useExamStore((state) => state.answers);
  const isSubmitting = useExamStore((state) => state.isSubmitting);

  const initializeSession = useExamStore((state) => state.initializeSession);
  const setCurrentSectionIndex = useExamStore((state) => state.setCurrentSectionIndex);
  const setCurrentQuestionIndex = useExamStore((state) => state.setCurrentQuestionIndex);
  const setIsSubmitting = useExamStore((state) => state.setIsSubmitting);

  const [isNextSectionDialogOpen, setIsNextSectionDialogOpen] = useState(false);
  const [isSubmitDialogOpen, setIsSubmitDialogOpen] = useState(false);
  const [candidateName, setCandidateName] = useState(initialCandidateName);

  // Initialize store on first mount
  useEffect(() => {
    let name = initialCandidateName;
    if (typeof window !== "undefined") {
      const stored = sessionStorage.getItem("lyxis_candidate_name");
      if (stored) name = stored;
    }
    setCandidateName(name);

    initializeSession({
      attemptId,
      candidateName: name,
      sections,
      durationMinutes: sections[0]?.durationMinutes || 35,
    });
  }, [attemptId, initialCandidateName, sections, initializeSession]);

  const currentSection = sections[currentSectionIndex] || sections[0];
  const currentQuestions = currentSection?.questions || [];
  const currentQuestion = currentQuestions[currentQuestionIndex] || currentQuestions[0];

  // Find linked stimulus for reading or listening
  const currentStimulus = currentSection?.stimuli?.find(
    (s) => s.id === currentQuestion?.stimulusId,
  );

  const isFirstQuestion = currentQuestionIndex === 0;
  const isLastQuestion = currentQuestionIndex === currentQuestions.length - 1;
  const isLastSection = currentSectionIndex === sections.length - 1;

  // Background Autosave
  const handleAnswerSaved = async (questionId: string, option: CorrectOption) => {
    try {
      await saveAnswerAction({
        attemptId,
        questionId,
        selectedOption: option,
      });
    } catch {
      // Offline fallback: Answer is already safely in Zustand & localStorage
    }
  };

  const handleNextQuestion = () => {
    if (!isLastQuestion) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevQuestion = () => {
    if (!isFirstQuestion) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  // Keyboard navigation for Prev (P, ArrowLeft), Next (N, ArrowRight), Section (L), Submit (S)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      const key = e.key.toLowerCase();
      if ((key === "n" || e.key === "ArrowRight") && !isLastQuestion) {
        e.preventDefault();
        handleNextQuestion();
      } else if ((key === "p" || e.key === "ArrowLeft") && !isFirstQuestion) {
        e.preventDefault();
        handlePrevQuestion();
      } else if (key === "l" && !isLastSection) {
        e.preventDefault();
        setIsNextSectionDialogOpen(true);
      } else if (key === "s" && isLastSection) {
        e.preventDefault();
        setIsSubmitDialogOpen(true);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isLastQuestion, isFirstQuestion, isLastSection, currentQuestionIndex]);

  // Proceed to next section
  const handleConfirmNextSection = () => {
    setIsNextSectionDialogOpen(false);
    if (!isLastSection) {
      const nextIndex = currentSectionIndex + 1;
      setCurrentSectionIndex(nextIndex);
      toast.success(`Transitioned to Section ${nextIndex + 1}: ${sections[nextIndex].title}`);
    }
  };

  // Submit final examination
  const handleSubmitExam = async () => {
    setIsSubmitDialogOpen(false);
    setIsSubmitting(true);

    try {
      toast.info("Scoring responses and compiling psychometric diagnostic report...");

      const result = await submitExamAction({
        attemptId,
        candidateName,
        answers,
      });

      if (!result.success || !result.redirectUrl) {
        throw new Error(result.error || "Failed to submit examination");
      }

      toast.success("Examination submitted. Loading diagnostic dossier...");
      router.push(result.redirectUrl);
    } catch (err: unknown) {
      setIsSubmitting(false);
      const msg = err instanceof Error ? err.message : "Submission failed";
      toast.error(msg);
    }
  };

  const handleTimeExpired = () => {
    if (isLastSection) {
      toast.error("Section time expired. Auto-submitting completed examination.");
      handleSubmitExam();
    } else {
      toast.warning("Section time expired. Auto-advancing to subsequent section.");
      handleConfirmNextSection();
    }
  };

  if (!currentQuestion) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Anti-Cheat Sensor */}
      <AntiCheatSensor attemptId={attemptId} />

      {/* Top Header Bar */}
      <ExamHeader
        sectionTitle={currentSection.title}
        currentQuestionNumber={currentQuestionIndex + 1}
        totalQuestions={currentQuestions.length}
        onTimeExpired={handleTimeExpired}
      />

      {/* Main Testing Viewport: Generous & Expansive */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 py-6 sm:py-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left / Center: Question Canvas with Double-Bezel Console Frame */}
        <div className="lg:col-span-9 flex flex-col justify-between">
          <div className="rounded-[2.5rem] p-2 sm:p-2.5 bg-gradient-to-b from-primary/20 via-border/40 to-muted/20 ring-1 ring-border/80 shadow-2xl shadow-primary/10">
            <div className="rounded-[calc(2.5rem-0.5rem)] bg-card border border-border/60 overflow-hidden shadow-[inset_0_1px_1px_rgba(255,255,255,0.12)]">
              {/* Top Window Bar: Clear, Spacious, Uncluttered */}
              <div className="border-b border-border/60 bg-muted/25 px-6 sm:px-8 py-4 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <span className="h-3 w-3 rounded-full bg-destructive/60" />
                    <span className="h-3 w-3 rounded-full bg-amber-500/60" />
                    <span className="h-3 w-3 rounded-full bg-emerald-500/60" />
                  </div>

                  <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                    </span>
                    <span>OFFICIAL CBT ASSESSMENT ACTIVE</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-xs font-mono text-muted-foreground">
                  <span className="inline-flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-bold">
                    <span className="h-2 w-2 rounded-full bg-emerald-500" />
                    Auto-Saved to Ledger
                  </span>
                  <span>•</span>
                  <span>
                    Item {currentQuestionIndex + 1} of {currentQuestions.length}
                  </span>
                </div>
              </div>

              {/* Section Navigation Tabs: Identical to Homepage Console */}
              <div className="grid grid-cols-3 border-b border-border/60 bg-muted/15 text-sm font-bold divide-x divide-border/60">
                <div
                  className={cn(
                    "py-4 px-3 sm:px-6 flex items-center justify-center gap-2.5 transition-all relative",
                    currentSectionIndex === 0
                      ? "bg-background text-primary shadow-xs"
                      : "text-muted-foreground bg-muted/20 opacity-75 cursor-not-allowed",
                  )}
                >
                  <Headphones className="h-4 w-4 shrink-0" />
                  <span className="truncate">1. Listening (50 Items)</span>
                  {currentSectionIndex === 0 && (
                    <span className="absolute bottom-0 left-0 right-0 h-1 bg-primary rounded-t-full" />
                  )}
                </div>

                <div
                  className={cn(
                    "py-4 px-3 sm:px-6 flex items-center justify-center gap-2.5 transition-all relative",
                    currentSectionIndex === 1
                      ? "bg-background text-primary shadow-xs"
                      : "text-muted-foreground bg-muted/20 opacity-75 cursor-not-allowed",
                  )}
                >
                  <PenTool className="h-4 w-4 shrink-0" />
                  <span className="truncate">2. Structure (40 Items)</span>
                  {currentSectionIndex === 1 && (
                    <span className="absolute bottom-0 left-0 right-0 h-1 bg-primary rounded-t-full" />
                  )}
                </div>

                <div
                  className={cn(
                    "py-4 px-3 sm:px-6 flex items-center justify-center gap-2.5 transition-all relative",
                    currentSectionIndex === 2
                      ? "bg-background text-primary shadow-xs"
                      : "text-muted-foreground bg-muted/20 opacity-75 cursor-not-allowed",
                  )}
                >
                  <Sparkles className="h-4 w-4 shrink-0" />
                  <span className="truncate">3. Reading (50 Items)</span>
                  {currentSectionIndex === 2 && (
                    <span className="absolute bottom-0 left-0 right-0 h-1 bg-primary rounded-t-full" />
                  )}
                </div>
              </div>

              {/* Console Stage: Expansive & Crisp */}
              <div className="p-6 sm:p-10 space-y-6">
                {/* Section 1: Listening Comprehension with Audio Stimulus */}
                {currentSection.type === "LISTENING" && (
                  <div className="space-y-6">
                    <AudioPlayer
                      itemId={currentQuestion.id}
                      audioUrl={currentStimulus?.audioUrl}
                      syntheticText={currentStimulus?.content || currentQuestion.prompt}
                      label={
                        currentStimulus?.title || `Item ${currentQuestionIndex + 1} Audio Track`
                      }
                    />
                    <QuestionCard question={currentQuestion} onAnswerSaved={handleAnswerSaved} />
                  </div>
                )}

                {/* Section 2: Structure & Written Expression */}
                {currentSection.type === "STRUCTURE" && (
                  <QuestionCard question={currentQuestion} onAnswerSaved={handleAnswerSaved} />
                )}

                {/* Section 3: Reading Comprehension with Split-Pane */}
                {currentSection.type === "READING" && (
                  <ReadingView
                    stimulus={currentStimulus}
                    question={currentQuestion}
                    onAnswerSaved={handleAnswerSaved}
                  />
                )}
              </div>
            </div>
          </div>

          {/* Bottom Action / Navigation Bar: Spacious & Comfortable */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-t border-border/60 pt-6 mt-10">
            <Button
              type="button"
              variant="outline"
              disabled={isFirstQuestion}
              onClick={handlePrevQuestion}
              className="h-12 sm:h-13 px-6 gap-2.5 text-sm sm:text-base font-semibold rounded-2xl border-border/80"
            >
              <ArrowLeft className="h-4 w-4" /> Previous Item{" "}
              <kbd className="hidden sm:inline-block rounded-lg bg-muted px-2 py-0.5 text-xs font-mono border">
                P
              </kbd>
            </Button>

            <div className="flex items-center gap-3">
              {!isLastSection ? (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsNextSectionDialogOpen(true)}
                  className="h-12 sm:h-13 px-6 gap-2 text-sm sm:text-base font-bold rounded-2xl border-primary/40 hover:bg-primary/5 text-primary"
                >
                  Complete Section <ChevronRight className="h-4 w-4" />
                  <kbd className="hidden sm:inline-block rounded-lg bg-muted px-2 py-0.5 text-xs font-mono border">
                    L
                  </kbd>
                </Button>
              ) : (
                <Button
                  type="button"
                  onClick={() => setIsSubmitDialogOpen(true)}
                  disabled={isSubmitting}
                  className="h-12 sm:h-13 px-7 gap-2.5 text-sm sm:text-base font-bold rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white shadow-md"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" /> Computing Scaled Score...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" /> Submit Final Examination
                      <kbd className="hidden sm:inline-block rounded-lg bg-emerald-800/60 px-2 py-0.5 text-xs font-mono border border-emerald-400/30">
                        S
                      </kbd>
                    </>
                  )}
                </Button>
              )}

              <Button
                type="button"
                disabled={isLastQuestion}
                onClick={handleNextQuestion}
                className="h-12 sm:h-13 px-6 gap-2.5 text-sm sm:text-base font-bold rounded-2xl shadow-sm"
              >
                Next Item <ArrowRight className="h-4 w-4" />{" "}
                <kbd className="hidden sm:inline-block rounded-lg bg-primary-foreground/20 px-2 py-0.5 text-xs font-mono border border-primary-foreground/20">
                  N
                </kbd>
              </Button>
            </div>
          </div>
        </div>

        {/* Right: Item Navigation Matrix Panel */}
        <div className="lg:col-span-3 rounded-3xl border border-border/80 bg-card/75 p-6 sm:p-7 shadow-md sticky top-24">
          <ItemMatrix
            questions={currentQuestions}
            sectionType={currentSection.type}
            onSelectQuestion={(idx) => setCurrentQuestionIndex(idx)}
          />
        </div>
      </main>

      {/* Confirmation Dialog: Proceed to Next Section */}
      <Dialog open={isNextSectionDialogOpen} onOpenChange={setIsNextSectionDialogOpen}>
        <DialogContent className="max-w-md p-6 sm:p-7 rounded-3xl">
          <DialogHeader>
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-600 mb-2">
              <AlertTriangle className="h-5 w-5" />
            </div>
            <DialogTitle className="text-lg font-bold">Advance to Next Section?</DialogTitle>
            <DialogDescription className="text-sm text-muted-foreground leading-relaxed mt-1">
              Once you confirm and exit{" "}
              <strong className="text-foreground">{currentSection.title}</strong>, all responses in
              this section will be permanently locked. You cannot navigate back to modify answers.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2 sm:gap-3 mt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsNextSectionDialogOpen(false)}
              className="h-12 px-5 rounded-2xl font-semibold text-sm"
            >
              Continue Section
            </Button>
            <Button
              type="button"
              onClick={handleConfirmNextSection}
              className="h-12 px-6 rounded-2xl bg-primary text-primary-foreground font-bold text-sm shadow-md"
            >
              Confirm Section Finalization
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Confirmation Dialog: Submit Examination */}
      <Dialog open={isSubmitDialogOpen} onOpenChange={setIsSubmitDialogOpen}>
        <DialogContent className="max-w-md p-6 sm:p-7 rounded-3xl">
          <DialogHeader>
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-600 mb-2">
              <CheckCircle2 className="h-5 w-5" />
            </div>
            <DialogTitle className="text-lg font-bold">
              Finalize Examination Submission?
            </DialogTitle>
            <DialogDescription className="text-sm text-muted-foreground leading-relaxed mt-1">
              You are about to submit all 140 questions for psychometric evaluation. Your scaled
              score (310–677), CEFR band, and verified digital credential will be generated
              immediately.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2 sm:gap-3 mt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsSubmitDialogOpen(false)}
              className="h-12 px-5 rounded-2xl font-semibold text-sm"
            >
              Review Questions
            </Button>
            <Button
              type="button"
              onClick={handleSubmitExam}
              disabled={isSubmitting}
              className="h-12 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" /> Scoring...
                </>
              ) : (
                "Yes, Submit Examination"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
