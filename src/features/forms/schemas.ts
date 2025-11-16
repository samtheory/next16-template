import { z } from "zod";

export const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Provide a valid email."),
  budget: z.enum(["under-10k", "10-25k", "25k+"], {
    required_error: "Select a budget."
  }),
  message: z.string().min(10, "Share at least 10 characters about the project.")
});

export const contactResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  received: contactFormSchema
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;
