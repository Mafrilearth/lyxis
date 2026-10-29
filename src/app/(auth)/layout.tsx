import { AuthShell } from "./_components/auth-shell";
import type React from "react";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return <AuthShell mode="login">{children}</AuthShell>;
}
