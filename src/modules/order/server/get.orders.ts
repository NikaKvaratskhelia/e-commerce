import { Prisma } from "@/generated/prisma/browser";

export const get_order_selector = {
  id: true,
  userId: true,
  createdAt: true,
  paymentMethod: true,
  total: true,
  orderItems: {
    select: {
      id: true,
      quantity: true,
      producColortId: true,
      productColor: {
        select: {
          photos: true,
          product: {
            select: {
              price: true,
            },
          },
        },
      },
    },
  },
} satisfies Prisma.OrderSelect;

export type OrderType = Prisma.OrderGetPayload<{
  select: typeof get_order_selector;
}>;
