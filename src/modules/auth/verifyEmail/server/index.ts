import { Hono } from "hono";
import { PostRoutes } from "./routes";

const app = new Hono().route("/", PostRoutes);

export default app;
