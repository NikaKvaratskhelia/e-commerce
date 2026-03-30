"use client";

import { client } from "@/src/library/hono-client";
import { useQuery } from "@tanstack/react-query";

async function getCurrentUser() {
  const res = await client.api.user.getAll.$get();
  const data = await res.json();

  if (!data.success || !res.ok) {
    throw new Error(data.message);
  }

  return data;
}

export function useCurrentUser() {
  return useQuery({
    queryKey: ["users"],
    queryFn: getCurrentUser,
  });
}
