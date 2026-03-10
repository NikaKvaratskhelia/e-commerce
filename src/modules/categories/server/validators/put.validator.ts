import { z } from "zod";

export const putCategorySchema = z
  .object({
    title: z.string().optional(),
    categoryPhoto: z.string().optional(),
  })
  .refine(
    (data) => data.title !== undefined || data.categoryPhoto !== undefined,
    {
      message: "მინიმუმ ერთი ველი უნდა შეავსო.",
    },
  );

export type PutCategoryModel = z.infer<typeof putCategorySchema>;
