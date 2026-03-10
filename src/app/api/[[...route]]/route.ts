import { Hono } from "hono";
import { handle } from "hono/vercel";
import categoryRoute from "@/src/modules/categories/server";
import productsRoute from "@/src/modules/products/server";

const app = new Hono().basePath("/api");

app.route("/categories", categoryRoute);
app.route("/products", productsRoute);

export const GET = handle(app);
export const POST = handle(app);
export const PUT = handle(app);
export const DELETE = handle(app);

export type AppType = typeof _routes;
