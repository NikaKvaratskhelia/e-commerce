"use client";

import { redirect, useParams } from "next/navigation";
import { useProductDetails } from "../../../hooks/queries/use-product-details";
import { Button } from "@/src/components/ui/Button";
import { toast } from "sonner";
import { useAddToCartMutation } from "@/src/modules/cart/hooks/mutations/use-add-to-cart";
import { useColorStore } from "../../store/useColorStore";

export function AddButtons() {
  const id = useParams().id as string;
  if (!id) redirect("/");

  const query = useProductDetails(id);
  const { selectedColorIndex } = useColorStore();
  const colorId = query.data?.data?.colors[selectedColorIndex].id;

  const { mutate } = useAddToCartMutation(Number(colorId));

  return (
    <div className="flex gap-4 items-center flex-col w-full mt-14">
      <div
        className="flex-1 w-full"
        // TODO: wishlist
        onClick={() => toast.error("ar gaq amis funkcia")}
      >
        <Button
          text={"Add to Wishlist"}
          mode={"outline"}
          rounded={"square"}
          disabled={false}
        />
      </div>
      
      <div className="flex-1 w-full" onClick={() => mutate()}>
        <Button
          text={"Add to Cart"}
          mode={"solid"}
          rounded={"square"}
          disabled={false}
        />
      </div>
    </div>
  );
}
