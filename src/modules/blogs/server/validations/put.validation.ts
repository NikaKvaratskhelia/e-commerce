import z from "zod";

export const putBlogSchema = z
  .object({
    title: z
      .string()
      .min(3, "სათაურის სიმბოლოების მინიმალური რაოდენობა არის 3.")
      .max(50, "სათაურის სიმბოლოების მაქსიმალური რაოდენობა არის 50.")
      .optional(),
    thumbnail: z
      .url("არ არის ვალიდური ლინკი.")
      .startsWith("https://", "არ არის ვალიდური ლინკი")
      .optional(),
    content: z
      .string()
      .min(10, "კონტენტის სიმბოლოების მინიმალური რაოდენობა არის 10.")
      .max(1000, "კონტენტის სიმბოლოების მაქსიმალური რაოდენობა არის 1000.")
      .optional(),
  })
  .refine(
    (data) =>
      data.content !== undefined ||
      data.content !== undefined ||
      data.title !== undefined,
    {
      message: "მინიმუმ ერთი ველი უნდა შეავსო.",
    },
  );

export type PutBlogSchema = z.infer<typeof putBlogSchema>;
