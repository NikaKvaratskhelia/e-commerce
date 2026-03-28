import {
  requireAuthMiddleware,
  requireRoleMiddleware,
} from "@/src/auth/middleware";
import { Hono } from "hono";
import { prisma } from "@/src/library/db";
import { ApiResponse } from "@/src/types/ApiReturnType";
import { user_role } from "@/generated/prisma/enums";

export const DeleteRoutes = new Hono().delete(
  "/:userId",
  requireRoleMiddleware(["admin"]),
  async (c) => {
    let response: ApiResponse<string>;

    const currentUser = c.get("user");

    const userId = c.req.param("userId");

    if (userId === currentUser.id) {
      response = {
        status: 400,
        message: "საკუთარი ანგარიშის წაშლა არ შეიძლება.",
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

    await prisma.user.delete({
      where: { id: userId },
    });

    response = {
      status: 200,
      message: "იუზერი წაიშალა.",
      success: true,
    };

    return c.json(response, response.status);
  },
);
