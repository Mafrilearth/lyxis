import { AuthShell } from "@/components/auth/auth-shell";
import { RegisterForm } from "@/components/auth/register-form";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export const metadata = {
  title: "Sign Up",
  description: "Create an account to start your diagnostic assessment.",
};

export default async function RegisterPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    redirect("/dashboard");
  }

  return (
    <AuthShell mode="register">
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
