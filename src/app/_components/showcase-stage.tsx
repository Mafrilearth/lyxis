"use client";

import { Button, Card, Chip } from "@heroui/react";
import {
  Award,
  Bot,
  CheckCircle2,
  Headphones,
  Layers,
  Pause,
  Play,
  Sparkles,
  Volume2,
} from "lucide-react";
import * as React from "react";

export function ShowcaseStage() {
  const [isPlaying, setIsPlaying] = React.useState(true);

  return (
    <div className="w-full max-w-6xl mx-auto rounded-3xl border border-border bg-surface/80 backdrop-blur-xl shadow-2xl overflow-hidden">
      <div className="h-12 border-b border-border bg-surface-secondary/60 px-4 sm:px-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-danger/80" />
          <div className="w-3 h-3 rounded-full bg-warning/80" />
          <div className="w-3 h-3 rounded-full bg-success/80" />
          <span className="ml-3 font-mono text-xs text-muted">lyxis-cbt-diagnostic-engine</span>
        </div>
        <div className="flex items-center gap-3">
          <Chip size="sm" variant="soft" className="border border-border font-mono text-xs">
            115 Min • 140 Items
          </Chip>
        </div>
      </div>

      <div className="p-4 sm:p-6 lg:p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 bg-background/50">
        <Card className="border border-border bg-surface/90 rounded-2xl flex flex-col justify-between p-4 shadow-sm">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2 text-xs font-semibold tracking-wider text-muted uppercase">
                <Layers className="w-3.5 h-3.5 text-accent" />
                Exam Matrix
              </span>
              <Chip size="sm" variant="soft" className="text-[11px] font-mono border border-border">
                Sec 01-03
              </Chip>
            </div>

            <div className="space-y-2">
              <div className="p-3 rounded-xl bg-surface-secondary/70 border border-border/80">
                <p className="text-xs font-semibold text-foreground">Listening Comprehension</p>
                <p className="text-[11px] text-muted font-mono mt-0.5">50 Questions • 35 Mins</p>
              </div>

              <div className="p-3 rounded-xl bg-surface-secondary/40 border border-border/50">
                <p className="text-xs font-semibold text-foreground">Structure & Written</p>
                <p className="text-[11px] text-muted font-mono mt-0.5">40 Questions • 25 Mins</p>
              </div>

              <div className="p-3 rounded-xl bg-surface-secondary/40 border border-border/50">
                <p className="text-xs font-semibold text-foreground">Reading Comprehension</p>
                <p className="text-[11px] text-muted font-mono mt-0.5">50 Questions • 55 Mins</p>
              </div>
            </div>
          </div>

          <div className="pt-4">
            <Button variant="primary" className="w-full rounded-full font-medium text-xs h-9">
              Start Session
            </Button>
          </div>
        </Card>

        <Card className="border border-border bg-surface/90 rounded-2xl flex flex-col justify-between p-4 shadow-sm">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2 text-xs font-semibold tracking-wider text-muted uppercase">
                <Bot className="w-3.5 h-3.5 text-accent" />
                AI Diagnostic
              </span>
              <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
            </div>

            <div className="p-3.5 rounded-xl bg-surface-secondary/80 border border-border text-xs leading-relaxed text-foreground">
              Based on your calibrated responses, your syntax accuracy reached 88.5%. Your target
              score of 550+ for LPDP scholarship is satisfied.
            </div>

            <div className="h-28 rounded-xl bg-surface-secondary/40 border border-border/60 flex flex-col items-center justify-center text-center p-3">
              <div className="w-10 h-10 rounded-full bg-accent/15 border border-accent/30 flex items-center justify-center text-accent mb-2">
                <Sparkles className="w-5 h-5" />
              </div>
              <span className="text-xs font-semibold text-foreground">
                Adaptive Item Calibrator
              </span>
              <span className="text-[10px] text-muted font-mono">
                Zero Ambiguation • Standard CEFR
              </span>
            </div>
          </div>

          <div className="pt-4">
            <div className="h-9 px-3 rounded-full bg-surface-secondary border border-border flex items-center justify-between">
              <span className="text-[11px] text-muted">Ask grammar rationale...</span>
              <span className="text-[10px] font-mono bg-accent/20 text-accent px-2 py-0.5 rounded-full">
                Explain
              </span>
            </div>
          </div>
        </Card>

        <Card className="border border-border bg-surface/90 rounded-2xl flex flex-col justify-between p-4 shadow-sm">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2 text-xs font-semibold tracking-wider text-muted uppercase">
                <Headphones className="w-3.5 h-3.5 text-accent" />
                Listening Audio
              </span>
              <Chip size="sm" variant="soft" className="text-[10px] font-mono border border-border">
                ETS Master
              </Chip>
            </div>

            <div className="space-y-1">
              <h4 className="text-sm font-semibold text-foreground">Geology: Glacial Moraines</h4>
              <p className="text-xs text-muted font-mono">Prof. Vance • Lecture 04</p>
            </div>

            <div className="space-y-2">
              <div className="h-1.5 w-full bg-surface-secondary rounded-full overflow-hidden">
                <div className="h-full bg-accent w-2/3 rounded-full" />
              </div>
              <div className="flex justify-between text-[10px] font-mono text-muted">
                <span>02:18</span>
                <span>03:45</span>
              </div>
            </div>

            <div className="p-2 rounded-xl bg-surface-secondary/50 border border-border/60 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Volume2 className="w-4 h-4 text-accent" />
                <span className="text-xs font-medium text-foreground">Single-Play Lock</span>
              </div>
              <span className="text-[10px] font-mono text-muted">Active</span>
            </div>
          </div>

          <div className="pt-4 flex items-center justify-center">
            <div className="w-full h-10 px-3 rounded-full bg-surface-secondary border border-border flex items-center justify-between">
              <div className="flex items-center gap-2 overflow-hidden">
                <span className="w-2 h-2 rounded-full bg-accent" />
                <span className="text-xs font-medium text-foreground truncate">
                  Lecture 04 Audio
                </span>
              </div>
              <Button
                size="sm"
                variant="primary"
                onPress={() => setIsPlaying(!isPlaying)}
                className="w-7 h-7 rounded-full p-0 min-w-0"
                aria-label={isPlaying ? "Pause audio" : "Play audio"}
              >
                {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              </Button>
            </div>
          </div>
        </Card>

        <Card className="border border-border bg-surface/90 rounded-2xl flex flex-col justify-between p-4 shadow-sm">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2 text-xs font-semibold tracking-wider text-muted uppercase">
                <Award className="w-3.5 h-3.5 text-accent" />
                Score Outcome
              </span>
              <CheckCircle2 className="w-4 h-4 text-success" />
            </div>

            <div>
              <p className="text-[11px] text-muted font-medium">Predicted TOEFL ITP® Score</p>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-4xl font-extrabold tracking-tight text-foreground font-mono">
                  587
                </span>
                <span className="text-xs font-mono text-muted">/ 677</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-1.5 text-center font-mono text-xs">
              <div className="p-2 rounded-lg bg-surface-secondary border border-border/60">
                <span className="block text-[10px] text-muted">L</span>
                <span className="font-semibold text-foreground">58</span>
              </div>
              <div className="p-2 rounded-lg bg-surface-secondary border border-border/60">
                <span className="block text-[10px] text-muted">S</span>
                <span className="font-semibold text-foreground">59</span>
              </div>
              <div className="p-2 rounded-lg bg-surface-secondary border border-border/60">
                <span className="block text-[10px] text-muted">R</span>
                <span className="font-semibold text-foreground">60</span>
              </div>
            </div>

            <div className="text-[11px] text-muted flex items-center justify-between border-t border-border/60 pt-2 font-mono">
              <span>CEFR Level</span>
              <span className="font-semibold text-accent">B2 Vantage</span>
            </div>
          </div>

          <div className="pt-4">
            <Button
              variant="outline"
              className="w-full rounded-full font-medium text-xs h-9 border-border hover:bg-surface-secondary"
            >
              Verify Credential
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
