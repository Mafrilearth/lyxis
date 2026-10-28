"use client";

import { Badge } from "@/components/ui/badge";
import { useExamStore } from "@/lib/store/exam-store";
import { cn } from "@/lib/utils";
import { CheckCircle2, Lock, Play, Volume2 } from "lucide-react";
import { useEffect, useRef } from "react";
import { toast } from "sonner";

interface AudioPlayerProps {
  itemId: string;
  audioUrl?: string | null;
  syntheticText?: string | null;
  label?: string;
}

export function AudioPlayer({
  itemId,
  audioUrl,
  syntheticText,
  label = "Listening Stimulus Audio",
}: AudioPlayerProps) {
  const audioPlaybackState = useExamStore((state) => state.audioPlaybackState[itemId] || "idle");
  const setAudioState = useExamStore((state) => state.setAudioState);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Stop audio if component unmounts
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      if ("speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const handlePlayAudio = () => {
    if (audioPlaybackState !== "idle") {
      toast.info(
        "This audio stimulus has already been played. TOEFL regulations limit playback to 1 time.",
      );
      return;
    }

    setAudioState(itemId, "playing");

    if (audioUrl) {
      const audio = new Audio(audioUrl);
      audioRef.current = audio;

      audio.onended = () => {
        setAudioState(itemId, "played");
        audioRef.current = null;
      };

      audio.onerror = () => {
        // Fallback to synthetic speech if audio file fails to load
        fallbackToSpeechSynthesis();
      };

      audio.play().catch(() => {
        fallbackToSpeechSynthesis();
      });
    } else {
      fallbackToSpeechSynthesis();
    }
  };

  const fallbackToSpeechSynthesis = () => {
    if (!("speechSynthesis" in window) || !syntheticText) {
      setAudioState(itemId, "played");
      return;
    }

    const utterance = new SpeechSynthesisUtterance(syntheticText);
    utterance.rate = 0.95;
    utterance.lang = "en-US";

    utterance.onend = () => {
      setAudioState(itemId, "played");
    };

    utterance.onerror = () => {
      setAudioState(itemId, "played");
    };

    window.speechSynthesis.speak(utterance);
  };

  // Listen for keyboard shortcut 'M'
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }
      if (e.key.toLowerCase() === "m" && audioPlaybackState === "idle") {
        e.preventDefault();
        handlePlayAudio();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [audioPlaybackState]);

  const isPlaying = audioPlaybackState === "playing";
  const isPlayed = audioPlaybackState === "played";

  return (
    <div className="rounded-2xl border border-primary/20 bg-primary/5 p-6 sm:p-8 space-y-4 transition-all">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          {audioPlaybackState === "idle" && (
            <button
              type="button"
              onClick={handlePlayAudio}
              className="group flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg shadow-primary/25 hover:scale-105 active:scale-95 transition-transform shrink-0 cursor-pointer"
              aria-label="Play audio stimulus. Press M to play."
            >
              <Play className="h-6 w-6 ml-0.5 group-hover:scale-110 transition-transform" />
            </button>
          )}

          {audioPlaybackState === "playing" && (
            <div
              role="status"
              className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg shadow-primary/25 animate-pulse shrink-0"
              aria-label="Audio stimulus currently playing"
            >
              <Volume2 className="h-6 w-6 animate-bounce" />
            </div>
          )}

          {audioPlaybackState === "played" && (
            <div
              role="status"
              className="flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-500/10 border-2 border-rose-500/40 text-rose-500 opacity-80 cursor-not-allowed shrink-0"
              aria-label="Audio stimulus locked. Cannot be replayed."
            >
              <Lock className="h-6 w-6" />
            </div>
          )}

          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-base font-bold text-foreground">{label}</span>
              <Badge
                variant="outline"
                className="text-xs py-0.5 px-2.5 border-primary/30 text-primary font-bold"
              >
                Single-Play
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground">
              Official ETS Academic Listening Track • Calibrated 128 kbps Fidelity
            </p>
          </div>
        </div>

        {/* Audio Frequency Waveform Visualizer */}
        <div className="flex items-center gap-1.5 h-9 px-4 py-1.5 rounded-xl bg-background/80 border border-border/60 self-start sm:self-auto shadow-xs">
          <span
            className={cn(
              "w-1 rounded-full transition-all",
              isPlaying
                ? "bg-primary animate-wave-1 h-3"
                : isPlayed
                  ? "bg-rose-500/40 h-2"
                  : "bg-muted-foreground/30 h-2",
            )}
          />
          <span
            className={cn(
              "w-1 rounded-full transition-all",
              isPlaying
                ? "bg-primary animate-wave-2 h-5"
                : isPlayed
                  ? "bg-rose-500/40 h-2"
                  : "bg-muted-foreground/30 h-3",
            )}
          />
          <span
            className={cn(
              "w-1 rounded-full transition-all",
              isPlaying
                ? "bg-primary animate-wave-3 h-7"
                : isPlayed
                  ? "bg-rose-500/40 h-2"
                  : "bg-muted-foreground/30 h-4",
            )}
          />
          <span
            className={cn(
              "w-1 rounded-full transition-all",
              isPlaying
                ? "bg-primary animate-wave-4 h-4"
                : isPlayed
                  ? "bg-rose-500/40 h-2"
                  : "bg-muted-foreground/30 h-3",
            )}
          />
          <span
            className={cn(
              "w-1 rounded-full transition-all",
              isPlaying
                ? "bg-primary animate-wave-5 h-6"
                : isPlayed
                  ? "bg-rose-500/40 h-2"
                  : "bg-muted-foreground/30 h-2",
            )}
          />
          <span
            className={cn(
              "w-1 rounded-full transition-all",
              isPlaying
                ? "bg-primary animate-wave-6 h-3"
                : isPlayed
                  ? "bg-rose-500/40 h-2"
                  : "bg-muted-foreground/30 h-2",
            )}
          />
        </div>
      </div>

      {/* Status Bar */}
      <div className="pt-2 border-t border-primary/10 flex flex-wrap items-center justify-between gap-2 text-xs">
        {audioPlaybackState === "idle" && (
          <>
            <span className="font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              Ready to Play • Press{" "}
              <kbd className="rounded bg-muted px-1.5 py-0.5 text-[10px] font-mono border">M</kbd>
            </span>
            <span className="text-muted-foreground">
              Single-playback constraint: Audio stimulus plays exactly once.
            </span>
          </>
        )}

        {audioPlaybackState === "playing" && (
          <>
            <span className="font-bold text-primary flex items-center gap-1.5 animate-pulse">
              <span className="h-2 w-2 rounded-full bg-primary animate-ping" />
              Playing audio stimulus... Please listen attentively.
            </span>
            <span className="text-muted-foreground">
              Single playback in progress • Do not navigate away.
            </span>
          </>
        )}

        {audioPlaybackState === "played" && (
          <>
            <span className="font-bold text-rose-600 dark:text-rose-400 flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4" /> Audio Playback Completed
            </span>
            <span className="text-muted-foreground">
              Permanently locked per ETS single-play testing regulations.
            </span>
          </>
        )}
      </div>
    </div>
  );
}
