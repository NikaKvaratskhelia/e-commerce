import { client } from "@/src/library/hono-client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { WishlistModel } from "../../server/selectors/wishlist.get";

async function deleteItem(productColorId: number) {
  const res = await client.api.wishlist.wishlistItem[":id"].$delete({
    param: { id: String(productColorId) },
  });

  const data = await res.json();

  if (!res.ok || !data.success) {
    throw new Error(data.message);
  }

  return data;
}

export function useDeleteWishlistItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteItem,
    onMutate: async (productColorId) => {
      await queryClient.cancelQueries({ queryKey: ["wishlist"] });

      const previousWishlist = queryClient.getQueryData(["wishlist"]);

      queryClient.setQueryData(["wishlist"], (old: WishlistModel) => {
        if (!old) return old;

        return {
          ...old,
          wishlistItems: (old.wishlistItems ?? []).filter(
            (item) => item.productColorId !== productColorId,
          ),
        };
      });
      return { previousWishlist };
    },
    onError: (_err, _productColorId, context) => {
      if (context?.previousWishlist) {
        queryClient.setQueryData(["wishlist"], context.previousWishlist);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["wishlist"] });
    },
  });
}
