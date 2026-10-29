import { LoginForm } from "../_components/login-form";
import { createClient } from "@/lib/supabase/server";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Sign In",
  description: "Sign in to access your candidate dashboard and assessments.",
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
    <Suspense
      fallback={
        <div className="flex h-72 items-center justify-center text-sm text-muted-foreground">
          Loading authentication interface...
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  );
}
