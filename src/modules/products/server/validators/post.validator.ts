import z from "zod";

export const postProductSchema = z.object({
  title: z
    .string()
    .min(2, "სახელში სიმბოლოების მინიმალური რაოდენობა არის 2.")
    .max(20, "სახელში სიმბოლოების მასქიმალური რაოდენობა არის 20."),
  description: z
    .string()
    .min(5, "აღწერაში სიმბოლოების მინიმალური რაოდენობა არის 5.")
    .max(256, "აღწერაში სიმბოლოების მასქიმალური რაოდენობა არის 256."),
  price: z.number().min(0.1, "პროდუქტის ფასი ვერ იქნება 10 თეთრზე ნაკლები"),
  thumbnail: z
    .url("არ არის ვალიდური ლინკი.")
    .startsWith("https://", "ლინკი უნდა იწყებოდეს https://-ით"),
  stock: z
    .number()
    .min(0, "მარაგში პროდუქტების რაოდენობა ვერ იქნება 0-ზე ნაკლები."),
  productCategoryId: z.number(),
});

export type PostProductModel = z.infer<typeof postProductSchema>;
