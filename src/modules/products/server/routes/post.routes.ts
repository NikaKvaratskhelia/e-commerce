import { requireRoleMiddleware } from "@/src/auth/middleware";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { postProductSchema } from "../validators";
import { ApiResponse } from "@/src/types/ApiReturnType";
import { Product } from "@/generated/prisma/client";
import { prisma } from "@/src/library/db";

export const PostRoutes = new Hono().post(
  "/",
  requireRoleMiddleware(["admin"]),
  zValidator("json", postProductSchema),
  async (c) => {
    let response: ApiResponse<Product>;

    const body = c.req.valid("json");

    const { title, description, price, thumbnail, stock, productCategoryId } =
      body;

    if (
      !title ||
      !description ||
      !price ||
      !thumbnail ||
      !stock ||
      !productCategoryId
    ) {
      response = {
        message: "საჭირო ველები აკლია!",
        status: 403,
        success: false,
      };

      return c.json(response, response.status);
    }

    const existingCategory = await prisma.productCategory.findUnique({
      where: { id: productCategoryId },
    });

    if (!existingCategory) {
      response = {
        message: "ეს კატეგორია არ არსებობს.",
        success: false,
        status: 404,
      };

      return c.json(response, response.status);
    }

    const createdProduct = await prisma.product.create({
      data: body,
    });

    response = {
      message: "პროდუქტი წარმატებით დაემატა მაღაზიაში.",
      status: 201,
      success: true,
      data: createdProduct,
    };

    return c.json(response, response.status);
  },
);
