import { Card, Chip } from "@heroui/react";
import { buttonVariants } from "@heroui/styles";
import { Lock, LogIn } from "lucide-react";
import Link from "next/link";

export default function Unauthorized() {
  return (
    <main className="min-h-screen bg-background text-foreground flex items-center justify-center p-4">
      <Card className="max-w-md w-full border border-warning/30 bg-surface/80 backdrop-blur-md p-6 text-center space-y-6 shadow-2xl">
        <div className="flex justify-center">
          <div className="size-16 rounded-2xl bg-warning/10 border border-warning/20 flex items-center justify-center text-warning">
            <Lock className="size-8" />
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-center">
            <Chip size="sm" variant="soft" className="text-xs text-warning">
              401 — Authentication Required
            </Chip>
          </div>
          <h1 className="text-2xl font-black tracking-tight">Access Restricted</h1>
          <p className="text-xs text-muted-foreground leading-relaxed">
            You must be signed in with a valid candidate or administrator credential to access this
            assessment sector.
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/login" className={buttonVariants({ variant: "primary", size: "md" })}>
            <LogIn className="size-3.5 mr-1.5" /> Sign In to Proceed
          </Link>
        </div>
      </Card>
    </main>
  );
}
