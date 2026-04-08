import { Hono } from "hono";
import { DeleteRoutes, GetRoutes, PostRoutes, PutRoutes } from "./routes";

const app = new Hono()
  .route("/", GetRoutes)
  .route("/", DeleteRoutes)
  .route("/", PutRoutes)
  .route("/", PostRoutes);

export default app;
