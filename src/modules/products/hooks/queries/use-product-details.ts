import { client } from "@/src/library/hono-client";
import { useQuery } from "@tanstack/react-query";

async function getProductDetails(id: string) {
  if (isNaN(Number(id))) {
    throw new Error("არასწორი ID.");
  }

  const res = await client.api.products[":id"].$get({
    param: { id },
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "პროდუქტის წამოღება ვერ მოხერხდა.");
  }

  return data;
}

export function useProductDetails(id: string) {
  return useQuery({
    queryKey: ["product", id],
    queryFn: () => getProductDetails(id),
    enabled: !!id,
  });
}
