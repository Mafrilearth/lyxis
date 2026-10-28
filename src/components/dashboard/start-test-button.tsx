"use client";

import { startExamAction } from "@/actions/exam";
import { Button } from "@/components/ui/button";
import { Loader2, Play } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

interface StartTestButtonProps {
  candidateName: string;
  candidateEmail: string;
}

export function StartTestButton({ candidateName, candidateEmail }: StartTestButtonProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleStart = async () => {
    try {
      setIsLoading(true);
      const result = await startExamAction({
        fullName: candidateName || "Candidate",
        email: candidateEmail || "candidate@lyxis.mafrilearth.com",
      });

      if (!result.success || !result.redirectUrl) {
        throw new Error(result.error || "Failed to initialize assessment session");
      }

      toast.success("Assessment session initialized. Transitioning to testing console...");
      router.push(result.redirectUrl);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to initialize assessment session";
      toast.error(msg);
      setIsLoading(false);
    }
  };

  return (
    <Button
      onClick={handleStart}
      disabled={isLoading}
      size="default"
      className="h-13 sm:h-14 px-8 rounded-2xl font-bold gap-3 text-sm sm:text-base shrink-0 shadow-lg shadow-primary/25 hover:shadow-primary/40 cursor-pointer transition-all active:scale-[0.98]"
    >
      {isLoading ? (
        <>
          <Loader2 className="h-5 w-5 animate-spin" /> Preparing Assessment...
        </>
      ) : (
        <>
          <Play className="h-5 w-5" /> Launch Assessment Form A
        </>
      )}
    </Button>
  );
}
