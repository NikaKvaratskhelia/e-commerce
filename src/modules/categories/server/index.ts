import { Hono } from "hono";
import { DeleteRoutes, GetRoutes, PostRoutes, PutRoutes } from "./routes";

const app = new Hono()
  .route("/", GetRoutes)
  .route("/", PostRoutes)
  .route("/", PutRoutes)
  .route("/", DeleteRoutes);

export default app;
