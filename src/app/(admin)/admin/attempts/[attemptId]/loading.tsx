import { Spinner } from "@heroui/react";

export default function AttemptDetailLoading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 p-8">
      <Spinner size="lg" color="accent" />
      <p className="text-xs font-mono uppercase tracking-widest text-muted-foreground animate-pulse">
        Retrieving Candidate Proctoring Telemetry Dossier...
      </p>
    </div>
  );
}
