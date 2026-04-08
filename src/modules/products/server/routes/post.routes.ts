import { requireRoleMiddleware } from "@/src/auth/middleware";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { postProductSchema } from "../validators";
import { ApiResponse } from "@/src/types/ApiReturnType";
import { prisma } from "@/src/library/db";
import { Prisma } from "@/generated/prisma/client";

export const PostRoutes = new Hono().post(
  "/",
  requireRoleMiddleware(["admin"]),
  zValidator("json", postProductSchema),
  async (c) => {
    type CreatedProduct = Prisma.ProductGetPayload<{
      include: {
        colors: {
          include: {
            photos: true;
            model3d: true;
          };
        };
        productCategory: true;
      };
    }>;

    let response: ApiResponse<CreatedProduct>;

    const body = c.req.valid("json");

    const {
      title,
      description,
      price,
      thumbnail,
      stock,
      productCategoryId,
      colors,
    } = body;

    if (
      !title?.trim() ||
      !description?.trim() ||
      !thumbnail?.trim() ||
      productCategoryId == null ||
      price == null ||
      stock == null
    ) {
      response = {
        message: "საჭირო ველები აკლია!",
        status: 400,
        success: false,
      };

      return c.json(response, response.status);
    }

    const existingCategory = await prisma.productCategory.findUnique({
      where: { id: Number(productCategoryId) },
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
      data: {
        title: title.trim(),
        description: description.trim(),
        price: Number(price),
        thumbnail: thumbnail.trim(),
        stock: Number(stock),
        productCategoryId: Number(productCategoryId),

        colors: {
          create:
            colors?.map((item) => ({
              color: item.color.trim(),
              has3D: Boolean(item.has3D),

              photos: {
                create:
                  item.photos?.map((photoUrl: string) => ({
                    url: photoUrl,
                  })) ?? [],
              },

              ...(item.has3D && item.model3d && item.model3d.trim().length > 0
                ? {
                    model3d: {
                      create: {
                        url: item.model3d.trim(),
                      },
                    },
                  }
                : {}),
            })) ?? [],
        },
      },
      include: {
        colors: {
          include: {
            photos: true,
            model3d: true,
          },
        },
        productCategory: true,
      },
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
