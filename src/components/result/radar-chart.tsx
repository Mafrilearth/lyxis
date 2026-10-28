"use client";

import {
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart as RechartsRadar,
  ResponsiveContainer,
} from "recharts";

interface CompetencyRadarProps {
  listeningScore: number;
  structureScore: number;
  readingScore: number;
}

export function CompetencyRadarChart({
  listeningScore,
  structureScore,
  readingScore,
}: CompetencyRadarProps) {
  // Normalize each to 100% scale
  const lNorm = Math.round(((listeningScore - 24) / (68 - 24)) * 100);
  const sNorm = Math.round(((structureScore - 20) / (68 - 20)) * 100);
  const rNorm = Math.round(((readingScore - 21) / (67 - 21)) * 100);

  const data = [
    { domain: "Acoustic Comprehension", score: lNorm },
    { domain: "Syntactic Structure", score: sNorm },
    { domain: "Lexical Recognition", score: Math.round((sNorm + rNorm) / 2) },
    { domain: "Passage Analysis", score: rNorm },
    { domain: "Contextual Inference", score: Math.round((lNorm + rNorm) / 2) },
  ];

  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <RechartsRadar data={data}>
          <PolarGrid stroke="var(--border)" />
          <PolarAngleAxis
            dataKey="domain"
            tick={{ fill: "var(--muted-foreground)", fontSize: 11 }}
          />
          <Radar
            name="Competency Profile"
            dataKey="score"
            stroke="var(--primary)"
            fill="var(--primary)"
            fillOpacity={0.25}
          />
        </RechartsRadar>
      </ResponsiveContainer>
    </div>
  );
}
