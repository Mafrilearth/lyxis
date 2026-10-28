import { AuthShell } from "@/components/auth/auth-shell";
import { RegisterForm } from "@/components/auth/register-form";
import { Suspense } from "react";

export const metadata = {
  title: "Candidate Registration — Lyxis",
  description:
    "Create a candidate account to access official diagnostic assessments, performance analytics, and verified digital credentials.",
};

export default function RegisterPage() {
  return (
    <AuthShell>
      <Suspense
        fallback={
          <div className="flex h-72 items-center justify-center text-sm text-muted-foreground">
            Loading registration interface...
          </div>
        }
      >
        <RegisterForm />
      </Suspense>
    </AuthShell>
  );
}
