import { z } from "zod";

export const answerSubmissionSchema = z.object({
  questionId: z.string().min(1, "Question ID is required"),
  selectedOption: z.enum(["A", "B", "C", "D"]),
  isFlagged: z.boolean().optional(),
});

export const telemetryEventSchema = z.object({
  eventType: z.enum(["tab_blur", "visibility_hidden", "fullscreen_exit"]),
  timestamp: z.string(),
  browserInfo: z.string().optional(),
});

export type AnswerSubmissionInput = z.infer<typeof answerSubmissionSchema>;
export type TelemetryEventInput = z.infer<typeof telemetryEventSchema>;
