import { requireRoleMiddleware } from "@/src/auth/middleware";
import { prisma } from "@/src/library/db";
import { ApiResponse } from "@/src/types/ApiReturnType";
import { Hono } from "hono";
import { GetCartModel, getCartSelect } from "../selectors";

export const PostRoutes = new Hono().post(
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
    const { productId } = body;

    if (!productId) {
      response = {
        status: 400,
        message: "პროდუქტის ID სავალდებულოა.",
        success: false,
      };
      return c.json(response, response.status);
    }

    const existingProduct = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (!existingProduct) {
      response = {
        status: 404,
        message: "პროდუქტის ვერ მოიძებნა.",
        success: false,
      };
      return c.json(response, response.status);
    }

    if (existingProduct.stock === 0) {
      response = {
        status: 400,
        message: "პროდუქტის მარაგი ამოიწურა.",
        success: false,
      };
      return c.json(response, response.status);
    }

    const productInCart = cart.cartItems.find(
      (x) => x.productId === existingProduct.id,
    );

    if (!productInCart) {
      const updatedTotal =
        cart.cartItems.reduce(
          (sum, item) => sum + item.product.price * item.quantity,
          0,
        ) + existingProduct.price;

      await prisma.$transaction([
        prisma.cartItem.create({
          data: { cartId: cart.id, productId: existingProduct.id, quantity: 1 },
        }),
        prisma.cart.update({
          where: { id: cart.id },
          data: { total: updatedTotal },
        }),
      ]);

      response = {
        status: 200,
        message: "პროდუქტი დაემატა კალათაში.",
        success: true,
      };
      return c.json(response, response.status);
    }

    if (productInCart.quantity + 1 > existingProduct.stock) {
      response = {
        status: 400,
        message: `მარაგში მხოლოდ ${existingProduct.stock} ერთეულია.`,
        success: false,
      };
      return c.json(response, response.status);
    }

    const updatedTotal = cart.cartItems.reduce((sum, item) => {
      const quantity =
        item.productId === productInCart.productId
          ? item.quantity + 1
          : item.quantity;
      return sum + item.product.price * quantity;
    }, 0);

    await prisma.$transaction([
      prisma.cartItem.update({
        where: {
          productId_cartId: {
            productId: productInCart.productId,
            cartId: cart.id,
          },
        },
        data: { quantity: productInCart.quantity + 1 },
      }),
      prisma.cart.update({
        where: { id: cart.id },
        data: { total: updatedTotal },
      }),
    ]);

    response = {
      status: 200,
      message: "პროდუქტი დაემატა კალათაში.",
      success: true,
    };

    return c.json(response, response.status);
  },
);
