import { ProductCategory } from "@/generated/prisma/browser";
import { prisma } from "@/src/library/db";
import { ApiResponse } from "@/src/types/ApiReturnType";
import { Hono } from "hono";

export const GetRoutes = new Hono().get("/", async (c) => {
  const categories = await prisma.productCategory.findMany();

  const response: ApiResponse<ProductCategory[]> = {
    message: "Categories Fetched successfully!",
    data: categories,
    status: 200,
    success: true,
  };

  return c.json(response);
});
