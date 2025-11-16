import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Enter a valid email."),
  password: z.string().min(6, "Minimum 6 characters required."),
  remember: z.boolean().default(false).optional()
});

export const sessionSchema = z.object({
  token: z.string(),
  user: z.object({
    email: z.string().email()
  })
});

export type LoginPayload = z.infer<typeof loginSchema>;
export type Session = z.infer<typeof sessionSchema>;
