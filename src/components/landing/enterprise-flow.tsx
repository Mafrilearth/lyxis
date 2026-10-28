import { Badge } from "@/components/ui/badge";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, FileCheck2, MonitorCheck, Sparkles, UserCheck } from "lucide-react";

interface FlowStep {
  number: string;
  stepLabel: string;
  title: string;
  description: string;
  keyFeature: string;
  icon: typeof UserCheck;
  statusBadge: string;
}

const FLOW_STEPS: FlowStep[] = [
  {
    number: "01",
    stepLabel: "STEP 1",
    title: "Create Candidate Profile",
    description:
      "Register with your name and email to access your testing dashboard. No university ID or institutional affiliation required.",
    keyFeature: "Instant Portal Access • Zero Bureaucracy",
    icon: UserCheck,
    statusBadge: "Candidate Profile",
  },
  {
    number: "02",
    stepLabel: "STEP 2",
    title: "Take Standardized Exam",
    description:
      "Complete 140 questions across Listening (35m), Structure (25m), and Reading (55m) with live server auto-save.",
    keyFeature: "115 Minutes Total • Real-Time Auto-Save",
    icon: MonitorCheck,
    statusBadge: "Standardized CBT",
  },
  {
    number: "03",
    stepLabel: "STEP 3",
    title: "Receive Verified Report",
    description:
      "Instantly view your calibrated score (310–677), CEFR equivalence, and download your QR-verifiable digital credential.",
    keyFeature: "Scale 310–677 • QR Verification",
    icon: FileCheck2,
    statusBadge: "Digital Credential",
  },
];

export function EnterpriseFlow() {
  return (
    <section
      id="flow"
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 space-y-10 sm:space-y-12 scroll-mt-24"
    >
      {/* Section Header: Standardized 3-Tier Hierarchy */}
      <div className="text-center max-w-3xl mx-auto space-y-3.5">
        <Badge
          variant="outline"
          className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-semibold tracking-wider uppercase shadow-xs"
        >
          <Sparkles className="h-3.5 w-3.5" /> Assessment Journey
        </Badge>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-foreground leading-tight text-balance">
          Direct 3-Step Candidate Journey.{" "}
          <span className="bg-gradient-to-r from-primary via-blue-600 to-indigo-600 bg-clip-text text-transparent">
            From Registration to Verified Result.
          </span>
        </h2>
        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-2xl mx-auto text-balance">
          A transparent, streamlined progression from registration to verified diagnostic credential
          issuance.
        </p>
      </div>

      {/* Symmetrical 3-Column Grid with Seamless Flow Connector */}
      <div className="relative">
        <div
          className="hidden md:block absolute top-12 left-[12%] right-[12%] h-px bg-gradient-to-r from-primary/10 via-primary/30 to-primary/10 pointer-events-none -z-0"
          aria-hidden="true"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 relative z-10">
          {FLOW_STEPS.map((step) => {
            const IconComponent = step.icon;
            return (
              <Card
                key={step.number}
                className="group h-full rounded-3xl border border-border/40 bg-card/40 backdrop-blur-md p-6 sm:p-8 shadow-xs hover:border-primary/40 hover:bg-card/70 transition-all duration-300 flex flex-col justify-between gap-6"
              >
                {/* Top Card Bar */}
                <div className="flex items-center justify-between gap-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary border border-primary/20 shadow-xs shrink-0">
                    <IconComponent className="h-5 w-5" />
                  </div>
                  <Badge
                    variant="outline"
                    className="font-sans text-xs font-semibold text-primary border-primary/20 bg-primary/5 px-3 py-1 rounded-full"
                  >
                    Step {step.number} • {step.statusBadge}
                  </Badge>
                </div>

                {/* Main Content */}
                <CardHeader className="p-0 space-y-2">
                  <CardTitle className="text-lg sm:text-xl font-bold text-foreground tracking-tight leading-snug">
                    {step.title}
                  </CardTitle>
                  <CardDescription className="text-xs sm:text-sm text-muted-foreground leading-relaxed pt-1">
                    {step.description}
                  </CardDescription>
                </CardHeader>

                {/* Key Feature Footer */}
                <CardFooter className="p-0 pt-4 border-t border-border/40 bg-transparent rounded-none">
                  <div className="flex items-center gap-2 text-xs text-foreground/80 font-medium">
                    <CheckCircle2 className="h-3.5 w-3.5 text-primary shrink-0" />
                    <span className="truncate">{step.keyFeature}</span>
                  </div>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
