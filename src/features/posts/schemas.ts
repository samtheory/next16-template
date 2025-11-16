import { z } from "zod";

export const postSchema = z.object({
  userId: z.number().optional(),
  id: z.number(),
  title: z.string().min(1),
  body: z.string().min(1)
});

export const postFormSchema = z.object({
  title: z.string().min(3, "Title should have at least 3 characters."),
  body: z.string().min(10, "Body should have at least 10 characters.")
});

export type Post = z.infer<typeof postSchema>;
export type PostFormValues = z.infer<typeof postFormSchema>;
