import { requireAuth } from "@/src/auth/helpers";
import { requireRoleMiddleware } from "@/src/auth/middleware";
import { prisma } from "@/src/library/db";
import { ApiResponse } from "@/src/types/ApiReturnType";
import { Hono } from "hono";
import { GetCartModel, getCartSelect } from "../selectors";

export const DeleteRoutes = new Hono().delete(
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
    const body = await c.req.json();

    const { productId } = body;

    if (!productId) {
      response = {
        status: 400,
        message: "პროდუქტის ID სავალდებულოა.",
        success: false,
      };

      return c.json(response, response.status);
    }

    const productInCart = cart.cartItems.find((x) => x.productId === productId);

    if (!productInCart) {
      response = {
        status: 404,
        message: "პროდუქტი ვერ მოიძებნა.",
        success: false,
      };

      return c.json(response, response.status);
    }

    await prisma.cartItem.delete({
      where: {
        productId_cartId: {
          productId: productInCart.productId,
          cartId: cart.id,
        },
      },
    });

    const updatedTotal = cart.cartItems
      .filter((item) => item.productId !== productId)
      .reduce((sum, item) => sum + item.product.price * item.quantity, 0);

    await prisma.cart.update({
      where: { id: cart.id },
      data: { total: updatedTotal },
    });
    response = {
      status: 200,
      message: "პროდუქტი წაიშალა კალათიდან.",
      success: true,
    };

    return c.json(response, response.status);
  },
);
