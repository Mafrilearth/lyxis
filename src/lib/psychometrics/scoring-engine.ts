import {
  LISTENING_CONVERSION_TABLE,
  READING_CONVERSION_TABLE,
  STRUCTURE_CONVERSION_TABLE,
} from "./scoring-tables";

export type CefrLevel = "A2" | "B1" | "B2" | "C1";

export interface PsychometricResult {
  rawListening: number;
  scaledListening: number;
  rawStructure: number;
  scaledStructure: number;
  rawReading: number;
  scaledReading: number;
  totalScaledScore: number;
  cefrLevel: CefrLevel;
}

const TABLE_MAP = {
  listening: { table: LISTENING_CONVERSION_TABLE, cap: 50, def: 24 },
  structure: { table: STRUCTURE_CONVERSION_TABLE, cap: 40, def: 20 },
  reading: { table: READING_CONVERSION_TABLE, cap: 50, def: 21 },
} as const;

export function convertRawScore(
  section: "listening" | "structure" | "reading",
  rawCorrect: number,
): number {
  const config = TABLE_MAP[section];
  if (!config) return 0;
  const safeCorrect = Math.min(config.cap, Math.max(0, Math.floor(rawCorrect)));
  return config.table[safeCorrect] ?? config.def;
}

export function determineCefrBand(totalScore: number): CefrLevel {
  const bands: Array<{ threshold: number; band: CefrLevel }> = [
    { threshold: 627, band: "C1" },
    { threshold: 543, band: "B2" },
    { threshold: 460, band: "B1" },
  ];
  for (const b of bands) {
    if (totalScore >= b.threshold) return b.band;
  }
  return "A2";
}

export function calculatePsychometrics(
  rawListening: number,
  rawStructure: number,
  rawReading: number,
): PsychometricResult {
  const scaledListening = convertRawScore("listening", rawListening);
  const scaledStructure = convertRawScore("structure", rawStructure);
  const scaledReading = convertRawScore("reading", rawReading);

  const totalRawSum = rawListening + rawStructure + rawReading;

  if (totalRawSum === 0) {
    return {
      rawListening: 0,
      scaledListening: 0,
      rawStructure: 0,
      scaledStructure: 0,
      rawReading: 0,
      scaledReading: 0,
      totalScaledScore: 310,
      cefrLevel: "A2",
    };
  }

  const convertedSum = scaledListening + scaledStructure + scaledReading;
  const totalScaledScore = Math.min(677, Math.max(310, Math.round((convertedSum * 10) / 3)));
  const cefrLevel = determineCefrBand(totalScaledScore);

  return {
    rawListening,
    scaledListening,
    rawStructure,
    scaledStructure,
    rawReading,
    scaledReading,
    totalScaledScore,
    cefrLevel,
  };
}
