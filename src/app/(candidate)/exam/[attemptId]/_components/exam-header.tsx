"use client";

import { Button, Modal } from "@heroui/react";
import { ThemeToggle } from "@/app/_components/theme-toggle";
import { Timer } from "./timer";
import { Command, HelpCircle, ShieldCheck } from "lucide-react";
import Link from "next/link";

interface ExamHeaderProps {
  sectionTitle: string;
  currentQuestionNumber: number;
  totalQuestions: number;
  onTimeExpired: () => void;
}

export function ExamHeader({
  sectionTitle,
  currentQuestionNumber,
  totalQuestions,
  onTimeExpired,
}: ExamHeaderProps) {
  return (
    <header className="sticky top-0 z-30 flex h-20 w-full items-center justify-between border-b border-separator bg-background/90 px-6 sm:px-10 backdrop-blur-xl">
      <div className="flex items-center gap-4">
        <Link href="/dashboard" className="flex flex-col group">
          <span className="font-extrabold text-xl tracking-tight leading-none text-foreground transition-opacity group-hover:opacity-80">
            Lyxis
          </span>
          <span className="text-[11px] text-muted font-medium tracking-wide uppercase mt-1">
            Psychometric English Diagnostic Engine
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-2 border-l border-separator pl-4 py-1">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-xs font-bold text-accent">
            <ShieldCheck className="h-3.5 w-3.5" />
            <span>{sectionTitle}</span>
          </div>
          <span className="text-xs text-muted font-medium">
            Question <span className="font-bold text-foreground">{currentQuestionNumber}</span> of{" "}
            {totalQuestions}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-3 sm:gap-4">
        <Timer onTimeExpired={onTimeExpired} />

        <Modal>
          <Button
            variant="outline"
            size="sm"
            className="h-10 px-3.5 gap-2 text-xs font-semibold rounded-xl border-separator hidden sm:inline-flex cursor-pointer hover:bg-default/40"
          >
            <Command className="h-3.5 w-3.5" />
            Shortcuts{" "}
            <kbd className="rounded bg-default px-1.5 py-0.5 text-[10px] font-mono border">H</kbd>
          </Button>
          <Modal.Backdrop>
            <Modal.Container>
              <Modal.Dialog className="max-w-md p-6">
                <Modal.CloseTrigger />
                <Modal.Header>
                  <Modal.Heading className="flex items-center gap-2 text-lg font-bold">
                    <HelpCircle className="h-5 w-5 text-accent" /> Keyboard Shortcuts Reference
                  </Modal.Heading>
                  <p className="text-sm text-muted">
                    Speed up navigation and item selection without using your mouse.
                  </p>
                </Modal.Header>

                <Modal.Body>
                  <div className="grid grid-cols-2 gap-3 py-2 text-xs">
                    <div className="flex items-center justify-between rounded-xl border border-separator bg-surface-secondary p-3">
                      <span className="text-muted font-medium">Select Option</span>
                      <span className="font-mono font-bold text-foreground">A / B / C / D</span>
                    </div>
                    <div className="flex items-center justify-between rounded-xl border border-separator bg-surface-secondary p-3">
                      <span className="text-muted font-medium">Next Item</span>
                      <span className="font-mono font-bold text-foreground">N / →</span>
                    </div>
                    <div className="flex items-center justify-between rounded-xl border border-separator bg-surface-secondary p-3">
                      <span className="text-muted font-medium">Previous Item</span>
                      <span className="font-mono font-bold text-foreground">P / ←</span>
                    </div>
                    <div className="flex items-center justify-between rounded-xl border border-separator bg-surface-secondary p-3">
                      <span className="text-muted font-medium">Play Audio Track</span>
                      <span className="font-mono font-bold text-foreground">M</span>
                    </div>
                    <div className="flex items-center justify-between rounded-xl border border-separator bg-surface-secondary p-3">
                      <span className="text-muted font-medium">Flag Item</span>
                      <span className="font-mono font-bold text-foreground">F</span>
                    </div>
                    <div className="flex items-center justify-between rounded-xl border border-separator bg-surface-secondary p-3">
                      <span className="text-muted font-medium">Section Advance</span>
                      <span className="font-mono font-bold text-foreground">L</span>
                    </div>
                  </div>
                </Modal.Body>
              </Modal.Dialog>
            </Modal.Container>
          </Modal.Backdrop>
        </Modal>

        <ThemeToggle />
      </div>
    </header>
  );
}
