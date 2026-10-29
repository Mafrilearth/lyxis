import type React from "react";
import { AdminNav } from "./_components/admin-nav";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Administrator Console | Lyxis",
  description: "Executive control panel for Lyxis TOEFL ITP CBT platform",
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
};

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // 1. Unauthenticated users are redirected to login
  if (!user) {
    redirect("/login?next=/admin");
  }

  // 2. Strict Role-Based Access Control (RBAC): Only designated ADMINs allowed
  const adminEmailConfig = process.env.ADMIN_EMAIL || "admin@lyxis.mafrilearth.com";
  let isAdmin = user.email === adminEmailConfig;

  if (!isAdmin) {
    const { data: profile } = await supabase
      .from("users")
      .select("role")
      .eq("id", user.id)
      .single();

    if (profile?.role === "ADMIN") {
      isAdmin = true;
    }
  }

  // 3. Regular candidates attempting to access any admin surface are redirected to their dashboard
  if (!isAdmin) {
    redirect("/dashboard");
  }

  return (
    <div className="flex min-h-screen flex-col lg:flex-row bg-background text-foreground">
      <AdminNav userEmail={user.email || "admin@lyxis.mafrilearth.com"} />
      <main className="flex-1 overflow-x-hidden">{children}</main>
    </div>
  );
}
