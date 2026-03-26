"use client";

import { Button } from "@/src/components/ui/Button";
import { useAddToCartMutation } from "../../hooks/mutations/use-add-to-cart";

export function AddToCartBtn({ id }: { id: number }) {
  const { mutate } = useAddToCartMutation(id);
  return (
    <div
      className="relative z-10 w-full opacity-100 transition-all duration-500 lg:opacity-0 group-hover:opacity-100"
      onClick={() => mutate()}
    >
      <Button
        text="Add To Cart"
        mode="solid"
        rounded="square"
        disabled={false}
      />
    </div>
  );
}
