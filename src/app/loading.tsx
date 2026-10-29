import { Spinner } from "@heroui/react";

export default function Loading() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center p-6 space-y-4">
      <div className="size-12 rounded-2xl bg-surface border border-border/40 flex items-center justify-center shadow-lg">
        <Spinner size="md" color="accent" />
      </div>
      <div className="text-center space-y-1">
        <p className="text-xs font-semibold tracking-wider uppercase text-muted-foreground">
          Lyxis Testing Platform
        </p>
        <p className="text-[11px] text-muted-foreground/60 font-mono">
          Streaming diagnostic environment...
        </p>
      </div>
    </div>
  );
}
