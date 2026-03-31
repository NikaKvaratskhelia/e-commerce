import { Blog } from "@/generated/prisma/browser";
import { validateRequest } from "@/src/auth/validate";
import { prisma } from "@/src/library/db";
import { ApiResponse } from "@/src/types/ApiReturnType";
import { Hono } from "hono";

type PaginatedResp = {
  blogs: Blog[];
  pagination?: {
    total: number;
    limit: number;
  };
};

export const GetRoutes = new Hono()
  .get("/", async (c) => {
    let response: ApiResponse<PaginatedResp>;
    const { user } = await validateRequest();
    if (user?.role === "admin") {
      const blogs = await prisma.blog.findMany({
        orderBy: {
          createdAt: "desc",
        },
      });

      response = {
        data: { blogs },
        status: 200,
        success: true,
        message: "Blogs fetched",
      };

      return c.json(response, response.status)
    }

    const limit = Number(c.req.query("limit") ?? "10");

    if (!Number.isInteger(limit) || limit < 1) {
      response = {
        success: false,
        status: 400,
        message: "პაგინაციის პარამეტრები არასწორია.",
      };

      return c.json(response, response.status);
    }

    const [blogs, count] = await Promise.all([
      prisma.blog.findMany({
        take: limit,
        orderBy: {
          createdAt: "desc",
        },
      }),
      prisma.blog.count(),
    ]);

    response = {
      success: true,
      status: 200,
      message: "ბლოგები დაიფეჩა.",
      data: {
        blogs,
        pagination: {
          total: count,
          limit,
        },
      },
    };

    return c.json(response, response.status);
  })
  .get("/:id", async (c) => {
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

    response = {
      data: blog,
      success: true,
      status: 200,
      message: "ბლოგი მოიძებნა.",
    };

    return c.json(response, response.status);
  });
