"use client";

import { Button } from "@/components/ui/button";
import { Printer } from "lucide-react";

export function PrintButton() {
  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      onClick={handlePrint}
      className="h-9 gap-1.5 text-xs font-semibold print:hidden"
    >
      <Printer className="h-3.5 w-3.5" /> Print Dossier / Save PDF
    </Button>
  );
}
