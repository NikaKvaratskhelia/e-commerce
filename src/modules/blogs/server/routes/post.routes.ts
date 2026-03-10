import { Blog } from "@/generated/prisma/browser";
import { requireRoleMiddleware } from "@/src/auth/middleware";
import { prisma } from "@/src/library/db";
import { ApiResponse } from "@/src/types/ApiReturnType";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { postBlogSchema } from "../validations";

export const PostRoutes = new Hono().post(
  "/",
  requireRoleMiddleware(["admin"]),
  zValidator("json", postBlogSchema),
  async (c) => {
    let response: ApiResponse<Blog>;

    const body = c.req.valid("json");

    const { title, thumbnail, content } = body;

    if (!title.trim() || !thumbnail.trim() || !content.trim()) {
      response = {
        message: "არასწორი ველები.",
        status: 400,
        success: false,
      };
    }
    const created = await prisma.blog.create({ data: body });

    response = {
      data: created,
      success: true,
      status: 201,
      message: "ბლოგი დაემატა.",
    };

    return c.json(response, response.status);
  },
);
