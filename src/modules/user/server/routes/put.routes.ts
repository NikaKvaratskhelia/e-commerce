import {
  requireAuthMiddleware,
  requireRoleMiddleware,
} from "@/src/auth/middleware";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { password_schema, putUserSchema } from "../validations";
import { verifyPassword } from "@/src/auth/password";
import { prisma } from "@/src/library/db";
import { ApiResponse } from "@/src/types/ApiReturnType";
import bcrypt from "bcrypt";
import { user_role } from "@/generated/prisma/enums";

export const PutRoutes = new Hono()
  .put(
    "/",
    zValidator("json", putUserSchema),
    requireAuthMiddleware(),
    async (c) => {
      let response: ApiResponse<string>;

      const { name, username, email } = c.req.valid("json");
      const currentUser = c.get("user");

      if (!name && !username && !email) {
        response = {
          status: 400,
          message: "განახლებადი ველი არ მოწოდებულია.",
          success: false,
        };
        return c.json(response, response.status);
      }

      if (username || email) {
        const conflict = await prisma.user.findFirst({
          where: {
            id: { not: currentUser.id },
            OR: [
              ...(username ? [{ username }] : []),
              ...(email ? [{ email }] : []),
            ],
          },
        });

        if (conflict) {
          const field =
            conflict.username === username ? "მომხმარებლის სახელი" : "იმაილი";
          response = {
            status: 400,
            message: `${field} უკვე გამოყენებულია.`,
            success: false,
          };
          return c.json(response, response.status);
        }
      }

      await prisma.user.update({
        where: { id: currentUser.id },
        data: {
          ...(name && { name }),
          ...(username && { username }),
          ...(email && { email }),
        },
      });

      response = {
        status: 200,
        message: "პროფილი განახლდა.",
        success: true,
      };

      return c.json(response, response.status);
    },
  )
  .put(
    "/passowrd",
    zValidator("json", password_schema),
    requireAuthMiddleware(),
    async (c) => {
      let response: ApiResponse<string>;

      const { oldPass, newPass } = c.req.valid("json");
      const currentUser = c.get("user");

      const user = await prisma.user.findUnique({
        where: { id: currentUser.id },
      });

      if (!user) {
        response = {
          status: 400,
          message: "იუზერი ვერ მოიძებნა, არადა ამ ერორში არ უნდა შემოდიოდეს",
          success: false,
        };

        return c.json(response, response.status);
      }

      const isValid = await verifyPassword(oldPass, user?.password);

      if (!isValid) {
        response = {
          status: 400,
          message: "ძველი პაროლი არასწორია.",
          success: false,
        };

        return c.json(response, response.status);
      }

      await prisma.user.update({
        where: { id: user.id },
        data: { password: await bcrypt.hash(newPass, 10) },
      });

      response = {
        status: 200,
        message: "პაროლი განახლდა.",
        success: true,
      };

      return c.json(response, response.status);
    },
  )
  .put("/role/:userId", requireRoleMiddleware(["admin"]), async (c) => {
    let response: ApiResponse<string>;

    const currentUser = c.get("user");

    const userId = c.req.param("userId");

    if (userId === currentUser.id) {
      response = {
        status: 400,
        message: "საკუთარი როლის შეცვლა არ შეიძლება.",
        success: false,
      };
      return c.json(response, response.status);
    }

    const target = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!target) {
      response = {
        status: 404,
        message: "იუზერი ვერ მოიძებნა.",
        success: false,
      };
      return c.json(response, response.status);
    }

    if (target.role === user_role.admin) {
      const adminCount = await prisma.user.count({
        where: { role: user_role.admin },
      });

      if (adminCount <= 1) {
        response = {
          status: 400,
          message: "სისტემაში მინიმუმ ერთი ადმინი უნდა დარჩეს.",
          success: false,
        };
        return c.json(response, response.status);
      }
    }

    const newRole =
      target.role === user_role.admin ? user_role.user : user_role.admin;

    await prisma.user.update({
      where: { id: userId },
      data: { role: newRole },
    });

    response = {
      status: 200,
      message: `როლი შეიცვალა: ${newRole}.`,
      success: true,
    };
    return c.json(response, response.status);
  });
