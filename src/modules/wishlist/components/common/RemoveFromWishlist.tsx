"use client";

import { useDeleteWishlistItem } from "../../hooks/mutations/use-delete-wishlist";
import Image from "next/image";

export function RemoveFromWishlist({ id }: { id: number }) {
  const mutation = useDeleteWishlistItem();

  return (
    <button onClick={() => mutation.mutate(id)} className="absolute -left-8.5 cursor-pointer">
      <Image src={"/X.svg"} alt="delete btn" width={16} height={16} />
    </button>
  );
}
