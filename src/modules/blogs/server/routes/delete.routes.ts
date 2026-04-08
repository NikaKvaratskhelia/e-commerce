import { Blog } from "@/generated/prisma/browser";
import { requireRoleMiddleware } from "@/src/auth/middleware";
import { prisma } from "@/src/library/db";
import { ApiResponse } from "@/src/types/ApiReturnType";
import { Hono } from "hono";

export const DeleteRoutes = new Hono().delete(
  "/:id",
  requireRoleMiddleware(["admin"]),
  async (c) => {
    let response: ApiResponse<Blog>;
    const id = Number(c.req.param("id"));

    if (!id || isNaN(id)) {
      response = {
        success: false,
        status: 400,
        message: "ID აუცილებელია.",
      };

      return c.json(response, response.status);
    }

    const blog = await prisma.blog.findUnique({ where: { id } });

    if (!blog) {
      response = {
        success: false,
        status: 404,
        message: "ბლოგი ვერ მოიძებნა.",
      };

      return c.json(response, response.status);
    }

    const deleted = await prisma.blog.delete({ where: { id } });

    response = {
      data: deleted,
      success: true,
      status: 200,
      message: "ბლოგი წაიშალა.",
    };

    return c.json(response, response.status);
  },
);
