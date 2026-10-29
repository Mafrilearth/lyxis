import { cn } from "@/lib/utils";

interface GridCrosshairProps {
  className?: string;
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right" | "center";
}

/**
 * Pixel-Perfect CAD Grid Intersection Crosshair
 * Replaces imprecise font glyphs with mathematically centered 1px vector lines.
 * Exactly aligns with 1px border intersections.
 */
export function GridCrosshair({ className, position = "top-left" }: GridCrosshairProps) {
  const positionClasses = {
    "top-left": "top-0 left-0",
    "top-right": "top-0 right-0",
    "bottom-left": "bottom-0 left-0",
    "bottom-right": "bottom-0 right-0",
    center: "top-1/2 left-1/2",
  };

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 11 11"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(
        "absolute -translate-x-1/2 -translate-y-1/2 w-[11px] h-[11px] text-zinc-500 pointer-events-none select-none z-20",
        positionClasses[position],
        className,
      )}
    >
      <title>Grid Crosshair</title>
      <path d="M5.5 0V11M0 5.5H11" stroke="currentColor" strokeWidth="1" strokeLinecap="square" />
    </svg>
  );
}
