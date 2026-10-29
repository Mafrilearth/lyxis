"use client";

import { ThemeToggle } from "@/components/shared/theme-toggle";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { ArrowUpRight, Menu, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { NAV_LINKS } from "@/lib/constants/navigation";

export function FloatingNav() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);

  // Lock body scroll on mobile open, listen for Escape key and resize
  useEffect(() => {
    if (!mobileMenuOpen) {
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileMenuOpen(false);
    };

    const handleClickOutside = (e: MouseEvent | TouchEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      if (drawerRef.current && !drawerRef.current.contains(target)) {
        if (target.closest('[aria-label="Toggle Navigation Menu"]')) return;
        setMobileMenuOpen(false);
      }
    };

    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    window.addEventListener("resize", handleResize);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
      window.removeEventListener("resize", handleResize);
    };
  }, [mobileMenuOpen]);

  return (
    <>
      {/* Standard Full-Width Non-Floating Top Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
          {/* Logo & Name */}
          <Link href="/" className="flex items-center group shrink-0">
            <span className="font-extrabold text-xl sm:text-2xl tracking-tight leading-none text-foreground transition-opacity group-hover:opacity-80">
              Lyxis
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-semibold text-muted-foreground">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="hover:text-foreground transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Action Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href="/login"
              className={cn(
                buttonVariants({ variant: "ghost", size: "sm" }),
                "hidden sm:inline-flex text-xs sm:text-sm font-semibold text-muted-foreground hover:text-foreground h-9 px-3.5",
              )}
            >
              Sign In
            </Link>

            <Link
              href="/dashboard"
              className={cn(
                buttonVariants({ variant: "default", size: "sm" }),
                "hidden sm:inline-flex items-center gap-1.5 h-9 px-4 rounded-full text-xs sm:text-sm font-bold bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm shadow-primary/20 transition-all",
              )}
            >
              <span>Start Assessment</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>

            <Separator orientation="vertical" className="h-4 self-center mx-1 hidden sm:block" />

            <ThemeToggle className="h-9 w-9 rounded-full border border-border/60 bg-muted/20 hover:bg-muted/60 transition-all" />

            {/* Mobile Menu Toggle Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden flex h-9 w-9 items-center justify-center rounded-full border border-border/60 bg-muted/20 text-foreground transition-all hover:bg-muted/50"
              aria-label="Toggle Navigation Menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Panel Anchored to Header */}
        {mobileMenuOpen && (
          <div
            ref={drawerRef}
            className="md:hidden border-t border-border/40 bg-background/95 backdrop-blur-xl px-4 py-5 space-y-4 animate-in fade-in slide-in-from-top-1 duration-150"
          >
            <nav className="flex flex-col space-y-2 text-sm font-semibold text-muted-foreground">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 rounded-lg hover:bg-muted/60 hover:text-foreground transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="pt-3 border-t border-border/40 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5">
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  buttonVariants({ variant: "outline", size: "sm" }),
                  "w-full sm:w-auto h-10 px-4 text-xs font-semibold rounded-full",
                )}
              >
                Sign In
              </Link>
              <Link
                href="/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  buttonVariants({ variant: "default", size: "sm" }),
                  "w-full sm:w-auto h-10 px-5 rounded-full text-xs font-bold gap-1.5 bg-primary text-primary-foreground hover:bg-primary/90",
                )}
              >
                <span>Start Assessment</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        )}
      </header>
    </>
  );
}

// Named alias
export { FloatingNav as SiteNav };
