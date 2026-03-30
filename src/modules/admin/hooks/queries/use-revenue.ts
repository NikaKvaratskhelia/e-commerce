"use client";

import { client } from "@/src/library/hono-client";
import { useQuery } from "@tanstack/react-query";

async function getRevenue() {
  const res = await client.api["admin-stats"].revenue.$get();

  if (!res.ok) {
    throw new Error("Server Error");
  }
  const data = await res.json();

  return data;
}

export function useRevenue() {
  return useQuery({
    queryKey: ["revenue"],
    queryFn: getRevenue,
    staleTime: 1000 * 60 * 30,
  });
}
