import { RegisterForm } from "../_components/register-form";
import { createClient } from "@/lib/supabase/server";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Register Candidate Account",
  description: "Create an official Lyxis credential to launch standardized diagnostic assessments.",
};

export default async function RegisterPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    redirect("/candidate/dashboard");
  }

  return (
    <Suspense
      fallback={
        <div className="flex h-72 items-center justify-center text-sm text-muted-foreground">
          Loading registration interface...
        </div>
      }
    >
      <RegisterForm />
    </Suspense>
  );
}
