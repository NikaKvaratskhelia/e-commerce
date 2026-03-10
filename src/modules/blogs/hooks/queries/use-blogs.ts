"use client";

import { client } from "@/src/library/hono-client";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

async function getData() {
  const res = await client.api.blogs.$get();
  const data = await res.json();
  if (!res.ok || !data.success) {
    throw new Error(data.message);
  }
  return data;
}

export function useBlogs() {
  return useQuery({
    queryKey: ["blogs"],
    queryFn: async () => {
      try {
        const res = await getData();

        if (!res.success) {
          toast.error(res.message);
          return;
        }

        return res.data;
      } catch (error) {
        if (error instanceof Error) {
          toast.error(error.message);
        }
      }
    },
  });
}
