"use client";

import { startExamAction } from "@/actions/exam";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
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
        throw new Error(result.error || "Failed to start assessment");
      }

      toast.success("Starting assessment session...");
      router.push(result.redirectUrl);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to start assessment";
      toast.error(msg);
      setIsLoading(false);
    }
  };

  return (
    <Button
      onClick={handleStart}
      disabled={isLoading}
      className="h-10 px-6 text-sm font-semibold rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 border border-transparent shadow-none cursor-pointer"
    >
      {isLoading ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin mr-2" /> Starting...
        </>
      ) : (
        "Start Assessment"
      )}
    </Button>
  );
}
