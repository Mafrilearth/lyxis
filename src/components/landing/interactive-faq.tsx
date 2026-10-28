"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { HelpCircle } from "lucide-react";

interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

const FAQ_LIST: FaqItem[] = [
  {
    id: "audience",
    question: "Who can take this diagnostic test? Is it restricted to university students?",
    answer:
      "The platform is open to all candidates globally without institutional restriction. It is specifically calibrated for three key profiles: (1) Scholarship applicants targeting Fulbright, Chevening, AAS, or DAAD score cutoffs (475, 500, 550+); (2) University students preparing for undergraduate, master's, or doctoral thesis defense and graduation clearance (passing threshold 450–500); and (3) Corporate and public sector professionals fulfilling standardized English benchmarks for hiring and executive promotion.",
  },
  {
    id: "structure",
    question: "What is the exact test structure, item count, and time duration?",
    answer:
      "The assessment follows the standardized 140-question structure lasting 115 minutes: Section 1 Listening Comprehension (50 items, 35 minutes), Section 2 Structure & Written Expression (40 items, 25 minutes), and Section 3 Reading Comprehension (50 items, 55 minutes). Timers operate independently per section.",
  },
  {
    id: "on-demand",
    question: "Do I need to schedule an appointment or book a testing date in advance?",
    answer:
      "No appointment or scheduling is needed. The diagnostic engine operates 24/7 on demand. You can begin immediately whenever you are ready directly from your candidate portal.",
  },
  {
    id: "fault-tolerance",
    question: "What happens if my network disconnects or my device turns off during the exam?",
    answer:
      "Every response is saved immediately to the server upon selection. If a disconnection occurs, simply log back into your candidate account; the platform resumes at your exact question with your remaining time preserved without data loss.",
  },
  {
    id: "scoring",
    question: "How are scores calculated and how can third parties verify my certificate?",
    answer:
      "Raw correct answers are converted using the calibrated 310–677 scale with mapped CEFR levels (A2 to C1). Each Certificate of Diagnostic Proficiency includes a unique verification token and a public QR code linking to /verify/[token] for immediate third-party validation.",
  },
];

export function InteractiveFaq() {
  return (
    <section
      id="faq"
      className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 space-y-10 sm:space-y-12 scroll-mt-24"
    >
      {/* Section Header: Standardized 3-Tier Hierarchy */}
      <div className="text-center max-w-3xl mx-auto space-y-3.5">
        <Badge
          variant="outline"
          className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-semibold tracking-wider uppercase shadow-xs"
        >
          <HelpCircle className="h-3.5 w-3.5" /> Frequently Asked Questions
        </Badge>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-foreground leading-tight text-balance">
          Candidate Questions & Answers.{" "}
          <span className="bg-gradient-to-r from-primary via-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Clear & Verifiable Standards.
          </span>
        </h2>
        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-2xl mx-auto text-balance">
          Essential information regarding test administration, scoring validity, and examination
          procedures before launching your session.
        </p>
      </div>

      {/* Official shadcn Accordion */}
      <Accordion defaultValue={["audience"]} className="space-y-3 sm:space-y-3.5">
        {FAQ_LIST.map((item) => (
          <AccordionItem
            key={item.id}
            value={item.id}
            className="rounded-2xl border border-border/40 bg-card/40 backdrop-blur-md px-5 sm:px-6 transition-all duration-200 data-open:border-primary/40 data-open:bg-card/70 border-b"
          >
            <AccordionTrigger className="font-bold text-sm sm:text-base text-foreground leading-snug py-4.5 hover:no-underline cursor-pointer flex items-center justify-between gap-4">
              {item.question}
            </AccordionTrigger>
            <AccordionContent className="text-xs sm:text-sm text-muted-foreground leading-relaxed pt-1 pb-5 border-t border-border/30">
              <p className="pt-3">{item.answer}</p>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
