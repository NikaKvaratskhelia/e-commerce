"use client";

import { client } from "@/src/library/hono-client";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

async function getBlogs(limit = 10) {
  const res = await client.api.blogs.$get({
    query: { limit: String(limit) },
  });
  const data = await res.json();

  if (!res.ok || !data.success) {
    throw new Error(data.message);
  }

  return data.data;
}

export function useBlogs(limit = 9) {
  return useQuery({
    queryKey: ["blogs", { limit }],
    queryFn: () => getBlogs(limit),
    throwOnError: (error) => {
      toast.error(error.message);
      return false;
    },
  });
}
