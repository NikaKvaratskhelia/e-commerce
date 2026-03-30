import { client } from "@/src/library/hono-client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

async function addItem(productColorId: number) {
  const res = await client.api.wishlist.wishlistItem[":id"].$post({
    param: { id: String(productColorId) },
  });

  const data = await res.json();

  if (!res.ok || !data.success) {
    throw new Error(data.message);
  }

  return data;
}

export function useAddWishlistItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addItem,
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["wishlist"] });
    },
    onSuccess: (data) => toast.success(data.message),
    onError: (err) => toast.error(err.message),
  });
}
