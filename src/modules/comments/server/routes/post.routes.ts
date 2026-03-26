import { prisma } from "@/src/library/db";
import { ApiResponse } from "@/src/types/ApiReturnType";
import { Hono } from "hono";
import {
  get_comments_selector,
  ProductCommentDto,
  RawProductComment,
} from "../selectors";
import { zValidator } from "@hono/zod-validator";
import { requireAuthMiddleware } from "@/src/auth/middleware";
import { commentSchema } from "../validators";
import { Reply } from "@/generated/prisma/browser";
import z from "zod";

function mapCommentToDto(
  comment: RawProductComment,
  currentUserId?: string,
): ProductCommentDto {
  return {
    id: comment.id,
    content: comment.content,
    rating: comment.rating,
    createdAt: comment.createdAt,
    updatedAt: comment.updatedAt,
    author: {
      id: comment.author.id,
      name: comment.author.name,
      username: comment.author.username,
    },
    likesCount: comment._count.likes,
    repliesCount: comment._count.replies,
    isLikedByMe: currentUserId
      ? comment.likes.some((like) => like.userId === currentUserId)
      : false,
  };
}

export const PostRoutes = new Hono()
  .post(
    "/:productId",
    zValidator("json", commentSchema),
    requireAuthMiddleware(),
    async (c) => {
      let response: ApiResponse<ProductCommentDto>;

      const productId = Number(c.req.param("productId"));

      if (isNaN(productId) || !productId) {
        response = {
          status: 400,
          message: "ID აუცილებელია.",
          success: false,
        };
        return c.json(response, response.status);
      }

      const { content, rating } = c.req.valid("json");
      const userId = c.get("user").id;

      const product = await prisma.product.findUnique({
        where: { id: productId },
      });

      if (!product) {
        response = {
          status: 404,
          message: "პროდუქტი ვერ მოიძებნა.",
          success: false,
        };
        return c.json(response, response.status);
      }

      const comment = await prisma.comment.create({
        data: {
          content,
          rating,
          userId,
          prodcutId: productId,
        },
        select: get_comments_selector,
      });

      response = {
        status: 201,
        message: "კომენტარი დაემატა.",
        success: true,
        data: mapCommentToDto(comment, userId),
      };

      return c.json(response, response.status);
    },
  )
  .post(
    "/reply/:commentId",
    requireAuthMiddleware(),
    zValidator("json", z.object({ content: z.string().min(1).max(256) })),
    async (c) => {
      let response: ApiResponse<Reply>;

      const commentId = Number(c.req.param("commentId"));

      if (isNaN(commentId) || !commentId) {
        response = {
          status: 400,
          message: "ID აუცილებელია.",
          success: false,
        };
        return c.json(response, response.status);
      }

      const { content } = c.req.valid("json");
      const userId = c.get("user").id;

      const comment = await prisma.comment.findUnique({
        where: { id: commentId },
      });

      if (!comment) {
        response = {
          status: 404,
          message: "კომენტარი ვერ მოიძებნა.",
          success: false,
        };
        return c.json(response, response.status);
      }

      const reply = await prisma.reply.create({
        data: { content, userId, commentId },
      });

      response = {
        status: 201,
        message: "პასუხი დაემატა.",
        success: true,
        data: reply,
      };

      return c.json(response, response.status);
    },
  )
  .post("/like/:commentId", requireAuthMiddleware(), async (c) => {
    const commentId = Number(c.req.param("commentId"));
    const userId = c.get("user").id;

    if (!userId || isNaN(commentId) || !commentId) {
      return c.json(
        { status: 400, message: "ID აუცილებელია.", success: false },
        400,
      );
    }

    const comment = await prisma.comment.findUnique({
      where: { id: commentId },
      select: { id: true },
    });

    if (!comment) {
      return c.json(
        { status: 404, message: "კომენტარი ვერ მოიძებნა.", success: false },
        404,
      );
    }

    const existingLike = await prisma.like.findUnique({
      where: {
        userId_commentId: { userId, commentId },
      },
    });

    if (existingLike) {
      await prisma.like.delete({
        where: { id: existingLike.id },
      });

      return c.json(
        {
          status: 200,
          message: "მოწონება მოიხსნა.",
          success: true,
          data: {
            commentId,
            isLikedByMe: false,
          },
        },
        200,
      );
    }

    await prisma.like.create({
      data: { userId, commentId },
    });

    return c.json(
      {
        status: 200,
        message: "მოწონება დაემატა.",
        success: true,
        data: {
          commentId,
          isLikedByMe: true,
        },
      },
      200,
    );
  });
