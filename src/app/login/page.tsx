import { AuthShell } from "@/components/auth/auth-shell";
import { LoginForm } from "@/components/auth/login-form";
import { Suspense } from "react";

export const metadata = {
  title: "Candidate Authentication — Lyxis",
  description:
    "Sign in to your candidate account to access private dashboards, assessment records, and verified digital credentials.",
};

export default function LoginPage() {
  return (
    <AuthShell>
      <Suspense
        fallback={
          <div className="flex h-72 items-center justify-center text-sm text-muted-foreground">
            Loading authentication interface...
          </div>
        }
      >
        <LoginForm />
      </Suspense>
    </AuthShell>
  );
}
