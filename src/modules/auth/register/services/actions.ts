"use server";

import { prisma } from "@/src/library/db";
import {
  postUserSchema,
  type PostUserSchema,
} from "./validations/post.validation";
import bcrypt from "bcrypt";
import { getUserSelect } from "../../selectors/userSelector";
import { resend } from "@/src/library/resend";
import { cookies } from "next/headers";

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

  const user = await prisma.user.create({
    data: {
      name,
      username,
      email: email.toLowerCase(),
      password: hashedPass,
    },
    select: getUserSelect,
  });

  await prisma.cart.create({data:{
    userId:user.id
  }})

  const cookieStore = await cookies();
  cookieStore.set("pending_verification_email", user.email, {
    httpOnly: true,
    maxAge: 60 * 15,
    path: "/",
  });

  const code = Math.floor(100000 + Math.random() * 900000);

  await prisma.verifyEmail.create({
    data: {
      userEmail: user.email,
      code,
      expiresAt: new Date(Date.now() + 1000 * 60 * 15),
    },
  });

  await resend.emails.send({
    from: "auth@kvara.uk",
    to: email,
    subject: "Your verification code",
    html: `
      <p>Your verification code is:</p>
      <h2 style="letter-spacing: 8px;">${code}</h2>
      <p>This code expires in 15 minutes.</p>
    `,
  });

  return { success: true, message: "რეგისტრაცია წარმატებით შესრულდა!" };
}
