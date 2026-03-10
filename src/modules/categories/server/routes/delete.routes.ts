import { ProductCategory } from "@/generated/prisma/browser";
import { requireRoleMiddleware } from "@/src/auth/middleware";
import { prisma } from "@/src/library/db";
import { ApiResponse } from "@/src/types/ApiReturnType";
import { Hono } from "hono";

export const DeleteRoutes = new Hono().delete(
  "/:id",
  requireRoleMiddleware(["admin"]),
  async (c) => {
    let response: ApiResponse<ProductCategory>;

    const id = Number(c.req.param("id"));

    if (Number.isNaN(id)) {
      response = {
        message: "არასწორი id.",
        status: 400,
        success: false,
      };

      return c.json(response, response.status);
    }
    const existingCategory = await prisma.productCategory.findUnique({
      where: { id },
    });

    if (!existingCategory) {
      response = {
        message: "თქვენი არჩეული კატეგორია არ მოიძებნა.",
        status: 404,
        success: false,
      };
      return c.json(response, response.status);
    }

    const deletedCategory = await prisma.productCategory.delete({
      where: { id },
    });

    response = {
      message: "კატეგორია წაიშალა.",
      status: 200,
      success: true,
      data: deletedCategory,
    };

    return c.json(response, response.status);
  },
);
