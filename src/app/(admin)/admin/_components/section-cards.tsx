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
  const cards = [
    {
      id: "candidates",
      description: "Total Candidates Evaluated",
      title: totalCandidates.toLocaleString(),
      chipIcon: UsersIcon,
      chipLabel: totalCandidates > 0 ? "Active" : "Ready",
      footerHighlight: "Active cohort delivery",
      footerIcon: UsersIcon,
      footerSubtitle: "Standardized 140-item diagnostic",
    },
    {
      id: "mean-score",
      description: "Mean Scaled Score",
      title: meanScore > 0 ? `${meanScore} / 677` : "—",
      chipIcon: TrendingUpIcon,
      chipLabel: "ETS Level 1",
      footerHighlight: "ETS ITP Level 1 Scale",
      footerIcon: AwardIcon,
      footerSubtitle:
        meanScore > 0 ? "Cohort psychometric average" : "Pending assessment completions",
    },
    {
      id: "mastery",
      description: "CEFR B2 / C1 Mastery",
      title: totalCandidates > 0 ? `${b2c1Percentage}%` : "—",
      chipIcon: TrendingUpIcon,
      chipLabel: "CEFR Map",
      footerHighlight: "Independent/Proficient User",
      footerIcon: TrendingUpIcon,
      footerSubtitle:
        totalCandidates > 0 ? "Meets postgraduate requirement" : "No cohort submissions yet",
    },
    {
      id: "integrity",
      description: "Proctoring Integrity Index",
      title: totalCandidates > 0 ? `${integrityIndex}%` : "100%",
      chipIcon: ShieldCheckIcon,
      chipLabel: "ISO 23988",
      footerHighlight: "Zero-tamper verified",
      footerIcon: ShieldCheckIcon,
      footerSubtitle: "Tab-switch & blur audit compliance",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 px-4 lg:px-6 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map((card) => {
        const ChipIcon = card.chipIcon;
        const FooterIcon = card.footerIcon;
        return (
          <Card key={card.id} className="bg-gradient-to-t from-primary/5 to-card">
            <Card.Header className="flex flex-row items-start justify-between pb-2">
              <div className="space-y-1">
                <Card.Description className="text-xs">{card.description}</Card.Description>
                <Card.Title className="text-2xl font-semibold tabular-nums sm:text-3xl">
                  {card.title}
                </Card.Title>
              </div>
              <Chip variant="soft" size="sm" className="gap-1 border border-primary/30">
                <ChipIcon className="size-3" />
                {card.chipLabel}
              </Chip>
            </Card.Header>
            <Card.Footer className="flex-col items-start gap-1 pt-0 text-xs">
              <div className="line-clamp-1 flex items-center gap-1.5 font-medium">
                {card.footerHighlight} <FooterIcon className="size-3.5" />
              </div>
              <div className="text-muted-foreground">{card.footerSubtitle}</div>
            </Card.Footer>
          </Card>
        );
      })}
    </div>
  );
}
