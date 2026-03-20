"use client";

import { client } from "@/src/library/hono-client";
import { useQuery } from "@tanstack/react-query";

type Queries = {
  page: string;
  limit: string;
  sortBy: string;
  sort: string;
  newOnly: string;
  categoryId: string;
};

async function getData(queryParams: Queries) {
  const validQueries: Partial<Queries> = Object.fromEntries(
    Object.entries(queryParams).filter(([, value]) => value?.trim() !== ""),
  ) as Partial<Queries>;

  const res = await client.api.products.$get({
    query: validQueries,
  });

  const data = await res.json();

  if (!res.ok || !data.success) {
    throw new Error(data.message);
  }

  return data;
}

export function useProducts(queryParams: Queries) {
  return useQuery({
    queryKey: ["products", queryParams],
    queryFn: () => getData(queryParams),
  });
}
