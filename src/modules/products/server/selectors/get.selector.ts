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
      photos: true,
      model3d: true,
    },
  },

  discounts: true,
  productCategory: true,
} satisfies Prisma.ProductSelect;

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
} satisfies Prisma.ProductSelect;
