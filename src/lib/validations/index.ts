import { z } from "zod";

// Base validation contract for future form integration
export const CandidateSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Invalid email format").optional().or(z.literal("")),
  targetScore: z.string().optional(),
});

export type CandidateFormValues = z.infer<typeof CandidateSchema>;
