import type { AttemptStatus, CorrectOption } from "./exam";

export interface CertificateRecord {
  id?: string;
  certificateNumber: string;
  candidateName?: string;
  totalScore?: number;
  cefrLevel?: string;
  issuedAt: string;
  securityHash?: string;
  pdfUrl?: string | null;
}

export interface ExamAttempt {
  id: string;
  candidateId?: string | null;
  candidateName: string;
  candidateEmail?: string | null;
  packageId?: string;
  status: AttemptStatus | string;
  startedAt: string;
  submittedAt?: string | null;
  expiresAt?: string;
  totalScaledScore?: number | null;
  scaledListening?: number | null;
  scaledStructure?: number | null;
  scaledReading?: number | null;
  rawListening?: number | null;
  rawStructure?: number | null;
  rawReading?: number | null;
  cefrLevel?: string | null;
  tabSwitchCount?: number | null;
  verificationToken?: string | null;
  certificates?: CertificateRecord | null;
}

export interface StartExamInput {
  fullName: string;
  email: string;
}

export interface StartExamResult {
  success: boolean;
  attemptId?: string;
  redirectUrl?: string;
  error?: string;
}

export interface SaveAnswerInput {
  attemptId: string;
  questionId: string;
  selectedOption: CorrectOption | string;
  isFlagged?: boolean;
}

export interface TelemetryInput {
  attemptId: string;
  eventType: "tab_blur" | "visibility_hidden" | "fullscreen_exit" | string;
  browserInfo?: string;
}

export interface SubmitExamInput {
  attemptId: string;
  candidateName?: string;
  answers: Record<string, { selectedOption: string; isFlagged?: boolean }>;
}

export interface SubmitExamResult {
  success: boolean;
  redirectUrl?: string;
  certificateNumber?: string;
  error?: string;
}
