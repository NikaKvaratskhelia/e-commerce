import { Hono } from "hono";
import { GetRoutes } from "./routes";

const app = new Hono().route("/", GetRoutes);
export default app;
