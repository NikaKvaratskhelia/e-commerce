import { prisma } from "@/src/library/db";
import { ApiResponse } from "@/src/types/ApiReturnType";
import { Hono } from "hono";
import { cookies } from "next/headers";

export const PostRoutes = new Hono().post("/", async (c) => {
  let response: ApiResponse<null>;

  try {
    const body = await c.req.json();
    const { code } = body;
    const cookieStore = await cookies();
    const userEmail = cookieStore.get("pending_verification_email")?.value;

    if (!userEmail || !code) {
      response = {
        success: false,
        status: 400,
        message: "იმეილი და კოდი აუცილებელია.",
      };
      return c.json(response, response.status);
    }

    const [verifyReq, user] = await Promise.all([
      prisma.verifyEmail.findUnique({ where: { userEmail } }),
      prisma.user.findUnique({ where: { email: userEmail } }),
    ]);

    if (!verifyReq || !user) {
      response = {
        success: false,
        status: 404,
        message: "იმეილის ვერიფიკაციის კოდი ვერ მოიძებნა.",
      };
      return c.json(response, response.status);
    }

    const EXPIRY_MS = 15 * 60 * 1000;
    const isExpired = Date.now() - verifyReq.expiresAt.getTime() > EXPIRY_MS;

    if (isExpired) {
      await prisma.verifyEmail.delete({ where: { userEmail } });
      response = {
        success: false,
        status: 400,
        message: "იმეილის ვერიფიკაციის კოდის ვადა გასულია.",
      };
      return c.json(response, response.status);
    }

    if (verifyReq.code !== Number(code)) {
      response = {
        success: false,
        status: 400,
        message: "იმეილის ვერიფიკაციის კოდი არასწორია.",
      };
      return c.json(response, response.status);
    }

    await prisma.$transaction([
      prisma.user.update({
        where: { email: userEmail },
        data: { emailVerified: true },
      }),
      prisma.verifyEmail.delete({ where: { userEmail } }),
    ]);

    cookieStore.delete("pending_verification_email");

    response = {
      success: true,
      status: 200,
      message: "იმეილის ვერიფიკაცია წარმატებულია.",
    };
    return c.json(response, response.status);
  } catch (error) {
    response = {
      success: false,
      status: 500,
      message: "სერვერის შეცდომა. სცადეთ მოგვიანებით.",
    };
    return c.json(response, response.status);
  }
});
