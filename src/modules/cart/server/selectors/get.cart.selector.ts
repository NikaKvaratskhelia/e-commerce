import { Prisma } from "@/generated/prisma/browser";

export const getCartSelect = {
  id: true,
  total: true,
  userId: true,
  cartItems: {
    include: {
      product: true,
    },
  },
} satisfies Prisma.CartSelect;


export type GetCartModel = Prisma.CartGetPayload<{
  select: typeof getCartSelect;
}>;