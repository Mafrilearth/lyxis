import type React from "react";
import { AppSidebar } from "@/components/admin/app-sidebar";
import { SiteHeader } from "@/components/admin/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
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
  const adminEmailConfig = process.env.ADMIN_EMAIL || "admin@lyxis.com";
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
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 64)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
