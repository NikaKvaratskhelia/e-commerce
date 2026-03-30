"use client";

import { client } from "@/src/library/hono-client";
import { useQuery } from "@tanstack/react-query";

async function getOrders() {
  const res = await client.api["admin-stats"].latestOrders.$get();

  if (!res.ok) {
    throw new Error("Server Error");
  }
  const data = await res.json();

  return data;
}

export function useOrders() {
  return useQuery({
    queryKey: ["latestOrders"],
    queryFn: getOrders,
    staleTime: 1000 * 60 * 30,
  });
}
