import { AuthShell } from "@/app/auth-shell";
import type React from "react";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return <AuthShell mode="login">{children}</AuthShell>;
}
