import { Card, Chip } from "@heroui/react";
import { buttonVariants } from "@heroui/styles";
import { ArrowLeft, ShieldAlert } from "lucide-react";
import Link from "next/link";

export default function Forbidden() {
  return (
    <main className="min-h-screen bg-background text-foreground flex items-center justify-center p-4">
      <Card className="max-w-md w-full border border-danger/30 bg-surface/80 backdrop-blur-md p-6 text-center space-y-6 shadow-2xl">
        <div className="flex justify-center">
          <div className="size-16 rounded-2xl bg-danger/10 border border-danger/20 flex items-center justify-center text-danger">
            <ShieldAlert className="size-8" />
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-center">
            <Chip size="sm" variant="soft" className="text-xs text-danger">
              403 — Forbidden Sector
            </Chip>
          </div>
          <h1 className="text-2xl font-black tracking-tight">Access Prohibited</h1>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Your authenticated session lacks the security clearance or administrative authorization
            required for this operation.
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/dashboard" className={buttonVariants({ variant: "primary", size: "md" })}>
            <ArrowLeft className="size-3.5 mr-1.5" /> Return to Dashboard
          </Link>
        </div>
      </Card>
    </main>
  );
}
