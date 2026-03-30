import { requireAuthMiddleware } from "@/src/auth/middleware";
import { prisma } from "@/src/library/db";
import { ApiResponse } from "@/src/types/ApiReturnType";
import { Hono } from "hono";
import { wishlist_select, WishlistModel } from "../selectors/wishlist.get";

export const GetRoutes = new Hono().get(
  "/",
  requireAuthMiddleware(),
  async (c) => {
    let response: ApiResponse<WishlistModel>;
    const { id } = c.get("user");

    const wishlist = await prisma.wishlist.findUnique({
      where: { userId: id },
      select: wishlist_select,
    });

    if (!wishlist) {
      response = {
        success: false,
        status: 404,
        message: "თქვენი სურვილების სია ვერ მოიძებნა.",
      };

      return c.json(response, response.status);
    }

    response = {
      success: true,
      status: 200,
      message: "თქვენი სურვილების სია მოიძებნა.",
      data: wishlist,
    };

    return c.json(response, response.status);
  },
);
