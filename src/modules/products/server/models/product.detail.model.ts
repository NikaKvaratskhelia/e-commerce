import { Prisma } from "@/generated/prisma/browser";

export type ProductModel = Prisma.ProductGetPayload<{
  include: {
    discounts: true;
    productCategory: true;
    colors: {
      include: {
        product: true;
        model3d: {
          include: {
            color: true;
          };
        };
        photos: {
          include: {
            color: true;
          };
        };
      };
    };
  };
}>;
