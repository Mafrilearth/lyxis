"use client";

import { Button, Card, Chip } from "@heroui/react";
import { AlertTriangle, RotateCcw } from "lucide-react";
import { useEffect } from "react";

export default function ExamError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Exam attempt runtime error captured:", error);
  }, [error]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-background text-foreground p-6">
      <Card className="max-w-md w-full border border-danger/30 bg-surface/90 backdrop-blur-md p-6 text-center space-y-5 shadow-2xl">
        <div className="flex justify-center">
          <div className="size-14 rounded-2xl bg-danger/10 border border-danger/20 flex items-center justify-center text-danger">
            <AlertTriangle className="size-7" />
          </div>
        </div>

        <div className="space-y-1.5">
          <div className="flex justify-center">
            <Chip size="sm" variant="soft" className="text-xs text-danger">
              Test Session Alert
            </Chip>
          </div>
          <h2 className="text-xl font-bold tracking-tight">Assessment Session Interrupted</h2>
          <p className="text-xs text-muted-foreground leading-relaxed">
            {error.message ||
              "A secure session communication error occurred. Your answered questions remain safely persisted."}
          </p>
        </div>

        <div className="pt-2 flex justify-center">
          <Button variant="primary" size="md" onPress={() => reset()} className="cursor-pointer">
            <RotateCcw className="size-3.5 mr-1.5" /> Reconnect & Resume Exam
          </Button>
        </div>
      </Card>
    </div>
  );
}
