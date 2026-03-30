"use client";

import { client } from "@/src/library/hono-client";
import { useQuery } from "@tanstack/react-query";

async function getData() {
  const res = await client.api["admin-stats"]["orders-all"].$get();

  if (!res.ok) {
    throw new Error("Server Error");
  }
  const data = await res.json();

  return data;
}

export function useAdminOrders() {
  return useQuery({
    queryKey: ["adminProducts"],
    queryFn: getData,
    staleTime: 1000 * 60 * 30,
  });
}
