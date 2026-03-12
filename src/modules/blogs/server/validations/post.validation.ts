import z from "zod";

export const postBlogSchema = z.object({
  title: z
    .string()
    .min(3, "სათაურის სიმბოლოების მინიმალური რაოდენობა არის 3.")
    .max(50, "სათაურის სიმბოლოების მაქსიმალური რაოდენობა არის 50."),
  thumbnail: z
    .url("არ არის ვალიდური ლინკი.")
    .startsWith("https://", "არ არის ვალიდური ლინკი"),
  content: z
    .string()
    .min(10, "კონტენტის სიმბოლოების მინიმალური რაოდენობა არის 10.")
    .max(1000, "კონტენტის სიმბოლოების მაქსიმალური რაოდენობა არის 1000."),
});

export type PostBlogSchema = z.infer<typeof postBlogSchema>;
