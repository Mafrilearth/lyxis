import { AuthShell } from "../auth-shell";
import { LoginForm } from "./login-form";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export const metadata = {
  title: "Sign In",
  description: "Sign in to access your dashboard and assessments.",
};

export default async function LoginPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    redirect("/dashboard");
  }

  return (
    <AuthShell mode="login">
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
