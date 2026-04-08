import { requireAuthMiddleware } from "@/src/auth/middleware";
import { prisma } from "@/src/library/db";
import { ApiResponse } from "@/src/types/ApiReturnType";
import { Hono } from "hono";

export const PostRoutes = new Hono().post(
  "/wishlistItem/:id",
  requireAuthMiddleware(),
  async (c) => {
    let response: ApiResponse<string>;

    const { id: userId } = c.get("user");
    const productColorId = Number(c.req.param("id"));

    if (!productColorId || isNaN(productColorId)) {
      response = {
        status: 400,
        success: false,
        message: "არასწორი ID",
      };

      return c.json(response, response.status);
    }

    let wishlist = await prisma.wishlist.findUnique({
      where: { userId },
    });

    if (!wishlist) {
      wishlist = await prisma.wishlist.create({
        data: { userId },
      });
    }

    const existing = await prisma.wishlistItem.findUnique({
      where: {
        wishlistId_productColorId: {
          wishlistId: wishlist.id,
          productColorId,
        },
      },
    });

    if (existing) {
      response = {
        status: 400,
        success: false,
        message: "ნივთი უკვე დამატებულია",
      };

      return c.json(response, response.status);
    }

    await prisma.wishlistItem.create({
      data: {
        wishlistId: wishlist.id,
        productColorId,
      },
    });

    response = {
      status: 201,
      success: true,
      message: "ნივთი დაემატა",
    };

    return c.json(response, response.status);
  },
);
