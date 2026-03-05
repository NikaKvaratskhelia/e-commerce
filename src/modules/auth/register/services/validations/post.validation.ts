import { z } from "zod";

export const postUserSchema = z.object({
  email: z.email("Invalid email syntax!").min(3),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[a-z]/, "Password must contain a lowercase letter")
    .regex(/[A-Z]/, "Password must contain an uppercase letter")
    .regex(/[0-9]/, "Password must contain a number")
    .regex(/[^A-Za-z0-9]/, "Password must contain a special character"),
});

export type PostUserSchema = z.infer<typeof postUserSchema>;
