import { ProductCategory } from "@/generated/prisma/browser";
import { requireRoleMiddleware } from "@/src/auth/middleware";
import { prisma } from "@/src/library/db";
import { ApiResponse } from "@/src/types/ApiReturnType";
import { Hono } from "hono";
import { PutCategoryModel } from "../models";

export const PutRoutes = new Hono().put(
  "/:id",
  requireRoleMiddleware(["admin"]),
  async (c) => {
    let response: ApiResponse<ProductCategory>;

    const id = Number(c.req.param("id"));
    const body = (await c.req.json()) as PutCategoryModel;

    if (Number.isNaN(id)) {
      response = {
        message: "არასწორი id.",
        status: 400,
        success: false,
      };

      return c.json(response, response.status);
    }

    if (!body.title && !body.categoryPhoto) {
      response = {
        message: "საჭირო ველები აკლია!",
        status: 400,
        success: false,
      };

      return c.json(response, response.status);
    }

    const category = await prisma.productCategory.findUnique({
      where: { id },
    });

    if (!category) {
      response = {
        message: "კატეგორია ვერ მოიძებნა.",
        status: 404,
        success: false,
      };

      return c.json(response, response.status);
    }

    const data: PutCategoryModel = {};

    if (body.title && body.title !== category.title) {
      const existingCategory = await prisma.productCategory.findUnique({
        where: { title: body.title },
      });

      if (existingCategory && existingCategory.id !== category.id) {
        response = {
          message: "ეს კატეგორია უკვე არსებობს!",
          status: 400,
          success: false,
        };

        return c.json(response, response.status);
      }

      data.title = body.title;
    }

    if (body.categoryPhoto && body.categoryPhoto !== category.categoryPhoto) {
      data.categoryPhoto = body.categoryPhoto;
    }

    if (Object.keys(data).length === 0) {
      response = {
        message: "განახლებისთვის ახალი მონაცემი არ არის გადმოცემული.",
        status: 400,
        success: false,
      };

      return c.json(response, response.status);
    }

    const updatedCategory = await prisma.productCategory.update({
      where: { id },
      data,
    });

    response = {
      data: updatedCategory,
      message: "კატეგორია განახლდა.",
      status: 200,
      success: true,
    };

    return c.json(response, response.status);
  },
);
