import { Hono } from "hono";
import { DeleteRoutes, PutRoutes } from "./routes";

const app = new Hono().route("/", PutRoutes).route("/", DeleteRoutes);

export default app;
