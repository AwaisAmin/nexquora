import { z } from "zod";

export const applicationSchema = z.object({
  jobId: z.uuid().optional(),
  jobTitle: z.string().min(1, "Job title is required"),
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.email("Please enter a valid email address"),
  message: z.string().min(20, "Cover message must be at least 20 characters"),
});

export type ApplicationFormData = z.infer<typeof applicationSchema>;
