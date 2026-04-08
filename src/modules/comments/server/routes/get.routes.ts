import { prisma } from "@/src/library/db";
import { ApiResponse } from "@/src/types/ApiReturnType";
import { Hono } from "hono";
import {
  get_comments_selector,
  ProductCommentDto,
  RawProductComment,
  CommentReplyDto,
  get_replies_selector,
  RawCommentReply,
} from "../selectors";
import { requireAuthMiddleware } from "@/src/auth/middleware";

export const GetRoutes = new Hono()
  .get("/:productId", requireAuthMiddleware(), async (c) => {
    let response: ApiResponse<ProductCommentDto[]>;

    const productId = Number(c.req.param("productId"));
    const user = c.get("user") as { id: string } | undefined;

    if (isNaN(productId) || !productId) {
      response = {
        status: 400,
        message: "ID აუცილებელია.",
        success: false,
      };

      return c.json(response, response.status);
    }

    const comments = await prisma.comment.findMany({
      where: { prodcutId: productId },
      select: get_comments_selector,
      orderBy: { createdAt: "desc" },
    });

    const formattedComments: ProductCommentDto[] = comments.map(
      (comment: RawProductComment) => ({
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
        isLikedByMe: user
          ? comment.likes.some((like) => like.userId === user.id)
          : false,
      }),
    );

    response = {
      status: 200,
      message:
        formattedComments.length > 0
          ? "კომენტარები დაიფეჩა"
          : "კომენტარები არ აქვს ამ პროდუქტს",
      success: true,
      data: formattedComments,
    };

    return c.json(response, response.status);
  })
  .get("/:commentId/replies", async (c) => {
    let response: ApiResponse<CommentReplyDto[]>;

    const commentId = Number(c.req.param("commentId"));

    if (isNaN(commentId) || !commentId) {
      response = {
        status: 400,
        message: "ID აუცილებელია.",
        success: false,
      };

      return c.json(response, response.status);
    }

    const comment = await prisma.comment.findUnique({
      where: { id: commentId },
      select: { id: true },
    });

    if (!comment) {
      response = {
        status: 404,
        message: "კომენტარი ვერ მოიძებნა.",
        success: false,
      };

      return c.json(response, response.status);
    }

    const replies = await prisma.reply.findMany({
      where: { commentId },
      select: get_replies_selector,
      orderBy: { createdAt: "asc" },
    });

    const data: CommentReplyDto[] = replies.map((reply: RawCommentReply) => ({
      id: reply.id,
      content: reply.content,
      createdAt: reply.createdAt,
      updatedAt: reply.updatedAt,
      author: {
        id: reply.author.id,
        name: reply.author.name,
        username: reply.author.username,
      },
    }));

    response = {
      status: 200,
      message: replies.length > 0 ? "პასუხები დაიფეჩა." : "პასუხები არ არის.",
      success: true,
      data,
    };

    return c.json(response, response.status);
  });
