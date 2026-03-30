import { GetRoutes } from "./routes";
import { Hono } from "hono";

const app = new Hono().route("/", GetRoutes);

export default app;
