import { Spinner } from "@heroui/react";

export default function DashboardLoading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] gap-4 p-8">
      <Spinner size="lg" color="accent" />
      <p className="text-xs font-mono uppercase tracking-widest text-muted-foreground animate-pulse">
        Retrieving Candidate Profile & Test History...
      </p>
    </div>
  );
}
