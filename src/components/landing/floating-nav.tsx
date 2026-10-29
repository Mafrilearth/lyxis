"use client";

import { ThemeToggle } from "@/components/shared/theme-toggle";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowUpRight, Menu, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

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
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/90 backdrop-blur-md">
      {/* Grid-Wrapped Container to Align with Page Grid Lines */}
      <div className="max-w-6xl mx-auto border-x border-border/40 px-4 sm:px-8 h-16 flex items-center justify-between relative">
        {/* Corner Crosshair Accents */}
        <span
          className="absolute -top-[5px] -left-[5px] font-mono text-[10px] text-border leading-none select-none pointer-events-none"
          aria-hidden="true"
        >
          +
        </span>
        <span
          className="absolute -top-[5px] -right-[5px] font-mono text-[10px] text-border leading-none select-none pointer-events-none"
          aria-hidden="true"
        >
          +
        </span>

        {/* Brand Identity Anchor */}
        <Link href="/" className="flex items-center gap-2 group shrink-0">
          <span className="font-extrabold text-xl tracking-tight leading-none text-foreground transition-opacity group-hover:opacity-80">
            Lyxis
          </span>
          <span className="hidden sm:inline-block font-mono text-[9px] text-muted-foreground uppercase tracking-widest px-1.5 py-0.5 rounded border border-border/60 bg-muted/30">
            ENGINE
          </span>
        </Link>

        {/* Center Zone: Ultra-Clean & Focused on Core Flow */}
        <nav className="hidden md:flex items-center gap-8 text-xs font-mono text-muted-foreground">
          <Link href="#alur-tes" className="hover:text-foreground transition-colors">
            01 — ALUR TES
          </Link>
          <Link href="#metrik" className="hover:text-foreground transition-colors">
            02 — STANDAR METRIK
          </Link>
          <Link href="/lab/illustrations" className="hover:text-cyan-400 transition-colors">
            LAB — SPECIAL EFFECTS
          </Link>
        </nav>

        {/* Right Action Zone */}
        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className={cn(
              buttonVariants({ variant: "ghost", size: "sm" }),
              "text-xs font-mono text-muted-foreground hover:text-foreground h-9 px-3",
            )}
          >
            Masuk
          </Link>

          <Link
            href="/dashboard"
            className={cn(
              buttonVariants({ variant: "default", size: "sm" }),
              "items-center gap-1.5 h-9 px-4 rounded-lg text-xs font-bold bg-primary text-primary-foreground hover:bg-primary/90 transition-all font-mono",
            )}
          >
            <span>Mulai Tes</span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>

          <ThemeToggle className="h-9 w-9 rounded-lg border border-border/60 bg-muted/20 hover:bg-muted/60 transition-all" />

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden flex h-9 w-9 items-center justify-center rounded-lg border border-border/60 bg-muted/20 text-foreground transition-all hover:bg-muted/50"
            aria-label="Toggle Navigation Menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Panel Anchored to Header Grid */}
      {mobileMenuOpen && (
        <div
          ref={drawerRef}
          className="md:hidden max-w-6xl mx-auto border-x border-b border-border/40 bg-background/95 backdrop-blur-xl px-6 py-5 space-y-4 font-mono text-xs"
        >
          <nav className="flex flex-col space-y-3 text-muted-foreground">
            <Link
              href="#alur-tes"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-foreground transition-colors"
            >
              01 — ALUR TES
            </Link>
            <Link
              href="#metrik"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-foreground transition-colors"
            >
              02 — STANDAR METRIK
            </Link>
            <Link
              href="/lab/illustrations"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-cyan-400 transition-colors"
            >
              LAB — SPECIAL EFFECTS
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
