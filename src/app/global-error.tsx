"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[Next.js Global Root Error]:", error);
  }, [error]);

  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-[#07080B] text-[#F8FAFC] flex items-center justify-center p-4 font-sans antialiased">
        <div className="max-w-md w-full border border-red-500/30 bg-[#0E131F]/90 backdrop-blur-md p-6 text-center space-y-6 rounded-2xl shadow-2xl">
          <div className="flex justify-center">
            <div className="size-16 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-500 text-2xl font-bold">
              !
            </div>
          </div>

          <div className="space-y-2">
            <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-500/10 text-red-400 border border-red-500/20">
              Fatal Root Layout Fault
            </span>
            <h1 className="text-2xl font-black tracking-tight">System Critical Failure</h1>
            <p className="text-xs text-neutral-400 leading-relaxed">
              A critical failure compromised the application root layout. The execution pipeline was
              isolated to safeguard database integrity.
            </p>
            {error.digest && (
              <p className="text-[11px] font-mono text-neutral-500 bg-neutral-900 px-2 py-1 rounded inline-block">
                Digest: {error.digest}
              </p>
            )}
          </div>

          <div className="pt-2 flex justify-center">
            <button
              type="button"
              onClick={() => reset()}
              className="h-10 px-6 text-xs font-semibold rounded-lg bg-red-600 text-white hover:bg-red-500 transition-colors cursor-pointer"
            >
              Reset Core Application
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
