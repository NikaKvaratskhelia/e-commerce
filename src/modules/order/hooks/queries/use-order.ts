import { client } from "@/src/library/hono-client";
import { useQuery } from "@tanstack/react-query";

async function getData(id: string) {
  const res = await client.api.orders[":id"].$get({ param: { id } });
  const data = await res.json();

  if (!res.ok || !data.success) throw new Error(data.message);

  return data;
}

export function useOrders(id: string) {
  return useQuery({
    queryKey: ["orders", id],
    queryFn: () => getData(id),
    enabled: !!id,
  });
}
