"use client";

import { CartItem } from "@/src/modules/cart/components/common/CartItem";
import { useCart } from "@/src/modules/cart/hooks/queries/use-cart";

export default function OrderItemsSection() {
  const { data } = useCart();
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-6 sm:gap-12">
        {data?.data?.cartItems.map((i) => (
          <CartItem key={i.id} cartItem={i} />
        ))}
      </div>

      <div>
        <p className="flex items-center justify-between w-full text-xl leading-7 font-medium">
          <span>Total:</span> <span>${data?.data?.total.toFixed(2) ?? 0}</span>
        </p>
      </div>
    </div>
  );
}
