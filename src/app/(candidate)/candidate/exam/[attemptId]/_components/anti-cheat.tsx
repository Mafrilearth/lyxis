"use client";

import { recordTelemetryAction } from "@/actions/exam";
import { useExamStore } from "@/lib/store/exam-store";
import { useEffect, useRef } from "react";
import { toast } from "sonner";

interface AntiCheatSensorProps {
  attemptId: string;
}

export function AntiCheatSensor({ attemptId }: AntiCheatSensorProps) {
  const incrementTabSwitch = useExamStore((state) => state.incrementTabSwitch);
  const isSubmitting = useExamStore((state) => state.isSubmitting);
  const lastLoggedRef = useRef<number>(0);

  useEffect(() => {
    if (isSubmitting) return;

    const handleIncident = (reason: "tab_blur" | "visibility_hidden") => {
      const now = Date.now();
      if (now - lastLoggedRef.current < 2000) {
        return;
      }
      lastLoggedRef.current = now;

      incrementTabSwitch();

      toast.warning("Proctoring Telemetry Alert", {
        description:
          "Window focus lost or tab switch detected. This event has been permanently recorded in your examination audit log.",
        duration: 4000,
      });

      try {
        recordTelemetryAction({
          attemptId,
          eventType: reason,
          browserInfo: typeof navigator !== "undefined" ? navigator.userAgent : undefined,
        }).catch(() => {});
      } catch {}
    };

    const onVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        handleIncident("visibility_hidden");
      }
    };

    const onBlur = () => {
      handleIncident("tab_blur");
    };

    window.addEventListener("blur", onBlur);
    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      window.removeEventListener("blur", onBlur);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, [attemptId, incrementTabSwitch, isSubmitting]);

  return null;
}
