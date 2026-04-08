import { requireRoleMiddleware } from "@/src/auth/middleware";
import { ApiResponse } from "@/src/types/ApiReturnType";
import { Hono } from "hono";
import { prisma } from "@/src/library/db";
import { GetCartModel, getCartSelect } from "../selectors";

export const GetRoutes = new Hono().get(
  "/",
  requireRoleMiddleware(["user"]),
  async (c) => {
    let response: ApiResponse<GetCartModel>;

    const user = c.get("user");
    const session = c.get("session");

    if (!user || !session) {
      response = {
        message: "მომხარებელი არ არის სისტემაში.",
        status: 400,
        success: false,
      };

      return c.json(response, response.status);
    }

    const existingUser = await prisma.user.findUnique({
      where: {
        id: user.id,
      },
    });

    if (!existingUser) {
      response = {
        message: "მომხარებელი ვერ მოიძებნა.",
        status: 404,
        success: false,
      };

      return c.json(response, response.status);
    }

    const cart = await prisma.cart.findUnique({
      where: { userId: user.id },
      select: getCartSelect,
    });

    if (!cart) {
      response = {
        message: "კალათა ვერ მოიძებნა.",
        status: 404,
        success: false,
      };

      return c.json(response, response.status);
    }

    response = {
      message: "კალათა მოიძებნა.",
      status: 200,
      success: true,
      data: cart,
    };

    return c.json(response, response.status);
  },
);
