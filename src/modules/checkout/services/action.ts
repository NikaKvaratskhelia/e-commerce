"use server";

import { prisma } from "@/src/library/db";
import {
  CheckoutFormValues,
  checkoutSchema,
} from "./validations/checkoutValidation";
import { requireAuth } from "@/src/auth/helpers";

export async function order(data: CheckoutFormValues) {
  const parsed = checkoutSchema.safeParse(data);

  if (!parsed.success) {
    throw new Error("არასწორი ველები!");
  }

  const { user } = await requireAuth();

  const cart = await prisma.cart.findUnique({
    where: { userId: user.id },
    include: {
      cartItems: {
        select: {
          id: true,
          quantity: true,
          productColorId: true,
        },
      },
    },
  });

  if (!cart) {
    throw new Error("კალათა ვერ მოიძებნა");
  }

  const order = await prisma.order.create({
    data: { paymentMethod: "Credit Card", total: cart.total, userId: user.id },
  });

  cart.cartItems.forEach(async (i) => {
    await prisma.$transaction([
      prisma.orderItem.create({
        data: {
          producColortId: i.productColorId,
          quantity: i.quantity,
          orderId: order.id,
        },
      }),

      prisma.cartItem.delete({ where: { id: i.id } }),
      prisma.cart.update({ where: { userId: user.id }, data: { total: 0 } }),
    ]);
  });

  return {
    orderId: order.id,
  };
}
