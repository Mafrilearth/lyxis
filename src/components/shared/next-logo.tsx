export function NextLogo({ className = "w-full h-full" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 180 180"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Next.js Logo"
    >
      <title>Next.js Logo</title>
      <mask
        id="nextjs-logo-mask"
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="180"
        height="180"
        style={{ maskType: "alpha" }}
      >
        <circle cx="90" cy="90" r="90" fill="black" />
      </mask>
      <g mask="url(#nextjs-logo-mask)">
        <circle cx="90" cy="90" r="90" fill="currentColor" />
        <path
          d="M149.508 157.52L69.142 54H54V125.97H66.1136V69.3836L139.999 164.845C143.333 162.614 146.509 160.165 149.508 157.52Z"
          fill="var(--background, #07080B)"
        />
        <rect x="115" y="54" width="12" height="72" fill="var(--background, #07080B)" />
      </g>
    </svg>
  );
}
