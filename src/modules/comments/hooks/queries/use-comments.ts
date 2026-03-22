"use client";

import { client } from "@/src/library/hono-client";
import { useQuery } from "@tanstack/react-query";

async function getComments(productId: string) {
  const res = await client.api.comments[":productId"].$get({
    param: { productId },
  });

  const data = await res.json();

  if (!res.ok || !data.success) {
    throw new Error(data.message);
  }

  return data.data;
}

export function useComments(productId: string) {
  return useQuery({
    queryKey: ["comments", productId],
    queryFn: () => getComments(productId),
    staleTime: 30_000,
    enabled: !!productId,
  });
}
