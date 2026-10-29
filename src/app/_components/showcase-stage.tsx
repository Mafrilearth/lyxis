"use client";

import { Button, Chip } from "@heroui/react";
import {
  Award,
  Bot,
  Compass,
  Headphones,
  Pause,
  Play,
  ShieldCheck,
  Sparkles,
  Volume2,
} from "lucide-react";
import * as React from "react";

export function ShowcaseStage() {
  const [isPlaying, setIsPlaying] = React.useState(true);
  const [activeTab, setActiveTab] = React.useState<"default" | "brutalism" | "glass" | "mouve">(
    "mouve",
  );

  return (
    <div className="w-full max-w-6xl mx-auto rounded-[36px] p-2 sm:p-3 bg-surface-secondary/60 border-[2.5px] border-border shadow-2xl ring-1 ring-border/40">
      <div className="rounded-[28px] border-[2px] border-border/90 bg-background overflow-hidden flex flex-col">
        <div className="h-14 border-b border-border/90 bg-surface/95 px-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-danger border border-danger/80" />
              <span className="w-3 h-3 rounded-full bg-warning border border-warning/80" />
              <span className="w-3 h-3 rounded-full bg-success border border-success/80" />
            </div>
            <div className="h-4 w-px bg-border mx-1" />
            <div className="flex items-center gap-2 font-mono text-xs text-foreground font-semibold">
              <ShieldCheck className="w-4 h-4 text-accent" />
              <span>Lyxis CBT Diagnostic</span>
              <Chip
                size="sm"
                variant="soft"
                className="h-5 px-2 text-[10px] font-mono border border-border"
              >
                Pro Engine
              </Chip>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden sm:inline-block text-xs font-mono text-muted">
              115 Min • 140 Questions
            </span>
            <button
              type="button"
              className="rounded-full bg-accent text-accent-foreground text-xs font-semibold h-8 px-4 border border-white/20 shadow-[0_3px_8px_rgba(0,0,0,0.4)] hover:shadow-[0_2px_5px_rgba(0,0,0,0.3)] transition-all cursor-pointer"
            >
              Start Session
            </button>
          </div>
        </div>

        <div className="p-4 sm:p-6 lg:p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 bg-background">
          <div className="rounded-[28px] border-[2.5px] border-border/90 bg-surface p-4 flex flex-col justify-between shadow-[0_4px_16px_rgba(0,0,0,0.25)]">
            <div className="flex flex-col items-center">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-secondary border border-border text-[11px] font-medium text-muted mb-4 shadow-[0_2px_6px_rgba(0,0,0,0.2)]">
                <Compass className="w-3 h-3 text-accent" />
                <span>Section Matrix</span>
              </div>

              <div className="w-full space-y-2.5">
                <div className="rounded-2xl border border-border bg-surface-secondary/80 p-3 space-y-1 shadow-[0_2px_6px_rgba(0,0,0,0.2)]">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-foreground">Section 1: Listening</span>
                    <span className="text-[10px] font-mono text-accent bg-accent/15 px-2 py-0.5 rounded-full border border-accent/30 font-semibold shadow-[0_2px_4px_rgba(0,0,0,0.15)]">
                      Active
                    </span>
                  </div>
                  <p className="text-[11px] text-muted font-mono">50 Questions • 35 Mins</p>
                </div>

                <div className="rounded-2xl border border-border/70 bg-surface-secondary/40 p-3 space-y-1 shadow-[0_2px_6px_rgba(0,0,0,0.15)]">
                  <span className="text-xs font-bold text-foreground">Section 2: Structure</span>
                  <p className="text-[11px] text-muted font-mono">40 Questions • 25 Mins</p>
                </div>

                <div className="rounded-2xl border border-border/70 bg-surface-secondary/40 p-3 space-y-1 shadow-[0_2px_6px_rgba(0,0,0,0.15)]">
                  <span className="text-xs font-bold text-foreground">Section 3: Reading</span>
                  <p className="text-[11px] text-muted font-mono">50 Questions • 55 Mins</p>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <button
                type="button"
                className="w-full rounded-full bg-accent text-accent-foreground font-semibold text-xs h-9 border border-white/20 shadow-[0_4px_10px_rgba(0,0,0,0.45)] hover:shadow-[0_2px_6px_rgba(0,0,0,0.35)] transition-all cursor-pointer"
              >
                Select Package
              </button>
            </div>
          </div>

          <div className="rounded-[28px] border-[2.5px] border-border/90 bg-surface p-4 flex flex-col justify-between shadow-[0_4px_16px_rgba(0,0,0,0.25)]">
            <div className="flex flex-col items-center">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-secondary border border-border text-[11px] font-medium text-muted mb-4 shadow-[0_2px_6px_rgba(0,0,0,0.2)]">
                <Bot className="w-3 h-3 text-accent" />
                <span>AI Diagnostic</span>
              </div>

              <div className="w-full space-y-3">
                <div className="rounded-2xl border border-border bg-surface-secondary/80 p-3 text-xs leading-relaxed text-foreground shadow-[0_2px_6px_rgba(0,0,0,0.2)]">
                  Your syntax accuracy in Section 2 is calibrated at 88.5%. Target score 550+ for
                  LPDP is satisfied.
                </div>

                <div className="rounded-2xl border border-border/70 bg-surface-secondary/50 p-3.5 flex flex-col items-center justify-center text-center shadow-[0_2px_6px_rgba(0,0,0,0.15)]">
                  <div className="w-12 h-12 rounded-full bg-accent/15 border border-accent/30 flex items-center justify-center text-accent mb-2 shadow-[0_2px_6px_rgba(0,0,0,0.2)]">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-bold text-foreground">Adaptive Calibrator</span>
                  <span className="text-[10px] text-muted font-mono">CEFR Verified • B2+</span>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <div className="h-10 pl-3.5 pr-1.5 rounded-full bg-surface-secondary border border-border flex items-center justify-between shadow-[0_2px_6px_rgba(0,0,0,0.2)]">
                <span className="text-[11px] text-muted truncate">Ask anything...</span>
                <button
                  type="button"
                  className="rounded-full bg-accent text-accent-foreground px-3.5 py-1 text-xs font-semibold flex items-center gap-1.5 border border-white/20 shadow-[0_3px_8px_rgba(0,0,0,0.45)] hover:shadow-[0_2px_5px_rgba(0,0,0,0.3)] transition-all cursor-pointer"
                >
                  <span className="font-mono text-xs tracking-tighter">|||</span>
                  <span>Voice</span>
                </button>
              </div>
            </div>
          </div>

          <div className="rounded-[28px] border-[2.5px] border-border/90 bg-surface p-4 flex flex-col justify-between shadow-[0_4px_16px_rgba(0,0,0,0.25)]">
            <div className="flex flex-col items-center">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-secondary border border-border text-[11px] font-medium text-muted mb-4 shadow-[0_2px_6px_rgba(0,0,0,0.2)]">
                <Headphones className="w-3 h-3 text-accent" />
                <span>Music Player</span>
              </div>

              <div className="w-full space-y-3">
                <div className="rounded-2xl border border-border bg-surface-secondary/70 p-3 flex flex-col items-center text-center shadow-[0_2px_6px_rgba(0,0,0,0.2)]">
                  <div className="w-14 h-14 rounded-2xl bg-surface border border-border flex items-center justify-center mb-2 shadow-[0_2px_6px_rgba(0,0,0,0.25)]">
                    <Volume2 className="w-7 h-7 text-accent" />
                  </div>
                  <h4 className="text-xs font-bold text-foreground">North American Geology</h4>
                  <p className="text-[11px] text-muted font-mono">Prof. Vance • Lecture 04</p>
                </div>

                <div className="space-y-1.5 px-1">
                  <div className="h-1.5 w-full bg-surface-secondary rounded-full overflow-hidden border border-border/40 shadow-inner">
                    <div className="h-full bg-accent w-3/5 rounded-full" />
                  </div>
                  <div className="flex justify-between text-[10px] font-mono text-muted">
                    <span>02:18</span>
                    <span>03:45</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <div className="h-10 pl-3.5 pr-1.5 rounded-full bg-surface-secondary border border-border flex items-center justify-between shadow-[0_3px_8px_rgba(0,0,0,0.25)]">
                <div className="flex items-center gap-2 overflow-hidden">
                  <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                  <span className="text-xs font-semibold text-foreground truncate">Demons</span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="w-7 h-7 rounded-full bg-accent text-accent-foreground flex items-center justify-center border border-white/20 shadow-[0_3px_8px_rgba(0,0,0,0.45)] hover:shadow-[0_2px_5px_rgba(0,0,0,0.3)] transition-all cursor-pointer"
                  aria-label={isPlaying ? "Pause audio" : "Play audio"}
                >
                  {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>
          </div>

          <div className="rounded-[28px] border-[2.5px] border-border/90 bg-surface p-4 flex flex-col justify-between shadow-[0_4px_16px_rgba(0,0,0,0.25)]">
            <div className="flex flex-col items-center">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-secondary border border-border text-[11px] font-medium text-muted mb-4 shadow-[0_2px_6px_rgba(0,0,0,0.2)]">
                <Award className="w-3 h-3 text-accent" />
                <span>Score Outcome</span>
              </div>

              <div className="w-full space-y-3">
                <div className="rounded-2xl border border-border bg-surface-secondary/80 p-3.5 text-center shadow-[0_2px_6px_rgba(0,0,0,0.2)]">
                  <span className="text-[10px] font-mono text-muted uppercase tracking-wider block">
                    Scaled Diagnostic Score
                  </span>
                  <div className="flex items-baseline justify-center gap-1.5 mt-1">
                    <span className="text-4xl font-extrabold font-mono text-foreground tracking-tight">
                      587
                    </span>
                    <span className="text-xs font-mono text-muted">/ 677</span>
                  </div>
                  <span className="inline-block mt-2 text-[10px] font-mono text-accent bg-accent/15 px-2.5 py-0.5 rounded-full border border-accent/30 font-semibold shadow-[0_2px_4px_rgba(0,0,0,0.15)]">
                    CEFR B2 Vantage
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-1.5 text-center font-mono text-xs">
                  <div className="p-2 rounded-xl bg-surface-secondary border border-border shadow-[0_2px_4px_rgba(0,0,0,0.15)]">
                    <span className="block text-[9px] text-muted">L</span>
                    <span className="font-bold text-foreground">58</span>
                  </div>
                  <div className="p-2 rounded-xl bg-surface-secondary border border-border shadow-[0_2px_4px_rgba(0,0,0,0.15)]">
                    <span className="block text-[9px] text-muted">S</span>
                    <span className="font-bold text-foreground">59</span>
                  </div>
                  <div className="p-2 rounded-xl bg-surface-secondary border border-border shadow-[0_2px_4px_rgba(0,0,0,0.15)]">
                    <span className="block text-[9px] text-muted">R</span>
                    <span className="font-bold text-foreground">60</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <Button
                variant="outline"
                className="w-full rounded-full font-semibold text-xs h-9 border border-border bg-surface-secondary/70 hover:bg-surface-secondary shadow-[0_2px_6px_rgba(0,0,0,0.2)]"
              >
                Verify Credential
              </Button>
            </div>
          </div>
        </div>

        <div className="h-14 border-t border-border/90 bg-surface/95 px-6 flex items-center justify-center">
          <div className="inline-flex items-center p-1 rounded-full bg-surface-secondary border border-border shadow-[0_2px_6px_rgba(0,0,0,0.2)] text-xs font-medium">
            <button
              type="button"
              onClick={() => setActiveTab("default")}
              className={`px-4 py-1 rounded-full transition-all cursor-pointer ${
                activeTab === "default"
                  ? "bg-accent text-accent-foreground font-semibold border border-white/20 shadow-[0_3px_8px_rgba(0,0,0,0.4)]"
                  : "text-muted hover:text-foreground"
              }`}
            >
              Default
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("brutalism")}
              className={`px-4 py-1 rounded-full transition-all cursor-pointer ${
                activeTab === "brutalism"
                  ? "bg-accent text-accent-foreground font-semibold border border-white/20 shadow-[0_3px_8px_rgba(0,0,0,0.4)]"
                  : "text-muted hover:text-foreground"
              }`}
            >
              Brutalism
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("glass")}
              className={`px-4 py-1 rounded-full transition-all cursor-pointer ${
                activeTab === "glass"
                  ? "bg-accent text-accent-foreground font-semibold border border-white/20 shadow-[0_3px_8px_rgba(0,0,0,0.4)]"
                  : "text-muted hover:text-foreground"
              }`}
            >
              Glass
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("mouve")}
              className={`px-4 py-1 rounded-full transition-all cursor-pointer ${
                activeTab === "mouve"
                  ? "bg-accent text-accent-foreground font-semibold border border-white/20 shadow-[0_3px_8px_rgba(0,0,0,0.4)]"
                  : "text-muted hover:text-foreground"
              }`}
            >
              Mouve
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
