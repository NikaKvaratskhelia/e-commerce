import { z } from "zod";

export const postCategorySchema = z.object({
  title: z.string().min(2),
  categoryPhoto: z
    .string()
    .url("არ არის ვალიდური ლინკი.")
    .startsWith("https://", "ლინკი უნდა იწყებოდეს https://-ით"),
});

export type PostCategoryModel = z.infer<typeof postCategorySchema>;
