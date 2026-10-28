export type SectionType = "LISTENING" | "STRUCTURE" | "READING";
export type CorrectOption = "A" | "B" | "C" | "D";
export type AttemptStatus = "NOT_STARTED" | "IN_PROGRESS" | "SUBMITTED" | "EXPIRED";

export interface ExamStimulus {
  id: string;
  sectionId: string;
  title: string | null;
  content: string | null;
  audioUrl: string | null;
  orderIndex: number;
}

export interface ExamQuestion {
  id: string;
  sectionId: string;
  stimulusId: string | null;
  questionNumber: number;
  prompt: string | null;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  correctAnswer?: CorrectOption;
  explanation?: string | null;
  skillCategory?: string | null;
}

export interface ExamSection {
  id: string;
  packageId: string;
  type: SectionType;
  orderIndex: number;
  title: string;
  durationMinutes: number;
  totalItems: number;
  stimuli?: ExamStimulus[];
  questions: ExamQuestion[];
}

export interface ExamAttemptData {
  id: string;
  candidateName: string;
  candidateEmail: string | null;
  packageId: string;
  status: AttemptStatus;
  startedAt: string;
  expiresAt: string;
  tabSwitchCount: number;
  currentSectionIndex: number;
  answers: Record<string, { selectedOption: CorrectOption; isFlagged?: boolean }>;
}
