import { requireAuthMiddleware } from "@/src/auth/middleware";
import { prisma } from "@/src/library/db";
import { ApiResponse } from "@/src/types/ApiReturnType";
import { Hono } from "hono";

export type OrdersModel = {
  id: string;
  createdAt: Date;
  total: number;
}[];

export const GetRoutes = new Hono().get(
  "/",
  requireAuthMiddleware(),
  async (c) => {
    let response: ApiResponse<OrdersModel>;
    const { id } = c.get("user");

    const orders = await prisma.order.findMany({
      where: { userId: id },
      select: {
        id: true,
        createdAt: true,
        total: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    response = {
      success: true,
      status: 200,
      message: "Order history fetched successfully",
      data: orders,
    };

    return c.json(response, response.status);
  },
);
