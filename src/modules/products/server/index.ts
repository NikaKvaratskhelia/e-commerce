import { Hono } from "hono";
import { DeleteRoutes, GetRoutes, PostRoutes, PutRoutes } from "./routes";

const app = new Hono()
  .route("/", GetRoutes)
  .route("/", PostRoutes)
  .route("/", DeleteRoutes)
  .route("/", PutRoutes);
export default app;
