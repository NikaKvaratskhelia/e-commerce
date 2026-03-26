import { Prisma } from "@/generated/prisma/browser";

export const get_product_details_selector = {
  id: true,
  title: true,
  description: true,
  price: true,
  thumbnail: true,
  stock: true,
  createdAt: true,
  productCategoryId: true,

  colors: {
    select: {
      id: true,
      color: true,
      has3D: true,
      photos: {
        orderBy: {
          id: "asc",
        },
      },
      model3d: true,
      productId: true,
    },
  },

  discounts: true,
  productCategory: true,
} satisfies Prisma.ProductSelect;

export type ProductDetailModel = Prisma.ProductGetPayload<{
  select: typeof get_product_details_selector;
}>;

export const get_products_selector = {
  id: true,
  title: true,
  price: true,
  description: true,
  thumbnail: true,
  stock: true,
  createdAt: true,
  productCategoryId: true,
  discounts: true,
  productCategory: true,
  colors: {
    select: {
      id: true,
      color: true,
      productId: true,
      has3D: true,
      photos: true,
      model3d: true,
    },
  },
} satisfies Prisma.ProductSelect;
