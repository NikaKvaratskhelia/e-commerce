import { Hono } from "hono";
import { DeleteRoutes, GetRoutes, PostRoutes } from "./routes";

const app = new Hono()
  .route("/", GetRoutes)
  .route("/", PostRoutes)
  .route("/", DeleteRoutes);

export default app;
