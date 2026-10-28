import { z } from "zod";

export const candidateRegisterSchema = z.object({
  fullName: z
    .string()
    .min(3, "Full name must be at least 3 characters")
    .max(100, "Full name cannot exceed 100 characters")
    .regex(/^[a-zA-Z\s.'-]+$/, "Full name contains invalid characters"),
  email: z
    .string()
    .email("Please provide a valid email address")
    .max(150, "Email cannot exceed 150 characters"),
  rulesAccepted: z
    .boolean()
    .refine((val) => val === true, "You must accept the examination regulations"),
});

export type CandidateRegisterInput = z.infer<typeof candidateRegisterSchema>;
