import type React from "react";

export const metadata = {
  title: "Official CBT Examination Session — Lyxis",
  description: "Computer-Based Testing Engine for TOEFL ITP® Diagnostic Benchmark",
};

export default function ExamLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col select-none antialiased">
      {children}
    </div>
  );
}
