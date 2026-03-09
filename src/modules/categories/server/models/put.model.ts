import { product_category } from "@/generated/prisma/browser";

export type PutCategoryModel = {
  title?: product_category;
  categoryPhoto?: string;
};
