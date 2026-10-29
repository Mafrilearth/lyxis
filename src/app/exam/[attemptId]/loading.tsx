import { Spinner } from "@heroui/react";

export default function ExamLoading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4 p-8 bg-background text-foreground">
      <Spinner size="lg" color="accent" />
      <p className="text-xs font-mono uppercase tracking-widest text-muted-foreground animate-pulse">
        Initializing Secure Computer-Based Testing Environment...
      </p>
    </div>
  );
}
