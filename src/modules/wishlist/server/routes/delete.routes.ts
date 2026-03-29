import { requireAuthMiddleware } from "@/src/auth/middleware";
import { prisma } from "@/src/library/db";
import { ApiResponse } from "@/src/types/ApiReturnType";
import { Hono } from "hono";

export const DeleteRoutes = new Hono().delete(
  "/wishlistItem/:id",
  requireAuthMiddleware(),
  async (c) => {
    let response: ApiResponse<string>;
    const { id: userId } = c.get("user");
    const productColorId = Number(c.req.param("id"));

    const wishlist = await prisma.wishlist.findUnique({ where: { userId } });

    if (!wishlist) {
      response = {
        status: 404,
        message: "სურვილების სია ვერ მოიძებნა",
        success: false,
      };
      return c.json(response, response.status);
    }

    const wishlistItem = await prisma.wishlistItem.findUnique({
      where: {
        wishlistId_productColorId: {
          wishlistId: wishlist.id,
          productColorId,
        },
      },
    });

    if (!wishlistItem) {
      response = {
        status: 404,
        message: "ნივთი ვერ მოიძებნა",
        success: false,
      };
      return c.json(response, response.status);
    }

    await prisma.wishlistItem.delete({
      where: {
        wishlistId_productColorId: {
          wishlistId: wishlist.id,
          productColorId,
        },
      },
    });

    response = {
      status: 200,
      message: "ნივთი წაიშალა",
      success: true,
    };

    return c.json(response, response.status);
  },
);
