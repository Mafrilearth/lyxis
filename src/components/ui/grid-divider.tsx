import { cn } from "@/lib/utils";

interface GridDividerProps {
  className?: string;
  columns?: 1 | 3 | 4;
}

/**
 * Pixel-Perfect CAD Grid Line Divider
 * Mathematically centered crosshairs at exact border intersection vertices.
 * Height is 0px with no padding, eliminating any CSS box-model displacement.
 */
export function GridDivider({ className, columns = 1 }: GridDividerProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "relative w-full border-b border-border/40 h-0 pointer-events-none select-none z-20",
        className,
      )}
    >
      {/* Outer Left Intersection */}
      <svg
        viewBox="0 0 11 11"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute -left-[5.5px] -top-[5.5px] w-[11px] h-[11px] text-zinc-500"
      >
        <title>Grid Crosshair Left</title>
        <path d="M5.5 0V11M0 5.5H11" stroke="currentColor" strokeWidth="1" strokeLinecap="square" />
      </svg>

      {/* 3-Column Intermediate Intersections */}
      {columns === 3 && (
        <>
          <svg
            viewBox="0 0 11 11"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="hidden md:block absolute left-1/3 -translate-x-[5.5px] -top-[5.5px] w-[11px] h-[11px] text-zinc-500"
          >
            <title>Grid Crosshair Column 1</title>
            <path
              d="M5.5 0V11M0 5.5H11"
              stroke="currentColor"
              strokeWidth="1"
              strokeLinecap="square"
            />
          </svg>
          <svg
            viewBox="0 0 11 11"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="hidden md:block absolute left-2/3 -translate-x-[5.5px] -top-[5.5px] w-[11px] h-[11px] text-zinc-500"
          >
            <title>Grid Crosshair Column 2</title>
            <path
              d="M5.5 0V11M0 5.5H11"
              stroke="currentColor"
              strokeWidth="1"
              strokeLinecap="square"
            />
          </svg>
        </>
      )}

      {/* 4-Column Intermediate Intersections */}
      {columns === 4 && (
        <>
          <svg
            viewBox="0 0 11 11"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="hidden lg:block absolute left-1/4 -translate-x-[5.5px] -top-[5.5px] w-[11px] h-[11px] text-zinc-500"
          >
            <title>Grid Crosshair Column 1</title>
            <path
              d="M5.5 0V11M0 5.5H11"
              stroke="currentColor"
              strokeWidth="1"
              strokeLinecap="square"
            />
          </svg>
          <svg
            viewBox="0 0 11 11"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="hidden sm:block absolute left-1/2 -translate-x-[5.5px] -top-[5.5px] w-[11px] h-[11px] text-zinc-500"
          >
            <title>Grid Crosshair Column 2</title>
            <path
              d="M5.5 0V11M0 5.5H11"
              stroke="currentColor"
              strokeWidth="1"
              strokeLinecap="square"
            />
          </svg>
          <svg
            viewBox="0 0 11 11"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="hidden lg:block absolute left-3/4 -translate-x-[5.5px] -top-[5.5px] w-[11px] h-[11px] text-zinc-500"
          >
            <title>Grid Crosshair Column 3</title>
            <path
              d="M5.5 0V11M0 5.5H11"
              stroke="currentColor"
              strokeWidth="1"
              strokeLinecap="square"
            />
          </svg>
        </>
      )}

      {/* Outer Right Intersection */}
      <svg
        viewBox="0 0 11 11"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute -right-[5.5px] -top-[5.5px] w-[11px] h-[11px] text-zinc-500"
      >
        <title>Grid Crosshair Right</title>
        <path d="M5.5 0V11M0 5.5H11" stroke="currentColor" strokeWidth="1" strokeLinecap="square" />
      </svg>
    </div>
  );
}
