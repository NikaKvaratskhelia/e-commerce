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
    data: { paymentMethod: "Credit Card", total: 0 },
  });

  cart.cartItems.forEach(async (i) => {
    await prisma.orderItem.create({
      data: {
        productId: i.productColorId,
        quantity: i.quantity,
        orderId: order.id,
      },
    });
  });

  return {
    orderId: order.id,
  };
}
