"use client";

import { Button } from "@/components/ui/button";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";
import { AlertCircle, ArrowRight, CheckCircle2, Loader2, Lock, Mail, User } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export function RegisterForm({ className, ...props }: React.ComponentProps<"div">) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get("next") || "/dashboard";

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const supabase = createClient();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    if (!fullName.trim() || fullName.trim().length < 3) {
      setErrorMessage(
        "Official full legal name is required (minimum 3 characters, matching your passport/national ID).",
      );
      return;
    }

    if (!email.trim() || !email.includes("@")) {
      setErrorMessage("Please enter a valid active email address.");
      return;
    }

    if (!password || password.length < 6) {
      setErrorMessage("Password must contain at least 6 characters.");
      return;
    }

    try {
      setIsLoading(true);
      const { data, error } = await supabase.auth.signUp({
        email: email.trim().toLowerCase(),
        password,
        options: {
          data: {
            full_name: fullName.trim(),
            name: fullName.trim(),
          },
        },
      });

      if (error) {
        throw error;
      }

      if (data?.session) {
        toast.success("Account created successfully. Navigating to candidate portal...");
        router.push(next);
        router.refresh();
      } else if (data?.user) {
        setSuccessMessage(
          "Registration completed! Please check your email inbox to verify your candidate account before signing in.",
        );
        toast.success("Verification link dispatched to your email address.");
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to register new candidate account.";
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
    <div className={cn("space-y-6", className)} {...props}>
      {/* Form Header */}
      <div className="space-y-2 text-left">
        <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-foreground">
          Create Candidate Account
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Enroll your profile to launch calibrated diagnostic assessments and preserve verified
          credentials.
        </p>
      </div>

      {/* Error & Success Feedback Alerts */}
      {errorMessage && (
        <div className="flex items-start gap-3 rounded-2xl border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive">
          <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />
          <p className="leading-relaxed">{errorMessage}</p>
        </div>
      )}

      {successMessage && (
        <div className="flex items-start gap-3 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-sm text-emerald-700 dark:text-emerald-400">
          <CheckCircle2 className="h-5 w-5 shrink-0 mt-0.5" />
          <p className="leading-relaxed">{successMessage}</p>
        </div>
      )}

      {/* Candidate Registration Form */}
      <form onSubmit={handleRegister} className="space-y-5">
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="reg-name" className="text-sm font-semibold">
              Official Full Legal Name
            </FieldLabel>
            <div className="relative mt-1.5">
              <User className="absolute left-4 top-4 h-5 w-5 text-muted-foreground" />
              <Input
                id="reg-name"
                type="text"
                placeholder="As listed on Passport or National ID"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="pl-12 h-13 sm:h-14 text-sm sm:text-base rounded-2xl"
                autoComplete="name"
                required
                disabled={isLoading}
              />
            </div>
            <FieldDescription className="text-xs text-muted-foreground mt-1">
              This legal name will appear permanently on your official digital certificate.
            </FieldDescription>
          </Field>

          <Field>
            <FieldLabel htmlFor="reg-email" className="text-sm font-semibold">
              Active Email Address
            </FieldLabel>
            <div className="relative mt-1.5">
              <Mail className="absolute left-4 top-4 h-5 w-5 text-muted-foreground" />
              <Input
                id="reg-email"
                type="email"
                placeholder="candidate@university.edu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-12 h-13 sm:h-14 text-sm sm:text-base rounded-2xl"
                autoComplete="email"
                required
                disabled={isLoading}
              />
            </div>
          </Field>

          <Field>
            <FieldLabel htmlFor="reg-password" className="text-sm font-semibold">
              Account Password (Min. 6 Characters)
            </FieldLabel>
            <div className="relative mt-1.5">
              <Lock className="absolute left-4 top-4 h-5 w-5 text-muted-foreground" />
              <Input
                id="reg-password"
                type="password"
                placeholder="Minimum 6 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-12 h-13 sm:h-14 text-sm sm:text-base rounded-2xl"
                autoComplete="new-password"
                required
                disabled={isLoading}
              />
            </div>
          </Field>

          <Button
            type="submit"
            className="w-full h-13 sm:h-14 text-base font-bold gap-2 mt-3 rounded-2xl shadow-md"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" /> Registering Account...
              </>
            ) : (
              <>
                Create Candidate Account <ArrowRight className="h-4 w-4" />
              </>
            )}
          </Button>
        </FieldGroup>
      </form>

      {/* Google OAuth Section */}
      <div className="space-y-4 pt-1">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-border/60" />
          </div>
          <div className="relative flex justify-center text-xs uppercase font-bold tracking-wider text-muted-foreground">
            <span className="bg-card px-3">Or Continue Instantly</span>
          </div>
        </div>

        <Button
          variant="outline"
          type="button"
          className="w-full h-13 sm:h-14 text-sm sm:text-base font-semibold gap-3 border-border/80 hover:bg-muted/50 rounded-2xl"
          onClick={handleGoogleAuth}
          disabled={isLoading}
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
          Continue with Google Account
        </Button>
      </div>

      {/* Switcher to Login */}
      <div className="pt-2 text-center text-sm text-muted-foreground border-t border-border/50">
        Already registered as a candidate?{" "}
        <Link
          href={
            next && next !== "/dashboard" ? `/login?next=${encodeURIComponent(next)}` : "/login"
          }
          className="font-bold text-primary hover:underline ml-1"
        >
          Sign In to Your Account →
        </Link>
      </div>
    </div>
  );
}
