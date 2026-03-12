import { client } from "@/src/library/hono-client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

async function DeleteFromCart(id: number) {
  const res = await client.api.cart.cartItems.$delete({
    json: { productId: id },
  });

  const data = await res.json();

  if (!res.ok || !data.success) {
    throw new Error(data.message);
  }

  return data;
}

export function useDeleteCartMutation(id: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => DeleteFromCart(id),
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
