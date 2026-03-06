"use server";

import { prisma } from "@/src/library/db";
import {
  postUserSchema,
  type PostUserSchema,
} from "./validations/post.validation";
import bcrypt from "bcrypt";
import { getUserSelect } from "./selectors/userSelector";

export type RegisterResult =
  | { success: true; message: string }
  | { success: false; message: string };

export async function registerAction(
  payload: PostUserSchema,
): Promise<RegisterResult> {
  const result = postUserSchema.safeParse(payload);
  if (!result.success) return { success: false, message: "არასწორი ველები!" };

  const { name, username, email, password } = result.data;

  const existing = await prisma.user.findFirst({
    where: { OR: [{ email }, { username }] },
  });

  if (existing) {
    return {
      success: false,
      message: "მომხმარებელი ამ იმეილით ან მომხმარებლის სახელით უკვე არსებობს!",
    };
  }

  const hashedPass = await bcrypt.hash(password, 10);

  await prisma.user.create({
    data: { name, username, email: email.toLowerCase(), password: hashedPass },
    select: getUserSelect,
  });

  return { success: true, message: "რეგისტრაცია წარმატებით შესრულდა!" };
}
