import { Blog } from "@/generated/prisma/browser";
import { requireRoleMiddleware } from "@/src/auth/middleware";
import { prisma } from "@/src/library/db";
import { ApiResponse } from "@/src/types/ApiReturnType";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { PutBlogSchema, putBlogSchema } from "../validations";

export const PutRoutes = new Hono().put(
  "/:id",
  requireRoleMiddleware(["admin"]),
  zValidator("json", putBlogSchema),
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
    const body = c.req.valid("json");

    const { title, thumbnail, content } = body;

    const changeValues: Partial<PutBlogSchema> = {};

    if (title && title.trim()) changeValues.title = title;
    if (thumbnail && thumbnail.trim()) changeValues.thumbnail = thumbnail;
    if (content && content.trim()) changeValues.content = content;

    const created = await prisma.blog.update({
      where: { id },
      data: changeValues,
    });

    response = {
      data: created,
      success: true,
      status: 200,
      message: "ბლოგი განახლდა.",
    };

    return c.json(response, response.status);
  },
);
