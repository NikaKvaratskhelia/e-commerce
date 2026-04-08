import { Prisma } from "@/generated/prisma/browser";
import { prisma } from "@/src/library/db";
import { ApiResponse } from "@/src/types/ApiReturnType";
import { Hono } from "hono";

export type CategoryFetched = Prisma.ProductCategoryGetPayload<{
  include: { _count: { select: { products: true } } };
}>;

export const GetRoutes = new Hono().get("/", async (c) => {
  const categories = await prisma.productCategory.findMany({
    include: { _count: { select: { products: true } } },
  });

  const response: ApiResponse<CategoryFetched[]> = {
    message: "Categories Fetched successfully!",
    data: categories,
    status: 200,
    success: true,
  };

  return c.json(response);
});
