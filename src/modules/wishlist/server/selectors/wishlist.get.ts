import { Prisma } from "@/generated/prisma/browser";

export const wishlist_select = {
  id: true,
  userId: true,
  wishlistItems: {
    select: {
      id: true,
      productColorId: true,
      productColor: {
        select: {
          photos: true,
          product: {
            select: {
              price: true,
              title: true,
            },
          },
        },
      },
    },
  },
} satisfies Prisma.WishlistSelect;

export type WishlistModel = Prisma.WishlistGetPayload<{
  select: typeof wishlist_select;
}>;
