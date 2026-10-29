"use client";

import { Button, Input, Label, TextField } from "@heroui/react";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";
import { AlertCircle, CheckCircle2, Loader2 } from "lucide-react";
import type { Route } from "next";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export function LoginForm({ className, ...props }: React.ComponentProps<"div">) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get("next") || "/candidate/dashboard";

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const supabase = createClient();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    if (!email.trim() || !email.includes("@")) {
      setErrorMessage("Please enter a valid email.");
      return;
    }

    if (!password) {
      setErrorMessage("Please enter your password.");
      return;
    }

    try {
      setIsLoading(true);
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim().toLowerCase(),
        password,
      });

      if (error) {
        throw error;
      }

      if (data?.user) {
        let destination = next;
        if (!searchParams.get("next")) {
          const { data: profile } = await supabase
            .from("users")
            .select("role")
            .eq("id", data.user.id)
            .single();

          if (profile?.role === "ADMIN" || data.user.email === "admin@lyxis.mafrilearth.com") {
            destination = "/admin";
          }
        }

        toast.success("Authentication successful. Redirecting to portal...");
        router.push(destination as Route);
        router.refresh();
      }
    } catch (err: unknown) {
      const msg =
        err instanceof Error
          ? err.message === "Invalid login credentials"
            ? "Invalid email or password."
            : err.message
          : "Authentication failed.";
      setErrorMessage(msg);
      toast.error(msg);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleAuth = async () => {
    try {
      setIsLoading(true);
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(next)}`,
        },
      });
      if (error) throw error;
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Google OAuth sign-in encountered an error.";
      toast.error(msg);
      setIsLoading(false);
    }
  };

  return (
    <div className={cn("space-y-6 text-left", className)} {...props}>
      <div className="space-y-2">
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
          Sign In
        </h1>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Enter your credentials to continue.
        </p>
      </div>

      {errorMessage && (
        <div
          role="alert"
          className="flex items-start gap-3 rounded-lg border border-destructive/30 bg-destructive/10 p-3 text-xs sm:text-sm text-destructive"
        >
          <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
          <p className="leading-relaxed">{errorMessage}</p>
        </div>
      )}

      {successMessage && (
        <div
          role="status"
          className="flex items-start gap-3 rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-3 text-xs sm:text-sm text-emerald-700 dark:text-emerald-400"
        >
          <CheckCircle2 className="h-4 w-4 shrink-0 mt-0.5" />
          <p className="leading-relaxed">{successMessage}</p>
        </div>
      )}

      <form onSubmit={handleLogin} className="space-y-4">
        <TextField isRequired isDisabled={isLoading} className="space-y-1.5">
          <Label htmlFor="login-email">Email</Label>
          <Input
            id="login-email"
            type="email"
            placeholder="name@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-10 text-sm rounded-lg"
            autoComplete="email"
          />
        </TextField>

        <TextField isRequired isDisabled={isLoading} className="space-y-1.5">
          <Label htmlFor="login-password">Password</Label>
          <Input
            id="login-password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="h-10 text-sm rounded-lg"
            autoComplete="current-password"
          />
        </TextField>

        <Button
          type="submit"
          className="w-full h-10 text-sm font-semibold rounded-lg bg-accent text-accent-foreground border border-transparent shadow-none"
          isDisabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin mr-2" /> Signing in...
            </>
          ) : (
            "Sign In"
          )}
        </Button>
      </form>

      <div className="space-y-4">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-separator" />
          </div>
          <div className="relative flex justify-center text-xs uppercase text-muted">
            <span className="bg-background px-2">Or</span>
          </div>
        </div>

        <Button
          variant="outline"
          className="w-full h-10 text-sm font-medium rounded-lg border border-separator shadow-none gap-2"
          onPress={handleGoogleAuth}
          isDisabled={isLoading}
        >
          <svg className="h-4 w-4" viewBox="0 0 24 24" role="img" aria-label="Google logo">
            <title>Google logo</title>
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              fill="#EA4335"
            />
          </svg>
          Google
        </Button>
      </div>

      <div className="pt-2 text-center text-sm text-muted-foreground border-t border-border">
        Don&apos;t have an account?{" "}
        <Link
          href={
            next && next !== "/candidate/dashboard"
              ? `/register?next=${encodeURIComponent(next)}`
              : "/register"
          }
          className="font-semibold text-primary hover:underline ml-1"
        >
          Sign Up
        </Link>
      </div>
    </div>
  );
}
