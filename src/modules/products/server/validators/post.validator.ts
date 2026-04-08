import z from "zod";

const colorSchema = z
  .object({
    color: z
      .string()
      .min(1, "ფერის სახელი სავალდებულოა.")
      .max(30, "ფერის სახელი ძალიან გრძელია."),

    has3D: z.boolean(),

    model3d: z.string().optional().or(z.literal("")),

    photos: z
      .array(
        z
          .string()
          .url("ფოტოს ლინკი არავალიდურია.")
          .startsWith("https://", "ლინკი უნდა იწყებოდეს https://-ით"),
      )
      .min(1, "მინიმუმ ერთი ფოტო აუცილებელია."),
  })
  .superRefine((value, ctx) => {
    if (value.has3D && (!value.model3d || value.model3d.trim() === "")) {
      ctx.addIssue({
        code: "custom",
        path: ["model3d"],
        message: "თუ პროდუქტს აქვს 3D მოდელი, model3d ლინკი სავალდებულოა.",
      });
    }

    if (value.has3D && value.model3d && !value.model3d.startsWith("https://")) {
      ctx.addIssue({
        code: "custom",
        path: ["model3d"],
        message: "3D მოდელის ლინკი უნდა იწყებოდეს https://-ით.",
      });
    }
  });

export const postProductSchema = z.object({
  title: z
    .string()
    .min(2, "სახელში სიმბოლოების მინიმალური რაოდენობა არის 2.")
    .max(20, "სახელში სიმბოლოების მაქსიმალური რაოდენობა არის 20."),

  description: z
    .string()
    .min(5, "აღწერაში სიმბოლოების მინიმალური რაოდენობა არის 5.")
    .max(256, "აღწერაში სიმბოლოების მაქსიმალური რაოდენობა არის 256."),

  price: z.number().min(0.1, "პროდუქტის ფასი ვერ იქნება 10 თეთრზე ნაკლები."),

  thumbnail: z
    .string()
    .url("არ არის ვალიდური ლინკი.")
    .startsWith("https://", "ლინკი უნდა იწყებოდეს https://-ით"),

  stock: z
    .number()
    .min(0, "მარაგში პროდუქტების რაოდენობა ვერ იქნება 0-ზე ნაკლები."),

  productCategoryId: z.number(),

  colors: z.array(colorSchema).min(1, "მინიმუმ ერთი ფერი სავალდებულოა."),
});

export type PostProductModel = z.infer<typeof postProductSchema>;
