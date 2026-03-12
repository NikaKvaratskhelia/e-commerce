import { Hono } from "hono";
import { prisma } from "@/src/library/db";
import { GetCartModel, getCartSelect } from "../selectors";
import { ApiResponse } from "@/src/types/ApiReturnType";
import { requireAuth } from "@/src/auth/helpers";
import { requireRoleMiddleware } from "@/src/auth/middleware";

export const PutRoutes = new Hono().put(
  "/cartItems",
  requireRoleMiddleware(["user"]),
  async (c) => {
    let response: ApiResponse<GetCartModel>;

    const { user, session } = await requireAuth();

    if (!user || !session) {
      response = {
        message: "მომხარებელი არ არის სისტემაში.",
        status: 400,
        success: false,
      };
      return c.json(response, response.status);
    }

    const existingUser = await prisma.user.findUnique({
      where: { id: user.id },
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

    const body = await c.req.json();
    const { productId, quantity } = body;

    if (!productId) {
      response = {
        status: 400,
        message: "პროდუქტის ID სავალდებულოა.",
        success: false,
      };
      return c.json(response, response.status);
    }

    if (quantity === undefined || quantity === null) {
      response = {
        status: 400,
        message: "რაოდენობა სავალდებულოა.",
        success: false,
      };
      return c.json(response, response.status);
    }

    if (quantity < 0) {
      response = {
        status: 400,
        message: "რაოდენობა უნდა იყოს დადებითი რიცხვი.",
        success: false,
      };
      return c.json(response, response.status);
    }

    const productInCart = cart.cartItems.find((x) => x.productId === productId);

    if (!productInCart) {
      response = {
        status: 404,
        message: "პროდუქტი კალათაში ვერ მოიძებნა.",
        success: false,
      };
      return c.json(response, response.status);
    }

    if (quantity === 0) {
      await prisma.cartItem.delete({
        where: {
          productId_cartId: {
            productId,
            cartId: cart.id,
          },
        },
      });

      response = {
        status: 200,
        message: "პროდუქტი წაიშალა კალათიდან.",
        success: true,
      };
      return c.json(response, response.status);
    }

    await prisma.cartItem.update({
      where: {
        productId_cartId: {
          productId,
          cartId: cart.id,
        },
      },
      data: { quantity },
    });

    response = {
      status: 200,
      message: "კალათა განახლდა.",
      success: true,
    };
    
    return c.json(response, response.status);
  },
);
