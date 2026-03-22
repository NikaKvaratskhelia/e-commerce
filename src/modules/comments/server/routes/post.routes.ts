import { prisma } from "@/src/library/db";
import { ApiResponse } from "@/src/types/ApiReturnType";
import { Hono } from "hono";
import { get_comments_selector, ProductComments } from "../selectors";
import { zValidator } from "@hono/zod-validator";
import { requireAuthMiddleware } from "@/src/auth/middleware";
import { commentSchema } from "../validators";
import { Reply } from "@/generated/prisma/browser";
import z from "zod";

export const PostRoutes = new Hono()
  .post(
    "/:productId",
    zValidator("json", commentSchema),
    requireAuthMiddleware(),
    async (c) => {
      let response: ApiResponse<ProductComments>;

      const id = Number(c.req.param("productId"));

      if (isNaN(id) || !id) {
        response = { status: 400, message: "ID აუცილებელია.", success: false };
        return c.json(response, response.status);
      }

      const { content, rating } = c.req.valid("json");
      const userId = c.get("user").id;

      const product = await prisma.product.findUnique({ where: { id } });

      if (!product) {
        response = {
          status: 404,
          message: "პროდუქტი ვერ მოიძებნა.",
          success: false,
        };
        return c.json(response, response.status);
      }

      const comment = await prisma.comment.create({
        data: { content, rating, userId, prodcutId: id },
        select: get_comments_selector,
      });

      response = {
        status: 201,
        message: "კომენტარი დაემატა.",
        success: true,
        data: comment,
      };

      return c.json(response, response.status);
    },
  )
  .post(
    "/reply/:commentId",
    requireAuthMiddleware(),
    zValidator("json", z.object({ content: z.string().max(256) })),
    async (c) => {
      let response: ApiResponse<Reply>;

      const id = Number(c.req.param("commentId"));

      if (isNaN(id) || !id) {
        response = { status: 400, message: "ID აუცილებელია.", success: false };
        return c.json(response, response.status);
      }

      const { content } = c.req.valid("json");
      const userId = c.get("user").id;

      const comment = await prisma.comment.findUnique({ where: { id } });

      if (!comment) {
        response = {
          status: 404,
          message: "კომენტარი ვერ მოიძებნა.",
          success: false,
        };
        return c.json(response, response.status);
      }

      const reply = await prisma.reply.create({
        data: { content, userId, commentId: id },
      });

      response = {
        status: 201,
        message: "პასუხი დაემატა.",
        success: true,
        data: reply,
      };

      return c.json(response, response.status);
    },
  );
