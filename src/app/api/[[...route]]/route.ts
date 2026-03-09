import { Hono } from "hono";
import { handle } from "hono/vercel";
import categoryRoute from "@/src/modules/categories/server";

const app = new Hono().basePath("/api");

const _routes = app.route("/categories", categoryRoute);

export const GET = handle(app);
export const POST = handle(app);
export const PUT = handle(app);
export const DELETE = handle(app);

export type AppType = typeof _routes;
