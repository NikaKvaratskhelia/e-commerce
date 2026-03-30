import { prisma } from "@/src/library/db";
import { Hono } from "hono";
import {
  get_product_details_selector,
  get_products_selector,
  ProductDetailModel,
} from "../selectors";
import { ApiResponse } from "@/src/types/ApiReturnType";
import { Prisma } from "@/generated/prisma/browser";
import { ProductModel } from "@/src/modules/products/server/models/product.model";

type Queries = {
  limit: string;
  sortBy: string;
  sort: string;
  newOnly: string;
  minPrice: string;
  maxPrice: string;
  categoryId: string;
};

type GetManyDataType = {
  products: ProductModel[];
  pagination: {
    total: number;
    limit: number;
    totalPages: number;
  };
};

export const GetRoutes = new Hono()
  .get("/", async (c) => {
    const {
      limit: limitStr,
      sortBy,
      sort,
      newOnly,
      minPrice: minPriceStr,
      maxPrice: maxPriceStr,
      categoryId: categoryIdStr,
    } = c.req.query() as Queries;

    const limit = Number(limitStr ?? 10);
    const categoryId = Number(categoryIdStr);
    const minPrice =
      minPriceStr !== undefined ? Number(minPriceStr) : undefined;
    const maxPrice =
      maxPriceStr !== undefined ? Number(maxPriceStr) : undefined;
    const onlyNew = newOnly?.toLowerCase() === "true";

    let response: ApiResponse<GetManyDataType>;

    if (!Number.isInteger(limit) || limit < 1) {
      response = {
        success: false,
        message: "პაგინაციის პარამეტრები არასწორია.",
        status: 400,
      };
      return c.json(response, response.status);
    }

    if (
      (minPrice !== undefined && isNaN(minPrice)) ||
      (maxPrice !== undefined && isNaN(maxPrice))
    ) {
      response = {
        success: false,
        message: "ფასის პარამეტრები არასწორია.",
        status: 400,
      };
      return c.json(response, response.status);
    }

    const sortableFields = ["createdAt", "price", "title"] as const;

    const isValidSortField =
      sortBy &&
      sortableFields.includes(sortBy as (typeof sortableFields)[number]);

    const sortOrder: Prisma.SortOrder =
      sort?.toLowerCase() === "asc" ? "asc" : "desc";

    const orderBy: Prisma.ProductOrderByWithRelationInput = isValidSortField
      ? { [sortBy]: sortOrder }
      : { createdAt: "desc" };

    const where: Prisma.ProductWhereInput = {
      ...(onlyNew
        ? {
            createdAt: {
              gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
            },
          }
        : {}),
      ...(categoryIdStr !== undefined ? { productCategoryId: categoryId } : {}),
      ...(minPrice !== undefined || maxPrice !== undefined
        ? {
            price: {
              ...(minPrice !== undefined ? { gte: minPrice } : {}),
              ...(maxPrice !== undefined ? { lte: maxPrice } : {}),
            },
          }
        : {}),
    };

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        take: limit,
        select: get_products_selector,
        orderBy,
      }),
      prisma.product.count({ where }),
    ]);

    response = {
      success: true,
      message: "პროდუქტები დაიფეჩა.",
      status: 200,
      data: {
        products,
        pagination: {
          total,
          limit,
          totalPages: Math.ceil(total / limit),
        },
      },
    };

    return c.json(response, response.status);
  })
  .get("/:id", async (c) => {
    const id = Number(c.req.param("id"));
    let response: ApiResponse<ProductDetailModel>;

    if (!id || isNaN(id)) {
      response = {
        status: 400,
        message: "ID აუცილებელი ველია.",
        success: false,
      };
      return c.json(response, response.status);
    }

    const product = await prisma.product.findUnique({
      where: { id },
      select: get_product_details_selector,
    });

    if (!product) {
      response = {
        success: false,
        status: 404,
        message: "პროდუქტი ამ ID-ით არ მოიძებნა",
      };
      return c.json(response, response.status);
    }

    response = {
      data: product,
      message: "პროდუქტი მოიძებნა.",
      status: 200,
      success: true,
    };

    return c.json(response, response.status);
  })
  .get("/:id", async (c) => {
    const id = Number(c.req.param("id"));
    let response: ApiResponse<ProductDetailModel>;

    if (!id || isNaN(id)) {
      response = {
        status: 400,
        message: "ID აუცილებელი ველია.",
        success: false,
      };
      return c.json(response, response.status);
    }

    const product = await prisma.product.findUnique({
      where: { id },
      select: get_product_details_selector,
    });

    if (!product) {
      response = {
        success: false,
        status: 404,
        message: "პროდუქტი ამ ID-ით არ მოიძებნა",
      };

      return c.json(response, response.status);
    }

    response = {
      data: product,
      message: "პროდუქტი მოიძებნა.",
      status: 200,
      success: true,
    };

    return c.json(response, response.status);
  });
