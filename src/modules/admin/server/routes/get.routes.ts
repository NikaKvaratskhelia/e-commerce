import { requireRoleMiddleware } from "@/src/auth/middleware";
import { prisma } from "@/src/library/db";
import { ApiResponse } from "@/src/types/ApiReturnType";
import { Hono } from "hono";

export const GetRoutes = new Hono()
  .get("/stats", requireRoleMiddleware(["admin"]), async (c) => {
    const now = new Date();

    const currentMonthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    const currentMonthEnd = new Date(
      now.getFullYear(),
      now.getMonth() + 1,
      0,
      23,
      59,
      59,
    );
    const lastMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const lastMonthEnd = new Date(
      now.getFullYear(),
      now.getMonth(),
      0,
      23,
      59,
      59,
    );

    const [
      currentRevenue,
      lastRevenue,
      currentOrders,
      lastOrders,
      totalProducts,
      currentProducts,
      lastProducts,
      totalUsers,
    ] = await prisma.$transaction([
      prisma.order.aggregate({
        _sum: { total: true },
        where: { createdAt: { gte: currentMonthStart, lte: currentMonthEnd } },
      }),
      prisma.order.aggregate({
        _sum: { total: true },
        where: { createdAt: { gte: lastMonthStart, lte: lastMonthEnd } },
      }),
      prisma.order.count({
        where: { createdAt: { gte: currentMonthStart, lte: currentMonthEnd } },
      }),
      prisma.order.count({
        where: { createdAt: { gte: lastMonthStart, lte: lastMonthEnd } },
      }),
      prisma.product.count(),
      prisma.product.count({
        where: { createdAt: { gte: currentMonthStart, lte: currentMonthEnd } },
      }),
      prisma.product.count({
        where: { createdAt: { gte: lastMonthStart, lte: lastMonthEnd } },
      }),
      prisma.user.count(),
    ]);

    const growthRate = (current: number, last: number) => {
      if (last === 0) return current > 0 ? 100 : 0;
      return parseFloat((((current - last) / last) * 100).toFixed(2));
    };

    const currentRevenueVal = currentRevenue._sum.total ?? 0;
    const lastRevenueVal = lastRevenue._sum.total ?? 0;

    return c.json({
      revenue: {
        current: currentRevenueVal,
        last: lastRevenueVal,
        growth: growthRate(currentRevenueVal, lastRevenueVal),
      },
      orders: {
        current: currentOrders,
        last: lastOrders,
        growth: growthRate(currentOrders, lastOrders),
      },
      products: {
        total: totalProducts,
        addedThisMonth: currentProducts,
        addedLastMonth: lastProducts,
        growth: growthRate(currentProducts, lastProducts),
      },
      users: {
        total: totalUsers,
      },
    });
  })
  .get("/revenue", requireRoleMiddleware(["admin"]), async (c) => {
    const now = new Date();
    const currentYear = now.getFullYear();

    const orders = await prisma.order.groupBy({
      by: ["createdAt"],
      _sum: { total: true },
      where: {
        createdAt: {
          gte: new Date(`${currentYear}-01-01`),
          lte: new Date(`${currentYear}-12-31`),
        },
      },
    });

    const ALL_MONTHS = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const revenueMap = new Map<number, number>();
    for (const order of orders) {
      const monthIndex = new Date(order.createdAt).getMonth();
      const existing = revenueMap.get(monthIndex) ?? 0;
      revenueMap.set(monthIndex, existing + (order._sum.total ?? 0));
    }

    const data = ALL_MONTHS.map((month, i) => ({
      month,
      revenue: revenueMap.get(i) ?? 0,
    }));

    return c.json({ data });
  })
  .get("/latestOrders", requireRoleMiddleware(["admin"]), async (c) => {
    const orders = await prisma.order.findMany({
      take: 10,
      orderBy: { createdAt: "desc" },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    return c.json({ data: orders });
  })
  .get("/products", async (c) => {
    const products = await prisma.product.findMany({
      select: {
        id: true,
        title: true,
        description: true,
        thumbnail: true,
        price: true,
        stock: true,
        productCategory: {
          select: {
            id: true,
            title: true,
          },
        },
        _count: {
          select: {
            colors: true,
          },
        },
        discounts: {
          where: {
            discountEndDate: {
              gt: new Date(),
            },
          },
        },
      },
    });

    const response: ApiResponse<typeof products> = {
      success: true,
      status: 200,
      message: "Products fetched successfully",
      data: products,
    };

    return c.json(response, response.status);
  })
  .get("/orders-all", async (c) => {
    const orders = await prisma.order.findMany({
      select: {
        id: true,
        user: {
          select: {
            name: true,
          },
        },
        createdAt: true,
        _count: {
          select: {
            orderItems: true,
          },
        },
        paymentMethod: true,
        total: true,
      },
    });

    const response: ApiResponse<typeof orders> = {
      success: true,
      status: 200,
      message: "Products fetched successfully",
      data: orders,
    };

    return c.json(response, response.status);
  });
