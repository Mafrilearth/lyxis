import { Button, Card, Chip } from "@heroui/react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Test Packages Registry | Administrator Console",
  description:
    "Standardized assessment form packages, psychometric scales, and question item taxonomy.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
};
import {
  BookOpenIcon,
  CheckCircle2Icon,
  ClockIcon,
  FileTextIcon,
  HeadphonesIcon,
  LayersIcon,
} from "lucide-react";

const canonicalSections = [
  {
    orderIndex: 1,
    title: "Section 1: Listening Comprehension",
    items: 50,
    duration: 35,
    icon: HeadphonesIcon,
    subParts: "Part A (30 short conversations) + Part B (8 longer talks) + Part C (12 lectures)",
    stimuli: "Standardized American English audio (.mp3, 64kbps CBR, single-play locked)",
    status: "Published & Active",
  },
  {
    orderIndex: 2,
    title: "Section 2: Structure & Written Expression",
    items: 40,
    duration: 25,
    icon: LayersIcon,
    subParts:
      "Structure Items 1–15 (Sentence completion) + Written Expression Items 16–40 (Error identification)",
    stimuli: "Syntactic structure, morphosyntax, and standard written American English rules",
    status: "Published & Active",
  },
  {
    orderIndex: 3,
    title: "Section 3: Reading Comprehension",
    items: 50,
    duration: 55,
    icon: BookOpenIcon,
    subParts: "5 Academic reading passages (350–450 words each) with 10 questions per passage",
    stimuli:
      "University-level non-fiction texts (Social sciences, physical sciences, arts, biography)",
    status: "Published & Active",
  },
];

export default function PackagesPage() {
  return (
    <div className="flex flex-1 flex-col gap-6 p-4 md:p-6">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Test Packages & Item Bank</h1>
          <p className="text-sm text-muted-foreground">
            Standardized 140-item diagnostic evaluation benchmark conforming to ETS TOEFL ITP® Level
            1 specifications.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Chip
            variant="soft"
            size="sm"
            className="gap-1 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400"
          >
            <CheckCircle2Icon className="size-3.5" />
            140 Items Calibrated
          </Chip>
          <Button variant="outline" size="sm">
            Export Package JSON
          </Button>
        </div>
      </div>

      <Card className="border-accent/20 bg-accent/[0.02] p-4">
        <Card.Header>
          <div className="flex items-center justify-between">
            <div>
              <Card.Title className="text-lg">TOEFL ITP® Diagnostic Test Form A</Card.Title>
              <Card.Description>
                Canonical Form ID:{" "}
                <code className="font-mono text-xs text-accent">pkg-toefl-itp-form-a</code>
              </Card.Description>
            </div>
            <Chip variant="primary">Active Benchmark</Chip>
          </div>
        </Card.Header>
        <Card.Content className="grid grid-cols-2 gap-4 text-sm sm:grid-cols-4 pt-3">
          <div>
            <span className="text-xs text-muted">Total Questions</span>
            <p className="font-semibold">140 Items</p>
          </div>
          <div>
            <span className="text-xs text-muted">Total Duration</span>
            <p className="font-semibold">115 Minutes (1 hr 55 min)</p>
          </div>
          <div>
            <span className="text-xs text-muted">Target Score Band</span>
            <p className="font-semibold">310 – 677 Scaled Score</p>
          </div>
          <div>
            <span className="text-xs text-muted">CEFR Classification</span>
            <p className="font-semibold">Bands A2, B1, B2, C1</p>
          </div>
        </Card.Content>
      </Card>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {canonicalSections.map((sec) => {
          const Icon = sec.icon;
          return (
            <Card key={sec.orderIndex} className="flex flex-col justify-between p-4">
              <Card.Header>
                <div className="flex items-center justify-between">
                  <div className="flex size-9 items-center justify-center rounded-lg bg-accent/10 text-accent">
                    <Icon className="size-5" />
                  </div>
                  <Chip variant="soft" className="font-mono text-xs">
                    Order #{sec.orderIndex}
                  </Chip>
                </div>
                <Card.Title className="mt-3 text-base">{sec.title}</Card.Title>
                <Card.Description className="text-xs">{sec.subParts}</Card.Description>
              </Card.Header>
              <Card.Content className="space-y-3 text-xs pt-3">
                <div className="flex items-center justify-between border-t border-separator pt-2">
                  <span className="text-muted">Question Pool</span>
                  <span className="font-semibold">{sec.items} items</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted">Standard Timing</span>
                  <span className="flex items-center gap-1 font-semibold">
                    <ClockIcon className="size-3.5 text-muted" />
                    {sec.duration} minutes
                  </span>
                </div>
                <div className="border-t border-separator pt-2">
                  <span className="text-muted">Stimulus Format:</span>
                  <p className="mt-0.5 text-foreground/80 leading-relaxed">{sec.stimuli}</p>
                </div>
              </Card.Content>
              <Card.Footer className="border-t border-separator pt-3">
                <Button variant="ghost" size="sm" className="w-full text-xs">
                  <FileTextIcon className="mr-1.5 size-3.5" />
                  View Calibrated Items
                </Button>
              </Card.Footer>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
