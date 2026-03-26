import { ApiResponse } from "@/src/types/ApiReturnType";
import { Hono } from "hono";

export const GetRoutes = new Hono()
  .get("/", async (c) => {
    let response: ApiResponse<number>;
  })
  .get("/:id", async (c) => {});
