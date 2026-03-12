import { client } from "@/src/library/hono-client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

async function UpdateProductInCart(id: number, qty: number) {
  const res = await client.api.cart.cartItems.$put({
    json: { productId: id, quantity: qty },
  });

  const data = await res.json();

  if (!res.ok || !data.success) {
    throw new Error(data.message);
  }

  return data;
}

export function useUpdateCartMutation(id: number, qty: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => UpdateProductInCart(id, qty),
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
