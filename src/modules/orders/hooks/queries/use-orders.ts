import { client } from "@/src/library/hono-client";
import { useQuery } from "@tanstack/react-query";

async function getData() {
  const res = await client.api.orders.$get();

  const data = await res.json();

  if (!res.ok || !data.success) {
    throw new Error(data.message);
  }

  return data.data;
}

export function useOrders() {
  return useQuery({
    queryKey: ["orders"],
    queryFn: getData,
    staleTime: 0,
  });
}
