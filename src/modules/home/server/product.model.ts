import { Prisma } from "@/generated/prisma/browser";

export type ProductModel = Prisma.ProductGetPayload<{
  include: {
    discounts: true;
  };
}>;