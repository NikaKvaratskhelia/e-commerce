import { Hono } from "hono";
import { DeleteRoutes, GetRoutes, PutRoutes } from "./routes";

const app = new Hono()
  .route("/", PutRoutes)
  .route("/", DeleteRoutes)
  .route("/", GetRoutes);

export default app;
