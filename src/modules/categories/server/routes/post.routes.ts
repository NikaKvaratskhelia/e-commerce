import { ProductCategory } from "@/generated/prisma/browser";
import { requireRoleMiddleware } from "@/src/auth/middleware";
import { prisma } from "@/src/library/db";
import { ApiResponse } from "@/src/types/ApiReturnType";
import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { postCategorySchema } from "../validators";

export const PostRoutes = new Hono().post(
  "/",
  requireRoleMiddleware(["admin"]),
  zValidator("json", postCategorySchema),
  async (c) => {
    let response: ApiResponse<ProductCategory>;

    const body = c.req.valid("json");

    if (!body.title || !body.categoryPhoto) {
      response = {
        message: "საჭირო ველები აკლია!",
        status: 403,
        success: false,
      };

      return c.json(response, response.status);
    }

    const existingCategory = await prisma.productCategory.findUnique({
      where: { title: body.title },
    });

    if (existingCategory) {
      response = {
        message: "ეს კატეგორია უკვე არსებობს!",
        status: 500,
        success: false,
      };
      return c.json(response, response.status);
    }

    const category = await prisma.productCategory.create({
      data: {
        title: body.title,
        categoryPhoto: body.categoryPhoto,
      },
    });

    response = {
      data: category,
      message: "კატეგორია შეიქმნა.",
      status: 201,
      success: true,
    };

    return c.json(response, response.status);
  },
);
