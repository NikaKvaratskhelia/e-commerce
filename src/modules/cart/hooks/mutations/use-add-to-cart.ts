import { client } from "@/src/library/hono-client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

async function AddToCart(id: number) {
  const res = await client.api.cart.cartItems.$post({
    json: { productColorId: id },
  });

  const data = await res.json();

  if (!res.ok || !data.success) {
    throw new Error(data.message);
  }

  return data;
}

export function useAddToCartMutation(id: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => AddToCart(id),
    onSuccess: (data) => toast.success(data.message),
    onError: (error) => {
      const message =
        error instanceof Error
          ? error.message
          : "სერვერის ხარვეზი. თავიდან სცადეთ.";
      toast.error(message);
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: ["cart"] }),
  });
}
