import { User } from "@/generated/prisma/browser";
import { requireAuthMiddleware } from "@/src/auth/middleware";
import { prisma } from "@/src/library/db";
import { ApiResponse } from "@/src/types/ApiReturnType";
import { Hono } from "hono";

export const GetRoutes = new Hono().get(
  "/",
  requireAuthMiddleware(),
  async (c) => {
    let ApiResponse: ApiResponse<User>;

    const user = c.get("user");
    const userInDb = await prisma.user.findUnique({ where: { id: user.id } });

    if (!userInDb) {
      ApiResponse = {
        success: false,
        status: 404,
        message: "მომხმარებელი ვერ მოიძებნა",
      };

      return c.json(ApiResponse, ApiResponse.status);
    }
    
    ApiResponse = {
      success: true,
      status: 200,
      message: "მომხმარებელი მოიძებნა",
      data: userInDb,
    };

    return c.json(ApiResponse, ApiResponse.status);
  },
);
