export interface NavItem {
  readonly label: string;
  readonly href: string;
}

export const NAV_LINKS: readonly NavItem[] = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Admin", href: "/admin" },
] as const;

export const FOOTER_LINKS: readonly NavItem[] = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Admin Console", href: "/admin" },
  { label: "Sign In", href: "/login" },
  { label: "Register", href: "/register" },
] as const;
