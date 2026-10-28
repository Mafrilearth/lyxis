export interface NavItem {
  readonly label: string;
  readonly href: string;
}

export const NAV_LINKS: readonly NavItem[] = [
  { label: "Standards", href: "#features" },
  { label: "How It Works", href: "#flow" },
  { label: "FAQ", href: "#faq" },
] as const;

export const FOOTER_LINKS: readonly NavItem[] = [
  ...NAV_LINKS,
  { label: "Candidate Portal", href: "/dashboard" },
] as const;
