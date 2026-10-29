"use client";

import { Button, Card, Chip } from "@heroui/react";
import { AlertCircle, RotateCcw } from "lucide-react";
import { useEffect } from "react";

export default function AttemptDetailError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Candidate audit detail error captured:", error);
  }, [error]);

  return (
    <div className="flex items-center justify-center min-h-[60vh] p-6">
      <Card className="max-w-md w-full border border-danger/30 bg-surface/90 backdrop-blur-md p-6 text-center space-y-5 shadow-xl">
        <div className="flex justify-center">
          <div className="size-14 rounded-2xl bg-danger/10 border border-danger/20 flex items-center justify-center text-danger">
            <AlertCircle className="size-7" />
          </div>
        </div>

        <div className="space-y-1.5">
          <div className="flex justify-center">
            <Chip size="sm" variant="soft" className="text-xs text-danger">
              Audit Telemetry Failure
            </Chip>
          </div>
          <h2 className="text-xl font-bold tracking-tight">Could Not Load Candidate Dossier</h2>
          <p className="text-xs text-muted-foreground leading-relaxed">
            {error.message ||
              "An unexpected error occurred while compiling audit logs from the database."}
          </p>
        </div>

        <div className="pt-2 flex justify-center">
          <Button variant="primary" size="md" onPress={() => reset()} className="cursor-pointer">
            <RotateCcw className="size-3.5 mr-1.5" /> Re-sync Audit Record
          </Button>
        </div>
      </Card>
    </div>
  );
}
