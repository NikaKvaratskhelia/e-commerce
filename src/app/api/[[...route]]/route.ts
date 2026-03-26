import { Hono } from "hono";
import { handle } from "hono/vercel";
import categoryRoute from "@/src/modules/categories/server";
import productsRoute from "@/src/modules/products/server";
import blogRoute from "@/src/modules/blogs/server";
import verifyRoutes from "@/src/modules/auth/verifyEmail/server";
import cartRoutes from "@/src/modules/cart/server";

const app = new Hono().basePath("/api");

const _routes = app
  .route("/categories", categoryRoute)
  .route("/products", productsRoute)
  .route("/verify", verifyRoutes)
  .route("/blogs", blogRoute)
  .route("/cart", cartRoutes);

export const GET = handle(app);
export const POST = handle(app);
export const PUT = handle(app);
export const DELETE = handle(app);

export type AppType = typeof _routes;
