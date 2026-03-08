import { prisma } from "@/src/library/db";
import { Hono } from "hono";
export const GetRoutes = new Hono().get("/", async (c) => {
  const users = await prisma.user.findMany();
  return c.json(users);
});
