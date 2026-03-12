import { requireRoleMiddleware } from "@/src/auth/middleware";
import { prisma } from "@/src/library/db";
import { ApiResponse } from "@/src/types/ApiReturnType";
import { Hono } from "hono";

export const DeleteRoutes = new Hono().delete(
  "/:id",
  requireRoleMiddleware(["admin"]),
  async (c) => {
    let response: ApiResponse<null>;
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

    await prisma.product.delete({ where: { id } });
    response = {
      status: 200,
      success: true,
      message: "პროდუქტი წარმატებით წაიშალა.",
    };

    return c.json(response, response.status);
  },
);
