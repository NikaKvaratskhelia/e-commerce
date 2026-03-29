import { client } from "@/src/library/hono-client";
import { useQuery } from "@tanstack/react-query";

async function getData() {
  const res = await client.api.wishlist.$get();

  const data = await res.json();

  if (!res.ok || !data.success) {
    throw new Error(data.message);
  }

  return data;
}

export function useWishlist() {
  return useQuery({
    queryKey: ["wishlist"],
    queryFn: getData,
  });
}
