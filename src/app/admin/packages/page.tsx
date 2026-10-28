import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
          <Badge
            variant="outline"
            className="gap-1 border-emerald-500/30 text-emerald-600 dark:text-emerald-400"
          >
            <CheckCircle2Icon className="size-3.5" />
            140 Items Calibrated
          </Badge>
          <Button variant="outline" size="sm">
            Export Package JSON
          </Button>
        </div>
      </div>

      <Card className="border-primary/20 bg-primary/[0.02]">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg">TOEFL ITP® Diagnostic Test Form A</CardTitle>
              <CardDescription>
                Canonical Form ID:{" "}
                <code className="font-mono text-xs text-primary">pkg-toefl-itp-form-a</code>
              </CardDescription>
            </div>
            <Badge>Active Benchmark</Badge>
          </div>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-4 text-sm sm:grid-cols-4">
          <div>
            <span className="text-xs text-muted-foreground">Total Questions</span>
            <p className="font-semibold">140 Items</p>
          </div>
          <div>
            <span className="text-xs text-muted-foreground">Total Duration</span>
            <p className="font-semibold">115 Minutes (1 hr 55 min)</p>
          </div>
          <div>
            <span className="text-xs text-muted-foreground">Target Score Band</span>
            <p className="font-semibold">310 – 677 Scaled Score</p>
          </div>
          <div>
            <span className="text-xs text-muted-foreground">CEFR Classification</span>
            <p className="font-semibold">Bands A2, B1, B2, C1</p>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {canonicalSections.map((sec) => {
          const Icon = sec.icon;
          return (
            <Card key={sec.orderIndex} className="flex flex-col justify-between">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Icon className="size-5" />
                  </div>
                  <Badge variant="secondary" className="font-mono text-xs">
                    Order #{sec.orderIndex}
                  </Badge>
                </div>
                <CardTitle className="mt-3 text-base">{sec.title}</CardTitle>
                <CardDescription className="text-xs">{sec.subParts}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 text-xs">
                <div className="flex items-center justify-between border-t pt-2">
                  <span className="text-muted-foreground">Question Pool</span>
                  <span className="font-semibold">{sec.items} items</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Standard Timing</span>
                  <span className="flex items-center gap-1 font-semibold">
                    <ClockIcon className="size-3.5 text-muted-foreground" />
                    {sec.duration} minutes
                  </span>
                </div>
                <div className="border-t pt-2">
                  <span className="text-muted-foreground">Stimulus Format:</span>
                  <p className="mt-0.5 text-foreground/80 leading-relaxed">{sec.stimuli}</p>
                </div>
              </CardContent>
              <CardFooter className="border-t pt-3">
                <Button variant="ghost" size="sm" className="w-full text-xs">
                  <FileTextIcon className="mr-1.5 size-3.5" />
                  View Calibrated Items
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
