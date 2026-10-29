import { Card, Chip } from "@heroui/react";
import { buttonVariants } from "@heroui/styles";
import { ArrowLeft, Compass } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-background text-foreground flex items-center justify-center p-4">
      <Card className="max-w-md w-full border border-border/40 bg-surface/80 backdrop-blur-md p-6 text-center space-y-6 shadow-2xl">
        <div className="flex justify-center">
          <div className="size-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
            <Compass className="size-8" />
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-center">
            <Chip size="sm" variant="soft" className="text-xs">
              404 — Not Found
            </Chip>
          </div>
          <h1 className="text-2xl font-black tracking-tight">Dossier Unavailable</h1>
          <p className="text-xs text-muted-foreground leading-relaxed">
            The assessment resource or route specification you requested does not exist or has been
            relocated within the examination directory.
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/" className={buttonVariants({ variant: "primary", size: "md" })}>
            <ArrowLeft className="size-3.5 mr-1.5" /> Return to Platform
          </Link>
        </div>
      </Card>
    </main>
  );
}
