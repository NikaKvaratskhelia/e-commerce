"use client";

import { Button } from "@/src/components/ui/Button";
import { useAddWishlistItem } from "@/src/modules/wishlist/hooks/mutations/use-add-wishlist";

export default function AddToWishlistBtn({ id }: { id: number }) {
  const { mutate } = useAddWishlistItem();
  return (
    <div
      className="flex-1 w-full"
      onClick={() => mutate(Number(id))}
    >
      <Button
        text={"Add to Wishlist"}
        mode={"outline"}
        rounded={"square"}
        disabled={false}
      />
    </div>
  );
}
