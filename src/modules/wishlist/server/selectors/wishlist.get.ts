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
          color: true,
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

export const wishlistItem = {
  id: true,
  productColorId: true,
  productColor: {
    select: {
      color: true,
      photos: true,
      product: {
        select: {
          price: true,
          title: true,
        },
      },
    },
  },
} satisfies Prisma.WishlistItemSelect;

export type WishlistItemModel = Prisma.WishlistItemGetPayload<{
  select: typeof wishlistItem;
}>;
