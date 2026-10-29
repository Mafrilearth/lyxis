"use client";

import { ThemeToggle } from "@/components/shared/theme-toggle";
import { NextLogo } from "@/components/shared/next-logo";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { ArrowUpRight, Menu, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { NAV_LINKS } from "@/lib/constants/navigation";

export function FloatingNav() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);

  // Monitor scroll for subtle elevation & border refinement
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll, listen for Escape key, offsite outside clicks, and desktop resize
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
      {/* Fullscreen Backdrop Overlay (Offsite Click to Close) */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-background/60 backdrop-blur-sm z-40 md:hidden pointer-events-auto animate-in fade-in duration-200"
          onClick={() => setMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sticky Header Container: Anchored at top-0, strictly aligned with max-w-7xl px-4 sm:px-6 lg:px-8 */}
      <header
        className={cn(
          "sticky top-0 z-50 w-full pt-3 sm:pt-4 pb-2 px-4 sm:px-6 lg:px-8 pointer-events-none transition-colors duration-300",
          isScrolled ? "bg-background/40 backdrop-blur-xs" : "bg-transparent",
        )}
      >
        <div
          className={cn(
            "max-w-7xl mx-auto flex items-center justify-between rounded-full border bg-background/90 backdrop-blur-2xl px-4 sm:px-6 py-2 pointer-events-auto transition-all duration-300",
            isScrolled
              ? "border-border shadow-md shadow-primary/10 bg-background/95"
              : "border-border/80 shadow-sm shadow-primary/5",
          )}
        >
          {/* Brand Logo & Name */}
          <Link href="/" className="flex items-center gap-2.5 group shrink-0">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-xs transition-transform duration-300 group-hover:scale-105 p-1.5">
              <NextLogo className="w-full h-full" />
            </div>
            <span className="font-extrabold text-base sm:text-lg tracking-tight leading-none text-foreground">
              Lyxis
            </span>
          </Link>

          {/* Desktop Navigation Links: Cohesive Segmented Dock */}
          <nav className="hidden md:flex items-center gap-1 text-xs font-semibold text-muted-foreground bg-muted/40 p-1 rounded-full border border-border/60">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-3.5 py-1.5 rounded-full hover:text-foreground hover:bg-background/90 active:scale-[0.98] transition-all"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Action Controls & Ergonomic Right Suite: Unified h-9 & rounded-full */}
          <div className="flex items-center gap-2">
            <Link
              href="/login"
              className={cn(
                buttonVariants({ variant: "ghost", size: "xs" }),
                "hidden sm:inline-flex rounded-full text-xs font-semibold text-muted-foreground hover:text-foreground active:scale-[0.98] transition-all h-9 px-3.5",
              )}
            >
              Sign In
            </Link>

            <Link
              href="/dashboard"
              className={cn(
                buttonVariants({ variant: "default", size: "xs" }),
                "hidden sm:inline-flex items-center gap-1.5 h-9 px-4 rounded-full text-xs font-bold shadow-xs hover:shadow-md active:scale-[0.98] transition-all",
              )}
            >
              <span>Start Assessment</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>

            <Separator orientation="vertical" className="h-4 self-center mx-1 hidden sm:block" />

            <ThemeToggle className="h-9 w-9 rounded-full border border-border/60 bg-muted/20 hover:bg-muted/60 active:scale-[0.95] transition-all" />

            {/* Mobile Menu Toggle Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden flex h-9 w-9 items-center justify-center rounded-full border border-border/60 bg-muted/20 text-foreground transition-all hover:bg-muted/50 active:scale-[0.95]"
              aria-label="Toggle Navigation Menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer Overlay Panel (Elevated & Protected) */}
        {mobileMenuOpen && (
          <div
            ref={drawerRef}
            className="md:hidden mt-2 max-w-lg mx-auto rounded-3xl border border-border bg-card/95 backdrop-blur-2xl shadow-2xl p-5 space-y-4 pointer-events-auto animate-in fade-in slide-in-from-top-2 duration-200"
          >
            <nav className="flex flex-col space-y-1 text-sm font-semibold text-muted-foreground">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3.5 py-2.5 rounded-xl hover:bg-muted/60 hover:text-foreground transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="pt-3 border-t border-border/60 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5">
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
                  "w-full sm:w-auto h-10 px-5 rounded-full text-xs font-bold gap-1.5",
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
