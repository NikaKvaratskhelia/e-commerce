import { Hono } from "hono";
import { GetRoutes, PostRoutes } from "./routes";

const app = new Hono().route("/", GetRoutes).route("/", PostRoutes);

export default app;
