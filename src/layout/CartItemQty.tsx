"use client";

import { useCart } from "../modules/cart/hooks/queries/use-cart";

export function CartItemQty() {
  const { data } = useCart();
  return (
    <div className="h-5 w-5 p-1 box-border rounded-full bg-black">
      <p className="text-white text-[12px] text-center leading-2.5 font-bold">
        {data?.data?.cartItems.length}
      </p>
    </div>
  );
}
