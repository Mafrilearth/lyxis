"use client";

import { useExamStore } from "@/lib/store/exam-store";
import { Clock } from "lucide-react";
import { useEffect } from "react";

interface TimerProps {
  onTimeExpired: () => void;
}

export function Timer({ onTimeExpired }: TimerProps) {
  const timeRemainingSeconds = useExamStore((state) => state.timeRemainingSeconds);
  const decrementTimer = useExamStore((state) => state.decrementTimer);

  useEffect(() => {
    if (timeRemainingSeconds <= 0) {
      onTimeExpired();
      return;
    }

    const interval = setInterval(() => {
      decrementTimer();
    }, 1000);

    return () => clearInterval(interval);
  }, [timeRemainingSeconds, decrementTimer, onTimeExpired]);

  const minutes = Math.floor(timeRemainingSeconds / 60);
  const seconds = timeRemainingSeconds % 60;
  const formattedTime = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

  const isWarning = timeRemainingSeconds < 300 && timeRemainingSeconds >= 60;
  const isDanger = timeRemainingSeconds < 60;

  let colorClasses = "bg-muted/50 border-border text-foreground";
  if (isDanger) {
    colorClasses =
      "bg-rose-500/10 border-rose-500/30 text-rose-600 dark:text-rose-400 animate-pulse";
  } else if (isWarning) {
    colorClasses = "bg-amber-500/10 border-amber-500/30 text-amber-600 dark:text-amber-400";
  }

  return (
    <div
      className={`flex items-center gap-2 rounded-lg border px-3 py-1.5 font-mono text-xs font-bold tabular-nums transition-colors ${colorClasses}`}
      role="timer"
      aria-label={`Time remaining: ${formattedTime}`}
    >
      <Clock className="h-3.5 w-3.5 shrink-0" />
      <span>{formattedTime}</span>
    </div>
  );
}
