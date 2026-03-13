import { Hono } from "hono";
import { prisma } from "@/src/library/db";
import { GetCartModel, getCartSelect } from "../selectors";
import { ApiResponse } from "@/src/types/ApiReturnType";
import { requireRoleMiddleware } from "@/src/auth/middleware";

export const PutRoutes = new Hono().put(
  "/cartItems",
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
    const { productColorId, quantity } = body;

    if (!productColorId) {
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

    const productInCart = await prisma.cartItem.findUnique({
      where: {
        productColorId_cartId: {
          productColorId: productColorId,
          cartId: cart.id,
        },
      },
      include: {
        productColor: {
          include: {
            product: true,
          },
        },
      },
    });

    if (!productInCart) {
      response = {
        status: 404,
        message: "პროდუქტი კალათაში ვერ მოიძებნა.",
        success: false,
      };
      return c.json(response, response.status);
    }

    if (productInCart.productColor.product.stock === 0) {
      response = {
        status: 400,
        message: "პროდუქტის მარაგი ამოიწურა.",
        success: false,
      };
      return c.json(response, response.status);
    }

    if (quantity > productInCart.productColor.product.stock) {
      response = {
        status: 400,
        message: `მარაგში მხოლოდ ${productInCart.productColor.product.stock} ერთეულია.`,
        success: false,
      };
      return c.json(response, response.status);
    }

    if (quantity === 0) {
      await prisma.cartItem.delete({
        where: {
          productColorId_cartId: {
            productColorId,
            cartId: cart.id,
          },
        },
      });

      const updatedTotal = cart.cartItems
        .filter((item) => item.productId !== productColorId)
        .reduce((sum, item) => sum + item.productColor.product.price * item.quantity, 0);

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
    }

    const updatedTotal = cart.cartItems.reduce((sum, item) => {
      const itemQuantity =
        item.productColorId === productColorId ? quantity : item.quantity;
      return sum + item.productColor.product.price * itemQuantity;
    }, 0);

    await prisma.$transaction([
      prisma.cartItem.update({
        where: {
          productColorId_cartId: {
            productColorId,
            cartId: cart.id,
          },
        },
        data: { quantity },
      }),
      prisma.cart.update({
        where: { id: cart.id },
        data: { total: updatedTotal },
      }),
    ]);

    response = {
      status: 200,
      message: "კალათა განახლდა.",
      success: true,
    };

    return c.json(response, response.status);
  },
);
