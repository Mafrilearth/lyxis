import { ExamRunner } from "./exam-runner";
import { getBenchmarkExamSections } from "@/lib/data/exam-package";
import { Loader2 } from "lucide-react";
import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Standardized Assessment in Progress — Lyxis",
  description: "Standardized Computer-Based Testing assessment active session.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
};

interface ExamPageProps {
  params: Promise<{ attemptId: string }>;
}

async function ExamContent({ params }: ExamPageProps) {
  const { attemptId } = await params;
  const sections = getBenchmarkExamSections();

  return <ExamRunner attemptId={attemptId} sections={sections} />;
}

export default function ExamPage(props: ExamPageProps) {
  return (
    <Suspense
      fallback={
        <div className="flex h-screen w-full items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      }
    >
      <ExamContent {...props} />
    </Suspense>
  );
}
