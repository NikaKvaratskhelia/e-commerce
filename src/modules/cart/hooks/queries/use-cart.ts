import { client } from "@/src/library/hono-client";
import { useQuery } from "@tanstack/react-query";

async function GetCart() {
  const res = await client.api.cart.$get();
  const data = await res.json();

  if (!res.ok || !data.success) {
    throw new Error(data.message);
  }

  return data;
}

export function useCart() {
  return useQuery({
    queryKey: ["cart"],
    queryFn: () => GetCart(),
  });
}
