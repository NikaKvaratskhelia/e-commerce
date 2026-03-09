import { Hono } from "hono";
import { GetRoutes, PostRoutes } from "./routes";

const app = new Hono();
app.route("/", GetRoutes);
app.route("/", PostRoutes);

export default app;
