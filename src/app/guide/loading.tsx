import { Spinner } from "@heroui/react";

export default function GuideLoading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 p-8">
      <Spinner size="lg" color="accent" />
      <p className="text-xs font-mono uppercase tracking-widest text-muted-foreground animate-pulse">
        Loading Examination Handbook...
      </p>
    </div>
  );
}
