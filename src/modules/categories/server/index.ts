import { Hono } from "hono";
import { DeleteRoutes, GetRoutes, PostRoutes, PutRoutes } from "./routes";

const app = new Hono();
app.route("/", GetRoutes);
app.route("/", PostRoutes);
app.route("/", PutRoutes);
app.route("/", DeleteRoutes);

export default app;
