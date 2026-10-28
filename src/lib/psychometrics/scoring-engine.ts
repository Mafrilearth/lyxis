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

export function convertRawScore(
  section: "listening" | "structure" | "reading",
  rawCorrect: number,
): number {
  const safeCorrect = Math.max(0, Math.floor(rawCorrect));

  switch (section) {
    case "listening": {
      const capped = Math.min(50, safeCorrect);
      return LISTENING_CONVERSION_TABLE[capped] ?? 24;
    }
    case "structure": {
      const capped = Math.min(40, safeCorrect);
      return STRUCTURE_CONVERSION_TABLE[capped] ?? 20;
    }
    case "reading": {
      const capped = Math.min(50, safeCorrect);
      return READING_CONVERSION_TABLE[capped] ?? 21;
    }
    default:
      return 0;
  }
}

export function determineCefrBand(totalScore: number): CefrLevel {
  if (totalScore >= 627) return "C1";
  if (totalScore >= 543) return "B2";
  if (totalScore >= 460) return "B1";
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

  // If candidate has 0 correct answers across the entire test
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

  // Official ETS Formula: ((Scaled L + Scaled S + Scaled R) * 10) / 3
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
