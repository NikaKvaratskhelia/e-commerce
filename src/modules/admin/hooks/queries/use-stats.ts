"use client";

import { client } from "@/src/library/hono-client";
import { useQuery } from "@tanstack/react-query";

async function getStats() {
  const res = await client.api["admin-stats"].stats.$get();

  if (!res.ok) {
    throw new Error("Server Error");
  }
  const data = await res.json();

  return data;
}

export function useStats() {
  return useQuery({
    queryKey: ["stats"],
    queryFn: getStats,
    staleTime: 1000 * 60 * 30,
  });
}
