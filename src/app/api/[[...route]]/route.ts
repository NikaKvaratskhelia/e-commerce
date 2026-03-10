import { Hono } from "hono";
import { handle } from "hono/vercel";
import categoryRoute from "@/src/modules/categories/server";
import blogRoute from "@/src/modules/blogs/server";

const app = new Hono().basePath("/api");

// aq albat merge conflict ikneba imitom rom products route ar aris am branchze da magis adgilas weria blogs route

const _routes = app
  .route("/categories", categoryRoute)
  .route("/blogs", blogRoute);

export const GET = handle(app);
export const POST = handle(app);
export const PUT = handle(app);
export const DELETE = handle(app);

export type AppType = typeof _routes;
