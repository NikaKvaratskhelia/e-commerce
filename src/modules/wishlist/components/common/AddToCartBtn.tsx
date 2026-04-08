"use client";

import { useAddToCartMutation } from "@/src/modules/cart/hooks/mutations/use-add-to-cart";

export function AddToCartBtn({ id }: { id: number }) {
  const { mutate, isPending } = useAddToCartMutation(id);
  return (
    <button
      onClick={() => mutate()}
      disabled={isPending}
      className="bg-(--primary) text-white rounded-lg text-[16px] font-medium px-10 py-2.5 text-center w-full leading-7 select-none cursor-pointer flex items-center justify-center"
    >
      Add To Cart
    </button>
  );
}
