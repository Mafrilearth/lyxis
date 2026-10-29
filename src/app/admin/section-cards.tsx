"use client";

import { Card, Chip } from "@heroui/react";
import { AwardIcon, ShieldCheckIcon, TrendingUpIcon, UsersIcon } from "lucide-react";

interface SectionCardsProps {
  totalCandidates?: number;
  meanScore?: number;
  b2c1Percentage?: number;
  integrityIndex?: number;
}

export function SectionCards({
  totalCandidates = 0,
  meanScore = 0,
  b2c1Percentage = 0,
  integrityIndex = 100,
}: SectionCardsProps) {
  return (
    <div className="grid grid-cols-1 gap-4 px-4 lg:px-6 sm:grid-cols-2 lg:grid-cols-4">
      <Card className="bg-gradient-to-t from-primary/5 to-card">
        <Card.Header className="flex flex-row items-start justify-between pb-2">
          <div className="space-y-1">
            <Card.Description className="text-xs">Total Candidates Evaluated</Card.Description>
            <Card.Title className="text-2xl font-semibold tabular-nums sm:text-3xl">
              {totalCandidates.toLocaleString()}
            </Card.Title>
          </div>
          <Chip variant="soft" size="sm" className="gap-1 border border-primary/30">
            <UsersIcon className="size-3" />
            {totalCandidates > 0 ? "Active" : "Ready"}
          </Chip>
        </Card.Header>
        <Card.Footer className="flex-col items-start gap-1 pt-0 text-xs">
          <div className="line-clamp-1 flex items-center gap-1.5 font-medium">
            Active cohort delivery <UsersIcon className="size-3.5" />
          </div>
          <div className="text-muted-foreground">Standardized 140-item diagnostic</div>
        </Card.Footer>
      </Card>

      <Card className="bg-gradient-to-t from-primary/5 to-card">
        <Card.Header className="flex flex-row items-start justify-between pb-2">
          <div className="space-y-1">
            <Card.Description className="text-xs">Mean Scaled Score</Card.Description>
            <Card.Title className="text-2xl font-semibold tabular-nums sm:text-3xl">
              {meanScore > 0 ? (
                <>
                  {meanScore}{" "}
                  <span className="text-xs font-normal text-muted-foreground">/ 677</span>
                </>
              ) : (
                "—"
              )}
            </Card.Title>
          </div>
          <Chip variant="soft" size="sm" className="gap-1 border border-primary/30">
            <TrendingUpIcon className="size-3" />
            ETS Level 1
          </Chip>
        </Card.Header>
        <Card.Footer className="flex-col items-start gap-1 pt-0 text-xs">
          <div className="line-clamp-1 flex items-center gap-1.5 font-medium">
            ETS ITP Level 1 Scale <AwardIcon className="size-3.5" />
          </div>
          <div className="text-muted-foreground">
            {meanScore > 0 ? "Cohort psychometric average" : "Pending assessment completions"}
          </div>
        </Card.Footer>
      </Card>

      <Card className="bg-gradient-to-t from-primary/5 to-card">
        <Card.Header className="flex flex-row items-start justify-between pb-2">
          <div className="space-y-1">
            <Card.Description className="text-xs">CEFR B2 / C1 Mastery</Card.Description>
            <Card.Title className="text-2xl font-semibold tabular-nums sm:text-3xl">
              {totalCandidates > 0 ? `${b2c1Percentage}%` : "—"}
            </Card.Title>
          </div>
          <Chip variant="soft" size="sm" className="gap-1 border border-primary/30">
            <TrendingUpIcon className="size-3" />
            CEFR Map
          </Chip>
        </Card.Header>
        <Card.Footer className="flex-col items-start gap-1 pt-0 text-xs">
          <div className="line-clamp-1 flex items-center gap-1.5 font-medium">
            Independent/Proficient User <TrendingUpIcon className="size-3.5" />
          </div>
          <div className="text-muted-foreground">
            {totalCandidates > 0 ? "Meets postgraduate requirement" : "No cohort submissions yet"}
          </div>
        </Card.Footer>
      </Card>

      <Card className="bg-gradient-to-t from-primary/5 to-card">
        <Card.Header className="flex flex-row items-start justify-between pb-2">
          <div className="space-y-1">
            <Card.Description className="text-xs">Proctoring Integrity Index</Card.Description>
            <Card.Title className="text-2xl font-semibold tabular-nums sm:text-3xl">
              {totalCandidates > 0 ? `${integrityIndex}%` : "100%"}
            </Card.Title>
          </div>
          <Chip variant="soft" size="sm" className="gap-1 border border-primary/30">
            <ShieldCheckIcon className="size-3" />
            ISO 23988
          </Chip>
        </Card.Header>
        <Card.Footer className="flex-col items-start gap-1 pt-0 text-xs">
          <div className="line-clamp-1 flex items-center gap-1.5 font-medium">
            Zero-tamper verified <ShieldCheckIcon className="size-3.5" />
          </div>
          <div className="text-muted-foreground">Tab-switch & blur audit compliance</div>
        </Card.Footer>
      </Card>
    </div>
  );
}
