"use client";

import { client } from "@/src/library/hono-client";
import { useQuery } from "@tanstack/react-query";

async function getData() {
  const res = await client.api["admin-stats"]["orders-all"].$get();
  const data = await res.json();

  if (!res.ok || !data.success) {
    throw new Error(data.message);
  }

  return data;
}

export function useAdminOrders() {
  return useQuery({
    queryKey: ["adminOrders"],
    queryFn: getData,
    staleTime: 1000 * 60 * 30,
  });
}
