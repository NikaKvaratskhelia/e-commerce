"use client";
import { client } from "@/src/library/hono-client";
import { useQuery } from "@tanstack/react-query";

async function getData(id: string) {
  const res = await client.api.comments[":productId"].$get({
    param: { productId: id },
  });

  const data = await res.json();
  if (!res.ok || !data.success) {
    throw new Error(data.message);
  }

  return data;
}

export function useCategories(id: string) {
  return useQuery({
    queryKey: ["comments"],
    queryFn: async () => {
      try {
        const res = await getData(id);

        return res.data;
      } catch {}
    },
  });
}
