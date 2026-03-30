import { client } from "@/src/library/hono-client";
import { ApiResponse } from "@/src/types/ApiReturnType";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { GetCartModel } from "../../server/selectors";

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

    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ["cart"] });

      const previousCart = queryClient.getQueryData<ApiResponse<GetCartModel>>([
        "cart",
      ]);

      queryClient.setQueryData<ApiResponse<GetCartModel>>(["cart"], (old) => {
        if (!old?.data) return old;

        const existingItem = old.data.cartItems.find(
          (item) => item.productColorId === id,
        );

        const updatedCartItems = existingItem
          ? old.data.cartItems.map((item) =>
              item.productColorId === id
                ? { ...item, quantity: item.quantity + 1 }
                : item,
            )
          : old.data.cartItems;

        const now = new Date();

        const updatedTotal = updatedCartItems.reduce((sum, item) => {
          const activeDiscount = item.productColor.product.discounts?.find(
            (d) => new Date(d.discountEndDate).getTime() > now.getTime(),
          );

          const itemPrice = activeDiscount
            ? item.productColor.product.price *
              (1 - activeDiscount.discountPercentage / 100)
            : item.productColor.product.price;

          return sum + itemPrice * item.quantity;
        }, 0);

        return {
          ...old,
          data: {
            ...old.data,
            cartItems: updatedCartItems,
            total: Number(updatedTotal.toFixed(2)),
          },
        };
      });

      return { previousCart };
    },

    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["cart"] });
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
