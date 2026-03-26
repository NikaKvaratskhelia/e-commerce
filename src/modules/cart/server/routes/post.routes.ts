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
    const { productColorId } = body;

    if (!productColorId) {
      response = {
        status: 400,
        message: "პროდუქტის ID სავალდებულოა.",
        success: false,
      };
      return c.json(response, response.status);
    }

    const existingProductColor = await prisma.productColor.findUnique({
      where: { id: productColorId },
      include: {
        product: {
          include: {
            discounts: true,
          },
        },
        photos: true,
      },
    });

    if (!existingProductColor) {
      response = {
        status: 404,
        message: "პროდუქტის ვერ მოიძებნა.",
        success: false,
      };
      return c.json(response, response.status);
    }

    if (existingProductColor.product.stock === 0) {
      response = {
        status: 400,
        message: "პროდუქტის მარაგი ამოიწურა.",
        success: false,
      };
      return c.json(response, response.status);
    }

    const productInCart = cart.cartItems.find(
      (x) => x.productColorId === existingProductColor.id,
    );

    const now = new Date();

    const discount = existingProductColor.product.discounts.find(
      (d) => new Date(d.discountEndDate).getTime() > now.getTime(),
    );

    const price = discount
      ? existingProductColor.product.price *
        (1 - discount.discountPercentage / 100)
      : existingProductColor.product.price;

    if (!productInCart) {
      const updatedTotal =
        cart.cartItems.reduce(
          (sum, item) => sum + item.productColor.product.price * item.quantity,
          0,
        ) + price;

      await prisma.$transaction([
        prisma.cartItem.create({
          data: {
            cartId: cart.id,
            productColorId: existingProductColor.id,
            quantity: 1,
          },
        }),
        prisma.cart.update({
          where: { id: cart.id },
          data: { total: Number(updatedTotal.toFixed(2)) },
        }),
      ]);

      response = {
        status: 200,
        message: "პროდუქტი დაემატა კალათაში.",
        success: true,
      };
      return c.json(response, response.status);
    }

    if (productInCart.quantity + 1 > existingProductColor.product.stock) {
      response = {
        status: 400,
        message: `მარაგში მხოლოდ ${existingProductColor.product.stock} ერთეულია.`,
        success: false,
      };
      return c.json(response, response.status);
    }

    const updatedTotal = cart.cartItems.reduce((sum, item) => {
      const quantity =
        item.productColorId === productInCart.productColorId
          ? item.quantity + 1
          : item.quantity;
      return sum + item.productColor.product.price * quantity;
    }, 0);

    await prisma.$transaction([
      prisma.cartItem.update({
        where: {
          productColorId_cartId: {
            productColorId: productInCart.productColorId,
            cartId: cart.id,
          },
        },
        data: { quantity: productInCart.quantity + 1 },
      }),
      prisma.cart.update({
        where: { id: cart.id },
        data: { total: Number(updatedTotal.toFixed(2)) },
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
