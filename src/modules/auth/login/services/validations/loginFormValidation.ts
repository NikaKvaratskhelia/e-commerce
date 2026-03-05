import { z } from "zod";

export const loginFormSchema = z.object({
  userSearchValue: z.string(),
  password: z.string(),
});

export type LoginFormSchema = z.infer<typeof loginFormSchema>;
