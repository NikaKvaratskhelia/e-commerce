"use client";

import { Button } from "@/src/components/ui/Button";
import { useAddToCartMutation } from "../../hooks/mutations/use-add-to-cart";

type Props = {
  id: number;
  variant?: "shown" | "hidden";
};

export function AddToCartBtn({ id, variant = "hidden" }: Props) {
  const { mutate, isPending } = useAddToCartMutation(id);

  const visibilityClass =
    variant === "hidden"
      ? "opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto"
      : "opacity-100";

  return (
    <div
      onClick={() => mutate()}
      className={`relative z-10 w-full transition-all duration-500 ${visibilityClass}`}
    >
      <Button
        text="Add To Cart"
        mode="solid"
        rounded="square"
        disabled={isPending}
      />
    </div>
  );
}
