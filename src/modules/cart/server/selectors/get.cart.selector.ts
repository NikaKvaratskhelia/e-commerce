import { Prisma } from "@/generated/prisma/browser";

export const getCartSelect = {
  id: true,
  total: true,
  userId: true,
  cartItems: {
    include: {
      productColor: {
        include: {
          photos: true,
          product: {
            include: {
              discounts: true,
            },
          },
        },
      },
    },
  },
} satisfies Prisma.CartSelect;

export type GetCartModel = Prisma.CartGetPayload<{
  select: typeof getCartSelect;
}>;
