"use client";

import { redirect, useParams } from "next/navigation";
import { useProductDetails } from "../../../hooks/queries/use-product-details";
import { Button } from "@/src/components/ui/Button";
import { useAddToCartMutation } from "@/src/modules/cart/hooks/mutations/use-add-to-cart";
import { useColorStore } from "../../store/useColorStore";
import { useAddWishlistItem } from "@/src/modules/wishlist/hooks/mutations/use-add-wishlist";

export function AddButtons() {
  const id = useParams().id as string;
  if (!id) redirect("/");

  const query = useProductDetails(id);
  const { selectedColorIndex } = useColorStore();
  const colorId = query.data?.data?.colors[selectedColorIndex].id;

  const { mutate, isPending } = useAddToCartMutation(Number(colorId));
  const { mutate: addToWishlist, isPending: isAddingToWishlist } = useAddWishlistItem();

  return (
    <div className="flex gap-4 items-center flex-col w-full mt-14">
      <div
        className="flex-1 w-full"
        onClick={() => addToWishlist(Number(colorId))}
      >
        <Button
          text={isAddingToWishlist ? "Adding to Wishlist..." : "Add to Wishlist"}
          mode={"outline"}
          rounded={"square"}
          disabled={isAddingToWishlist}
        />
      </div>

      <div className="flex-1 w-full" onClick={() => mutate()}>
        <Button
          text={isPending ? "Adding to Cart..." : "Add to Cart"}
          mode={"solid"}
          rounded={"square"}
          disabled={isPending}
        />
      </div>
    </div>
  );
}
