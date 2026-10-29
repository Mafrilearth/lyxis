"use client";

import { useEffect } from "react";
import { Button, Card, Chip } from "@heroui/react";
import { buttonVariants } from "@heroui/styles";
import { AlertTriangle, RotateCcw } from "lucide-react";
import Link from "next/link";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[Next.js Error Boundary Caught]:", error);
  }, [error]);

  return (
    <main className="min-h-screen bg-background text-foreground flex items-center justify-center p-4">
      <Card className="max-w-md w-full border border-danger/30 bg-surface/80 backdrop-blur-md p-6 text-center space-y-6 shadow-2xl">
        <div className="flex justify-center">
          <div className="size-16 rounded-2xl bg-danger/10 border border-danger/20 flex items-center justify-center text-danger">
            <AlertTriangle className="size-8" />
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-center">
            <Chip size="sm" variant="soft" className="text-xs text-danger">
              Execution Boundary Interrupted
            </Chip>
          </div>
          <h1 className="text-2xl font-black tracking-tight">Diagnostic Pipeline Fault</h1>
          <p className="text-xs text-muted-foreground leading-relaxed">
            An unexpected error occurred during execution. The current session has been preserved to
            prevent diagnostic corruption.
          </p>
          {error.digest && (
            <p className="text-[11px] font-mono text-muted-foreground/70 bg-surface-secondary px-2 py-1 rounded inline-block">
              Digest: {error.digest}
            </p>
          )}
        </div>

        <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            variant="primary"
            onPress={() => reset()}
            className="h-10 px-5 text-xs font-semibold rounded-lg bg-primary text-primary-foreground"
          >
            <RotateCcw className="size-3.5 mr-1.5" /> Retry Execution
          </Button>
          <Link href="/dashboard" className={buttonVariants({ variant: "ghost", size: "md" })}>
            Candidate Portal
          </Link>
        </div>
      </Card>
    </main>
  );
}
