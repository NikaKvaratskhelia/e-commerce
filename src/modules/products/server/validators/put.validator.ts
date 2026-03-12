import z from "zod";

export const putProductSchema = z
  .object({
    title: z
      .string()
      .min(2, "სახელში სიმბოლოების მინიმალური რაოდენობა არის 2.")
      .max(20, "სახელში სიმბოლოების მასქიმალური რაოდენობა არის 20.")
      .optional(),
    description: z
      .string()
      .min(5, "აღწერაში სიმბოლოების მინიმალური რაოდენობა არის 5.")
      .max(256, "აღწერაში სიმბოლოების მასქიმალური რაოდენობა არის 256.")
      .optional(),
    price: z
      .number()
      .min(0.1, "პროდუქტის ფასი ვერ იქნება 10 თეთრზე ნაკლები")
      .optional(),
    thumbnail: z
      .url("არ არის ვალიდური ლინკი.")
      .startsWith("https://", "ლინკი უნდა იწყებოდეს https://-ით")
      .optional(),
    stock: z
      .number()
      .min(0, "მარაგში პროდუქტების რაოდენობა ვერ იქნება 0-ზე ნაკლები.")
      .optional(),
    productCategoryId: z.number().optional(),
  })
  .refine(
    (data) =>
      data.title !== undefined ||
      data.description !== undefined ||
      data.price !== undefined ||
      data.thumbnail !== undefined ||
      data.stock !== undefined ||
      data.productCategoryId !== undefined,
    {
      message: "მინიმუმ ერთი ველი უნდა შეავსო.",
    },
  );

export type PutProductModel = z.infer<typeof putProductSchema>;
