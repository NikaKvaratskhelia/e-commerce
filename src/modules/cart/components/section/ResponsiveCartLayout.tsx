"use client";

import { useCart } from "../../hooks/queries/use-cart";
import { CartItem } from "../common/CartItem";

export function ResponsiveCartLayout() {
  const { data } = useCart();

  if (data?.data?.cartItems.length === 0)
    return (
      <h1 className="text-center mt-10 text-[30px] font-semibold sm:hidden">
        Empty Cart
      </h1>
    );

  return (
    <div className="flex flex-col gap-8 items-start sm:hidden w-full">
      <h3 className="font-semibold pb-6 border-b border-(--primary) w-full">
        Products
      </h3>
      <div className="flex flex-col gap-6 w-full">
        {data?.data?.cartItems.map((i) => (
          <CartItem key={i.id} cartItem={i} />
        ))}
      </div>
    </div>
  );
}
