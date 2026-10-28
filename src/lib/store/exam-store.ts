import type { CorrectOption, ExamSection } from "@/types/exam";
import { create } from "zustand";

interface ExamStoreState {
  attemptId: string | null;
  candidateName: string;
  sections: ExamSection[];
  currentSectionIndex: number;
  currentQuestionIndex: number;
  answers: Record<string, { selectedOption: CorrectOption; isFlagged: boolean }>;
  timeRemainingSeconds: number;
  audioPlaybackState: Record<string, "idle" | "playing" | "played">;
  tabSwitchCount: number;
  isSubmitting: boolean;

  // Actions
  initializeSession: (payload: {
    attemptId: string;
    candidateName: string;
    sections: ExamSection[];
    initialAnswers?: Record<string, { selectedOption: CorrectOption; isFlagged: boolean }>;
    durationMinutes: number;
  }) => void;
  setCurrentSectionIndex: (index: number) => void;
  setCurrentQuestionIndex: (index: number) => void;
  recordAnswer: (questionId: string, option: CorrectOption) => void;
  toggleFlagQuestion: (questionId: string) => void;
  decrementTimer: () => void;
  setAudioState: (id: string, state: "idle" | "playing" | "played") => void;
  incrementTabSwitch: () => void;
  setIsSubmitting: (submitting: boolean) => void;
}

export const useExamStore = create<ExamStoreState>((set) => ({
  attemptId: null,
  candidateName: "",
  sections: [],
  currentSectionIndex: 0,
  currentQuestionIndex: 0,
  answers: {},
  timeRemainingSeconds: 35 * 60,
  audioPlaybackState: {},
  tabSwitchCount: 0,
  isSubmitting: false,

  initializeSession: ({
    attemptId,
    candidateName,
    sections,
    initialAnswers = {},
    durationMinutes,
  }) =>
    set({
      attemptId,
      candidateName,
      sections,
      answers: initialAnswers,
      currentSectionIndex: 0,
      currentQuestionIndex: 0,
      timeRemainingSeconds: durationMinutes * 60,
      audioPlaybackState: {},
      tabSwitchCount: 0,
      isSubmitting: false,
    }),

  setCurrentSectionIndex: (index) =>
    set((state) => {
      const nextSection = state.sections[index];
      const duration = nextSection ? nextSection.durationMinutes * 60 : 35 * 60;
      return {
        currentSectionIndex: index,
        currentQuestionIndex: 0,
        timeRemainingSeconds: duration,
      };
    }),

  setCurrentQuestionIndex: (index) => set({ currentQuestionIndex: index }),

  recordAnswer: (questionId, option) =>
    set((state) => {
      const existing = state.answers[questionId];
      return {
        answers: {
          ...state.answers,
          [questionId]: {
            selectedOption: option,
            isFlagged: existing ? existing.isFlagged : false,
          },
        },
      };
    }),

  toggleFlagQuestion: (questionId) =>
    set((state) => {
      const existing = state.answers[questionId];
      if (!existing) {
        return state;
      }
      return {
        answers: {
          ...state.answers,
          [questionId]: {
            ...existing,
            isFlagged: !existing.isFlagged,
          },
        },
      };
    }),

  decrementTimer: () =>
    set((state) => ({
      timeRemainingSeconds: Math.max(0, state.timeRemainingSeconds - 1),
    })),

  setAudioState: (id, audioState) =>
    set((state) => ({
      audioPlaybackState: {
        ...state.audioPlaybackState,
        [id]: audioState,
      },
    })),

  incrementTabSwitch: () =>
    set((state) => ({
      tabSwitchCount: state.tabSwitchCount + 1,
    })),

  setIsSubmitting: (isSubmitting) => set({ isSubmitting }),
}));
