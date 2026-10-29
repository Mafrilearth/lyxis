import { cn } from "@/lib/utils";

interface GridDividerProps {
  className?: string;
  columns?: 1 | 3 | 4;
}

/**
 * Clean Horizontal Grid Divider
 * Pure continuous border line without any crosshair (+) marks.
 */
export function GridDivider({ className }: GridDividerProps) {
  return (
    <div
      aria-hidden="true"
      className={cn("w-full border-b border-border pointer-events-none select-none", className)}
    />
  );
}
