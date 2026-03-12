import { requireRoleMiddleware } from "@/src/auth/middleware";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { PutProductModel, putProductSchema } from "../validators";
import { ApiResponse } from "@/src/types/ApiReturnType";
import { Product } from "@/generated/prisma/client";
import { prisma } from "@/src/library/db";

export const PutRoutes = new Hono().put(
  "/:id",
  requireRoleMiddleware(["admin"]),
  zValidator("json", putProductSchema),

  async (c) => {
    let response: ApiResponse<Product>;

    const id = Number(c.req.param("id"));

    if (!id || isNaN(id)) {
      response = {
        status: 400,
        success: false,
        message: "ID სავალდებულოა.",
      };

      return c.json(response, response.status);
    }

    const product = await prisma.product.findUnique({ where: { id } });

    if (!product) {
      response = {
        status: 404,
        success: false,
        message: "პროდუქტი არ მოიძებნა.",
      };

      return c.json(response, response.status);
    }
    const body = c.req.valid("json");

    const { title, description, thumbnail, stock, price, productCategoryId } =
      body;

    const changeValues: Partial<PutProductModel> = {};

    if (title?.trim()) changeValues.title = title;
    if (description?.trim()) changeValues.description = description;
    if (thumbnail?.trim()) changeValues.thumbnail = thumbnail;
    if (typeof stock === "number") changeValues.stock = stock;
    if (typeof price === "number") changeValues.price = price;
    if (typeof productCategoryId === "number")
      changeValues.productCategoryId = productCategoryId;

    const updatedProduct = await prisma.product.update({
      where: { id },
      data: changeValues,
    });

    response = {
      data: updatedProduct,
      status: 200,
      success: true,
      message: "პროდუქტი წარმატებით განახლდა",
    };

    return c.json(response, response.status)
  },
);
