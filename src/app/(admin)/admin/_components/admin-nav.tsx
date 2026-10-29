"use client";

import * as React from "react";
import type { Route } from "next";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button, Chip } from "@heroui/react";
import {
  FolderIcon,
  HomeIcon,
  LayoutDashboardIcon,
  LogOutIcon,
  MenuIcon,
  ShieldCheckIcon,
  UsersIcon,
  XIcon,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";

interface NavItem {
  title: string;
  href: Route;
  icon: React.ComponentType<{ className?: string }>;
  exact: boolean;
}

const navItems: NavItem[] = [
  {
    title: "Overview",
    href: "/admin",
    icon: LayoutDashboardIcon,
    exact: true,
  },
  {
    title: "Test Packages",
    href: "/admin/packages",
    icon: FolderIcon,
    exact: false,
  },
  {
    title: "Candidate Attempts",
    href: "/admin/attempts",
    icon: UsersIcon,
    exact: false,
  },
];

export function AdminNav({ userEmail }: { userEmail: string }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    window.location.href = "/login";
  };

  const isActive = (href: string, exact: boolean) => {
    if (exact) return pathname === href;
    return pathname.startsWith(href);
  };

  return (
    <>
      <header className="lg:hidden flex h-14 items-center justify-between border-b bg-surface px-4">
        <div className="flex items-center gap-2">
          <Link
            href="/admin"
            className="font-bold tracking-tight text-base flex items-center gap-2"
          >
            <span className="text-primary font-black">LYXIS</span>
            <Chip size="sm" variant="soft" className="text-[10px]">
              Admin
            </Chip>
          </Link>
        </div>
        <Button
          size="sm"
          variant="outline"
          onPress={() => setMobileOpen(!mobileOpen)}
          className="size-8 p-0"
          aria-label="Toggle Navigation"
        >
          {mobileOpen ? <XIcon className="size-4" /> : <MenuIcon className="size-4" />}
        </Button>
      </header>

      {mobileOpen && (
        <div className="lg:hidden border-b bg-surface p-4 space-y-3">
          <nav className="flex flex-col gap-1">
            {navItems.map((item) => {
              const active = isActive(item.href, item.exact);
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-medium transition-colors ${
                    active
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-surface-secondary hover:text-foreground"
                  }`}
                >
                  <Icon className="size-4" />
                  <span>{item.title}</span>
                </Link>
              );
            })}
          </nav>
          <div className="pt-2 border-t flex items-center justify-between text-xs">
            <span className="text-muted-foreground truncate max-w-[180px]">{userEmail}</span>
            <Button
              size="sm"
              variant="ghost"
              onPress={handleLogout}
              className="h-7 text-xs text-rose-500"
            >
              <LogOutIcon className="size-3.5 mr-1" /> Logout
            </Button>
          </div>
        </div>
      )}

      <aside className="hidden lg:flex w-64 flex-col border-r bg-surface shrink-0 h-screen sticky top-0">
        <div className="flex h-14 items-center justify-between border-b px-5">
          <Link href="/admin" className="flex items-center gap-2 font-bold tracking-tight">
            <span className="text-primary font-black text-lg">LYXIS</span>
            <Chip size="sm" variant="soft" className="text-[10px]">
              Admin Console
            </Chip>
          </Link>
        </div>

        <div className="flex-1 overflow-y-auto p-3 space-y-6">
          <div className="space-y-1">
            <p className="px-3 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/70">
              Operations
            </p>
            <nav className="flex flex-col gap-1 pt-1">
              {navItems.map((item) => {
                const active = isActive(item.href, item.exact);
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-medium transition-colors ${
                      active
                        ? "bg-primary text-primary-foreground shadow-sm"
                        : "text-muted-foreground hover:bg-surface-secondary hover:text-foreground"
                    }`}
                  >
                    <Icon className="size-4" />
                    <span>{item.title}</span>
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="space-y-1">
            <p className="px-3 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/70">
              Candidate View
            </p>
            <nav className="flex flex-col gap-1 pt-1">
              <Link
                href="/candidate/dashboard"
                className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-medium text-muted-foreground hover:bg-surface-secondary hover:text-foreground transition-colors"
              >
                <HomeIcon className="size-4" />
                <span>Student Dashboard</span>
              </Link>
            </nav>
          </div>

          <div className="rounded-xl border bg-surface-secondary/40 p-3 space-y-2">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
              <ShieldCheckIcon className="size-4" />
              <span>ETS ITP® Level 1</span>
            </div>
            <p className="text-[11px] text-muted-foreground leading-relaxed">
              Standardized 140-item diagnostic engine conforming to CEFR mapping and ISO/IEC 23988
              proctoring standards.
            </p>
          </div>
        </div>

        <div className="border-t p-3 bg-surface-secondary/20">
          <div className="flex items-center justify-between">
            <div className="flex flex-col min-w-0 pr-2">
              <span className="text-xs font-semibold truncate text-foreground">Lyxis Admin</span>
              <span className="text-[11px] text-muted-foreground truncate">{userEmail}</span>
            </div>
            <Button
              size="sm"
              variant="ghost"
              onPress={handleLogout}
              className="size-8 p-0 text-muted-foreground hover:text-rose-500"
              aria-label="Sign Out"
            >
              <LogOutIcon className="size-4" />
            </Button>
          </div>
        </div>
      </aside>
    </>
  );
}
