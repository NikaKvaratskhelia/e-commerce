"use client";

import { useAddWishlistItem } from "@/src/modules/wishlist/hooks/mutations/use-add-wishlist";
import { Heart } from "lucide-react";

export function AddToWishlist({ id }: { id: number }) {
  const { mutate } = useAddWishlistItem();
  return (
    <div
      className="bg-white rounded-full p-2 z-10 cursor-pointer"
      onClick={() => mutate(id)}
    >
      <Heart
        width={18}
        height={18}
        className="text-red-600 hover:fill-current"
      />
    </div>
  );
}
