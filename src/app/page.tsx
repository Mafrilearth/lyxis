import { FloatingNav } from "./_components/floating-nav";
import { buttonVariants } from "@heroui/styles";
import { createClient } from "@/lib/supabase/server";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default async function HomePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const isAuthenticated = !!user;

  return (
    <div className="relative min-h-screen bg-background text-foreground flex flex-col">
      <FloatingNav isAuthenticated={isAuthenticated} />

      <main
        id="main-content"
        className="flex-1 max-w-6xl w-full mx-auto border-x-0 xl:border-x border-border bg-background flex flex-col"
      >
        <section
          aria-labelledby="hero-title"
          className="flex-1 flex flex-col items-center justify-center text-center py-24 sm:py-32 px-6 sm:px-8 space-y-6 relative"
        >
          <div className="space-y-4 max-w-3xl mx-auto flex flex-col items-center">
            <h1
              id="hero-title"
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground leading-[1.125] text-balance"
            >
              TOEFL Diagnostic
            </h1>

            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto text-balance">
              Standardized score prediction and verified credentials.
            </p>

            <div className="pt-2 flex justify-center">
              {isAuthenticated ? (
                <Link
                  href="/candidate/dashboard"
                  className={cn(
                    buttonVariants({ variant: "primary", size: "lg" }),
                    "inline-flex items-center justify-center rounded-lg h-10 px-6 text-sm font-semibold",
                  )}
                >
                  Go to Dashboard
                </Link>
              ) : (
                <Link
                  href="/register"
                  className={cn(
                    buttonVariants({ variant: "primary", size: "lg" }),
                    "inline-flex items-center justify-center rounded-lg h-10 px-6 text-sm font-semibold",
                  )}
                >
                  Start Assessment
                </Link>
              )}
            </div>
          </div>
        </section>
      </main>

      <footer
        role="contentinfo"
        className="w-full border-t border-border bg-background h-16 flex items-center justify-center"
      >
        <div className="w-full max-w-6xl mx-auto px-6 sm:px-8 flex items-center justify-center text-center font-mono text-xs text-muted-foreground">
          <p>© 2026 Lyxis. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
