"use server";

import { prisma } from "@/src/library/db";
import { postUserSchema } from "./validations/post.validation";
import bcrypt from "bcrypt";

export async function registerAction(formData: FormData) {
  const email = formData.get("email");
  const password = formData.get("password");

  const result = postUserSchema.safeParse({ email, password });

  if (!result.success) {
    throw new Error("Invalid form data!");
  }

  const { email: emailParsed, password: passwordParsed } = result.data;

  const hashedPass = await bcrypt.hash(passwordParsed, 10);

  await prisma.user.create({
    data: {
      email: emailParsed,
      password: hashedPass,
    },
  });
}
