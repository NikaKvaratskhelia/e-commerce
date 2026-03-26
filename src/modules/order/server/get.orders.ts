import { Prisma } from "@/generated/prisma/browser";

export const get_order_selector = {
  id: true,
  createdAt: true,
  paymentMethod: true,
  total: true,
  orderItems: {
    select: {
      id: true,
      quantity: true,
      productId: true,
      product: {
        select: {
          id: true,
          title: true,
          price: true,
          thumbnail: true,
        },
      },
    },
  },
} satisfies Prisma.OrderSelect;
