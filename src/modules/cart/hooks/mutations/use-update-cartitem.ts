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
          item.productColorId === id ? { ...item, quantity: qty } : item,
        );

        const now = new Date();

        const newTotal = updatedItems.reduce((sum, item) => {
          const activeDiscount = item.productColor.product.discounts?.find(
            (d) => new Date(d.discountEndDate).getTime() > now.getTime(),
          );

          const itemPrice = activeDiscount
            ? item.productColor.product.price *
              (1 - activeDiscount.discountPercentage / 100)
            : item.productColor.product.price;

          return sum + item.quantity * itemPrice;
        }, 0);

        return {
          ...old,
          data: {
            ...old.data,
            cartItems: updatedItems,
            total: Number(newTotal.toFixed(2)),
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
