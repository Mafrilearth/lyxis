"use client";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
    <div className="grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-linear-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4 dark:*:data-[slot=card]:bg-card">
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Total Candidates Evaluated</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {totalCandidates.toLocaleString()}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <UsersIcon />
              {totalCandidates > 0 ? "Active" : "Ready"}
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Active cohort delivery <UsersIcon className="size-4" />
          </div>
          <div className="text-muted-foreground">Standardized 140-item diagnostic</div>
        </CardFooter>
      </Card>

      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Mean Scaled Score</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {meanScore > 0 ? (
              <>
                {meanScore} <span className="text-sm font-normal text-muted-foreground">/ 677</span>
              </>
            ) : (
              "—"
            )}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <TrendingUpIcon />
              ETS Level 1
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            ETS ITP Level 1 Scale <AwardIcon className="size-4" />
          </div>
          <div className="text-muted-foreground">
            {meanScore > 0 ? "Cohort psychometric average" : "Pending assessment completions"}
          </div>
        </CardFooter>
      </Card>

      <Card className="@container/card">
        <CardHeader>
          <CardDescription>CEFR B2 / C1 Mastery</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {totalCandidates > 0 ? `${b2c1Percentage}%` : "—"}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <TrendingUpIcon />
              CEFR Map
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Independent/Proficient User <TrendingUpIcon className="size-4" />
          </div>
          <div className="text-muted-foreground">
            {totalCandidates > 0 ? "Meets postgraduate requirement" : "No cohort submissions yet"}
          </div>
        </CardFooter>
      </Card>

      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Proctoring Integrity Index</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {totalCandidates > 0 ? `${integrityIndex}%` : "100%"}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <ShieldCheckIcon />
              ISO 23988
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Zero-tamper verified <ShieldCheckIcon className="size-4" />
          </div>
          <div className="text-muted-foreground">Tab-switch & blur audit compliance</div>
        </CardFooter>
      </Card>
    </div>
  );
}
