import { Hono } from "hono";
import { handle } from "hono/vercel";
import { HTTPException } from "hono/http-exception";
import categoryRoute from "@/src/modules/categories/server";
import productsRoute from "@/src/modules/products/server";
import blogRoute from "@/src/modules/blogs/server";
import verifyRoutes from "@/src/modules/auth/verifyEmail/server";
import cartRoutes from "@/src/modules/cart/server";
import commentRoutes from "@/src/modules/comments/server";
import contactRoutes from "@/src/modules/contact/server";
import userRoutes from "@/src/modules/user/server";

const app = new Hono().basePath("/api");

app.onError((err, c) => {
  if (err instanceof HTTPException) {
    return c.json(
      {
        success: false,
        status: err.status,
        message: err.message,
      },
      err.status,
    );
  }

  console.error(err);

  return c.json(
    {
      success: false,
      status: 500,
      message: "სერვერის ხარვეზი.",
    },
    500,
  );
});

const _routes = app
  .route("/categories", categoryRoute)
  .route("/products", productsRoute)
  .route("/verify", verifyRoutes)
  .route("/blogs", blogRoute)
  .route("/cart", cartRoutes)
  .route("/comments", commentRoutes)
  .route("/contact", contactRoutes)
  .route("/user", userRoutes);

export const GET = handle(app);
export const POST = handle(app);
export const PUT = handle(app);
export const DELETE = handle(app);

export type AppType = typeof _routes;
