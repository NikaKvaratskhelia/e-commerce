import { PostRoutes } from "./routes";
import { Hono } from "hono";

const app = new Hono().route("", PostRoutes);

export default app;