import { client } from "@/src/library/hono-client";
import { ApiResponse } from "@/src/types/ApiReturnType";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { GetCartModel } from "../../server/selectors";

async function deleteFromCart(id: number) {
  const res = await client.api.cart.cartItems.$delete({
    json: { productColorId: id },
  });

  const data = await res.json();

  if (!res.ok || !data.success) {
    throw new Error(data.message);
  }

  return data;
}

export function useDeleteCartMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id }: { id: number }) => deleteFromCart(id),

    onMutate: async ({ id }) => {
      await queryClient.cancelQueries({ queryKey: ["cart"] });

      const previousCart = queryClient.getQueryData<ApiResponse<GetCartModel>>([
        "cart",
      ]);

      queryClient.setQueryData<ApiResponse<GetCartModel>>(["cart"], (old) => {
        if (!old?.data) return old;

        const updatedCartItems = old.data.cartItems.filter(
          (item) => item.productColorId !== id,
        );

        const updatedTotal = updatedCartItems.reduce((sum, item) => {
          return sum + item.productColor.product.price * item.quantity;
        }, 0);

        return {
          ...old,
          data: {
            ...old.data,
            cartItems: updatedCartItems,
            total: updatedTotal,
          },
        };
      });

      return { previousCart };
    },

    onSuccess: (data) => {
      toast.success(data.message);
    },

    onError: (error) => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });

      const message =
        error instanceof Error
          ? error.message
          : "სერვერის ხარვეზი. თავიდან სცადეთ.";

      toast.error(message);
    },
  });
}
