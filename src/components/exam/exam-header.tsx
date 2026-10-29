"use client";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { Timer } from "@/components/exam/timer";
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
    <header className="sticky top-0 z-30 flex h-20 w-full items-center justify-between border-b border-border/80 bg-background/90 px-6 sm:px-10 backdrop-blur-xl">
      <div className="flex items-center gap-4">
        <Link href="/dashboard" className="flex flex-col group">
          <span className="font-extrabold text-xl tracking-tight leading-none text-foreground transition-opacity group-hover:opacity-80">
            Lyxis
          </span>
          <span className="text-[11px] text-muted-foreground font-medium tracking-wide uppercase mt-1">
            Psychometric English Diagnostic Engine
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-2 border-l border-border/60 pl-4 py-1">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-bold text-primary">
            <ShieldCheck className="h-3.5 w-3.5" />
            <span>{sectionTitle}</span>
          </div>
          <span className="text-xs text-muted-foreground font-medium">
            Question <span className="font-bold text-foreground">{currentQuestionNumber}</span> of{" "}
            {totalQuestions}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-3 sm:gap-4">
        <Timer onTimeExpired={onTimeExpired} />

        <Dialog>
          <DialogTrigger
            className={cn(
              buttonVariants({ variant: "outline", size: "sm" }),
              "h-10 px-3.5 gap-2 text-xs font-semibold rounded-xl border-border/80 hidden sm:inline-flex cursor-pointer hover:bg-muted/40",
            )}
          >
            <Command className="h-3.5 w-3.5" />
            Shortcuts{" "}
            <kbd className="rounded bg-muted px-1.5 py-0.5 text-[10px] font-mono border">H</kbd>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-lg font-bold">
                <HelpCircle className="h-5 w-5 text-primary" /> Keyboard Shortcuts Reference
              </DialogTitle>
              <DialogDescription className="text-sm text-muted-foreground">
                Speed up navigation and item selection without using your mouse.
              </DialogDescription>
            </DialogHeader>

            <div className="grid grid-cols-2 gap-3 py-2 text-xs">
              <div className="flex items-center justify-between rounded-xl border border-border/60 bg-muted/40 p-3">
                <span className="text-muted-foreground font-medium">Select Option</span>
                <span className="font-mono font-bold text-foreground">A / B / C / D</span>
              </div>
              <div className="flex items-center justify-between rounded-xl border border-border/60 bg-muted/40 p-3">
                <span className="text-muted-foreground font-medium">Next Item</span>
                <span className="font-mono font-bold text-foreground">N / →</span>
              </div>
              <div className="flex items-center justify-between rounded-xl border border-border/60 bg-muted/40 p-3">
                <span className="text-muted-foreground font-medium">Previous Item</span>
                <span className="font-mono font-bold text-foreground">P / ←</span>
              </div>
              <div className="flex items-center justify-between rounded-xl border border-border/60 bg-muted/40 p-3">
                <span className="text-muted-foreground font-medium">Play Audio Track</span>
                <span className="font-mono font-bold text-foreground">M</span>
              </div>
              <div className="flex items-center justify-between rounded-xl border border-border/60 bg-muted/40 p-3">
                <span className="text-muted-foreground font-medium">Flag Item</span>
                <span className="font-mono font-bold text-foreground">F</span>
              </div>
              <div className="flex items-center justify-between rounded-xl border border-border/60 bg-muted/40 p-3">
                <span className="text-muted-foreground font-medium">Section Advance</span>
                <span className="font-mono font-bold text-foreground">L</span>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        <ThemeToggle />
      </div>
    </header>
  );
}
