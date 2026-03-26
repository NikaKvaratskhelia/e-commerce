import { ApiResponse } from "@/src/types/ApiReturnType";
import { Hono } from "hono";
import { get_order_selector, OrderType } from "../selectors/get.orders";
import { requireAuthMiddleware } from "@/src/auth/middleware";
import { prisma } from "@/src/library/db";

export const GetRoutes = new Hono()
  .get("/", requireAuthMiddleware(), async (c) => {
    let response: ApiResponse<OrderType[]>;

    const { id } = c.get("user");

    const orders = await prisma.order.findMany({
      where: { userId: id },
      select: get_order_selector,
    });

    if (!orders) {
      response = {
        message: "შეკვეთები ვერ მოიძებნა.",
        status: 404,
        success: false,
      };

      return c.json(response, response.status);
    }

    response = {
      data: orders,
      success: true,
      status: 200,
      message: "შეკვეტები მოიძებნა.",
    };

    return c.json(response, response.status);
  })
  .get("/:id", requireAuthMiddleware(), async (c) => {
    let response: ApiResponse<OrderType>;

    const { id: userId } = c.get("user");
    const id = c.req.param("id");

    if (!id || isNaN(Number(id))) {
      response = {
        message: "ID სავალდებულოა.",
        status: 400,
        success: false,
      };

      return c.json(response, response.status);
    }

    const order = await prisma.order.findUnique({
      where: { userId, id },
      select: get_order_selector,
    });

    if (!order) {
      response = {
        message: "შეკვეთები ვერ მოიძებნა.",
        status: 404,
        success: false,
      };

      return c.json(response, response.status);
    }

    response = {
      data: order,
      success: true,
      status: 200,
      message: "შეკვეტები მოიძებნა.",
    };

    return c.json(response, response.status);
  });
