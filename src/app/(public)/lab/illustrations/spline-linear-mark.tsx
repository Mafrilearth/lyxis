"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { Loader2, RotateCcw, Box } from "lucide-react";

// Spline runtime requires WebGL / browser canvas, so disable SSR
const Spline = dynamic(() => import("@splinetool/react-spline"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full min-h-[300px] flex flex-col items-center justify-center text-muted-foreground gap-3">
      <Loader2 className="w-6 h-6 animate-spin text-primary" />
      <span className="text-xs font-mono">INITIALIZING SPLINE 3D RUNTIME...</span>
    </div>
  ),
});

/**
 * Level 6: Spline 3D Interactive Web Experience
 * - Single all-in-one package: @splinetool/react-spline & @splinetool/runtime
 * - Zero manual WebGL boilerplate
 * - Direct GPU canvas rendering with interactive cursor tracking
 */
export function SplineLinearMark() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  return (
    <div className="relative w-full h-[360px] sm:h-[420px] flex items-center justify-center rounded-2xl bg-neutral-950/60 border border-border/40 overflow-hidden">
      {!hasError ? (
        <div
          className={`w-full h-full flex items-center justify-center transition-opacity duration-500 ${isLoaded ? "opacity-100" : "opacity-0"}`}
        >
          <Spline
            scene="https://prod.spline.design/6Wq1Q7YGyM-iab9i/scene.splinecode"
            onLoad={() => setIsLoaded(true)}
            onError={() => setHasError(true)}
            className="w-full h-full"
          />
        </div>
      ) : (
        /* Graceful offline/network fallback */
        <div className="flex flex-col items-center justify-center text-center p-8 space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
            <Box className="w-8 h-8 animate-pulse" />
          </div>
          <div className="space-y-1">
            <p className="text-sm font-semibold text-foreground">Spline 3D Runtime Ready</p>
            <p className="text-xs text-muted-foreground max-w-xs">
              Interactive 3D canvas engine configured for Level 6. Connect your published scene URL
              to display custom 3D geometry.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setHasError(false)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono bg-muted/60 hover:bg-muted text-muted-foreground transition-colors"
          >
            <RotateCcw className="w-3 h-3" /> Retry Scene Connection
          </button>
        </div>
      )}

      {/* Level 6 Floating Badge */}
      <div className="absolute top-4 right-4 pointer-events-none">
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-background/80 backdrop-blur-md border border-border text-foreground">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
          LEVEL 6: SPLINE 3D
        </span>
      </div>
    </div>
  );
}
