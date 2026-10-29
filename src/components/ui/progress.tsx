"use client";

import * as React from "react";
import { ProgressBar } from "@heroui/react";
import { cn } from "@/lib/utils";

interface ProgressProps extends React.ComponentProps<typeof ProgressBar> {
  value?: number;
}

function Progress({ className, value = 0, children, ...props }: ProgressProps) {
  return (
    <ProgressBar
      aria-label="Progress"
      value={value}
      className={cn("w-full flex flex-col gap-1.5", className)}
      {...props}
    >
      {children ? (
        children
      ) : (
        <ProgressBar.Track className="h-2 w-full rounded-full bg-muted overflow-hidden">
          <ProgressBar.Fill className="h-full bg-primary transition-all duration-300" />
        </ProgressBar.Track>
      )}
    </ProgressBar>
  );
}

const ProgressTrack = ProgressBar.Track;
const ProgressIndicator = ProgressBar.Fill;
const ProgressValue = ProgressBar.Output;

export { Progress, ProgressTrack, ProgressIndicator, ProgressValue };
