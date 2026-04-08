import z from "zod";

export const password_schema = z.object({
  oldPass: z.string(),
  newPass: z
    .string()
    .min(8, "პაროლი უნდა შეიცავდეს მინიმუმ 8 სიმბოლოს.")
    .regex(/[a-z]/, "პაროლი უნდა შეიცავდეს ერთ პატარა ასოს მაინც.")
    .regex(/[A-Z]/, "პაროლი უნდა შეიცავდეს ერთ დიდ ასოს მაინც.")
    .regex(/[0-9]/, "პაროლი უნდა შეიცავდეს ერთ ციფრს მაინც.")
    .regex(
      /[^A-Za-z0-9]/,
      "პაროლი უნდა შეიცავდეს ერთ განსაკუთრებულ სიმბოლოს მაინც.",
    ),
});

export type PasswordSchema = z.infer<typeof password_schema>;
