import { z } from "zod";

export const putUserSchema = z.object({
  name: z
    .string()
    .min(2, "სახელი უნდა შეიცავდეს მინიმუმ 2 სიმბოლოს.")
    .optional(),
  username: z
    .string()
    .min(2, "მომხმარებლის სახელი უნდა შეიცავდეს მინიმუმ 2 სიმბოლოს.")
    .optional(),
  email: z.email("არასწორი იმაილის სინტაქსი.").min(3).optional(),
});

export type PutUserSchema = z.input<typeof putUserSchema>;
