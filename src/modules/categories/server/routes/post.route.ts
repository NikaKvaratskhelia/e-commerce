import { prisma } from "@/src/library/db";
import { Hono } from "hono";
export const PostRoutes = new Hono().post("/", async (c) => {
  const users = await prisma.user.findMany();
  return c.json({users, message:"from post"});
});
