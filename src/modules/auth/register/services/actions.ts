"use server";

import { prisma } from "@/src/library/db";
import { PostUserSchema, postUserSchema } from "./validations/post.validation";
import bcrypt from "bcrypt";

export async function registerAction(formData: PostUserSchema) {
  const result = postUserSchema.safeParse(formData);

  if (!result.success) {
    return { success: false, message: "არასწორი ველები!" };
  }

  const { email, password, name, username } = result.data;

  const hashedPass = await bcrypt.hash(password, 10);

  await prisma.user.create({
    data: {
      name,
      username,
      email,
      password: hashedPass,
    },
  });

  return { success: true, message: "წარმატებით დარეგისტრირდა!" };
}
