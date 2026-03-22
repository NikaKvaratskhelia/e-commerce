import { prisma } from "@/src/library/db";
import { ApiResponse } from "@/src/types/ApiReturnType";
import { Hono } from "hono";
import { get_comments_selector, ProductComments } from "../selectors";

export const GetRoutes = new Hono().get("/:productId", async (c) => {
  let response: ApiResponse<ProductComments[]>;

  const id = Number(c.req.param("productId"));

  if (isNaN(id) || !id) {
    response = {
      status: 400,
      message: "ID აუცილებელია.",
      success: false,
    };

    return c.json(response, response.status);
  }

  const comments = await prisma.comment.findMany({
    where: { prodcutId: id },
    select: get_comments_selector,
  });

  if (!comments || comments.length === 0) {
    response = {
      status: 200,
      message: "კომენტარები არ აქვს ამ პოსტს",
      success: true,
    };

    return c.json(response, response.status);
  }

  response = {
    status: 200,
    message: "კომენტარები დაიფეჩა",
    success: true,
    data: comments,
  };

  return c.json(response, response.status);
});
