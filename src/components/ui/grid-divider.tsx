import { cn } from "@/lib/utils";

interface GridDividerProps {
  className?: string;
  columns?: 1 | 3 | 4;
}

/**
 * Clean Architectural Grid Divider
 * The horizontal line gracefully fades out to transparent as it approaches the web boundaries.
 */
export function GridDivider({ className }: GridDividerProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "w-full h-px bg-gradient-to-r from-transparent via-border to-transparent pointer-events-none select-none",
        className,
      )}
    />
  );
}
