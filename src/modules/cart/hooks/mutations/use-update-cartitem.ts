import { client } from "@/src/library/hono-client";
import { ApiResponse } from "@/src/types/ApiReturnType";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { GetCartModel } from "../../server/selectors";

async function updateProductInCart(id: number, qty: number) {
  const res = await client.api.cart.cartItems.$put({
    json: { productColorId: id, quantity: qty },
  });

  const data = await res.json();

  if (!res.ok || !data.success) {
    throw new Error(data.message);
  }

  return data;
}

export function useUpdateCartMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, qty }: { id: number; qty: number }) =>
      updateProductInCart(id, qty),

    onMutate: async ({ id, qty }) => {
      await queryClient.cancelQueries({ queryKey: ["cart"] });

      const previousCart = queryClient.getQueryData<ApiResponse<GetCartModel>>([
        "cart",
      ]);

      queryClient.setQueryData<ApiResponse<GetCartModel>>(["cart"], (old) => {
        if (!old?.data) return old;

        const updatedItems = old.data.cartItems.map((item) =>
          item.productId === id
            ? {
                ...item,
                quantity: qty,
              }
            : item,
        );

        const newTotal = updatedItems.reduce(
          (sum, item) => sum + item.quantity * item.productColor.product.price,
          0,
        );

        return {
          ...old,
          data: {
            ...old.data,
            cartItems: updatedItems,
            total: newTotal,
          },
        };
      });

      return { previousCart };
    },
    onSuccess: (data) => {
      toast.success(data.message);
    },

    onError: (error, _variables, context) => {
      if (context?.previousCart) {
        queryClient.setQueryData(["cart"], context.previousCart);
      }

      const message =
        error instanceof Error
          ? error.message
          : "სერვერის ხარვეზი. თავიდან სცადეთ.";

      toast.error(message);
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });
}
