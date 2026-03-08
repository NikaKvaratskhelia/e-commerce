import { Hono } from "hono";
import { handle } from "hono/vercel";
import categoryRoute from "@/src/modules/categories/server";

const app = new Hono().basePath("/api");

app.route("/categories", categoryRoute);

app.get("/hello", (c) => {
  return c.json({
    message: "Hello Next.js!",
  });
});

export const GET = handle(app);
export const POST = handle(app);
export const PUT = handle(app);
export const DELETE = handle(app);

export type AppType = typeof app;
