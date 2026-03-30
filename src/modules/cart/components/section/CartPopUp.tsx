"use client";

import { CartItemQty } from "@/src/layout/CartItemQty";
import { useState } from "react";
import Image from "next/image";
import { useCart } from "../../hooks/queries/use-cart";
import Link from "next/link";
import { Button } from "@/src/components/ui/Button";
import { CartItemSkeleton } from "../skeletons/CartItemSkeleton";
import { CartItem } from "../common/CartItem";

export function CartPopUp() {
  const [showCart, setShowCart] = useState(false);
  const query = useCart();

  return (
    <>
      <div
        className="flex gap-1 items-center cursor-pointer"
        onClick={() => setShowCart(!showCart)}
      >
        <Image
          src={"/shoppingBagIcon.svg"}
          alt="Cart icon"
          width={24}
          height={24}
        />
        <CartItemQty />
      </div>

      <div
        className={`fixed -z-10 h-full w-full inset-0 opacity-0 bg-[rgba(0,0,0,0.32)] transition-all duration-500 ${showCart ? "opacity-100 z-99" : "opacity-0"}`}
        onClick={() => setShowCart(false)}
      ></div>

      <div
        className={`max-w-103.25 w-full p-6 transition-all duration-500 z-100  ${showCart ? "right-0" : "-right-104"} bg-white bottom-0 top-0 fixed flex flex-col gap-4`}
      >
        <div className="w-full flex items-center justify-between">
          <h3 className="font-medium text-[28px] leading-8.5">Cart</h3>
          <Image
            src={"/X.svg"}
            alt="x button"
            width={16}
            height={16}
            onClick={() => setShowCart(false)}
            className="cursor-pointer"
          />
        </div>
        <div className="flex flex-col gap-6 max-h-150 overflow-y-auto">
          {query.isLoading &&
            Array.from({ length: 3 }, (_, i) => <CartItemSkeleton key={i} />)}
          {query.data?.data?.cartItems.map((i) => (
            <CartItem key={i.id} cartItem={i} />
          ))}
        </div>
        <div className="flex flex-col gap-4 mt-auto">
          <div className="flex w-full items-center justify-between text-[20px] leading-7 font-medium border-t border-(--neutral-dark-white) pt-3.25">
            <h3>Total:</h3>
            <span>${query.isLoading ? 0 : (query.data?.data?.total ?? 0)}</span>
          </div>
          <div className="flex flex-col gap-4 items-center justify-center">
            <Link
              href={"/cart/checkout"}
              onClick={() => setShowCart(false)}
              className="w-full"
            >
              <Button
                text={"Checkout"}
                mode={"solid"}
                rounded={"square"}
                disabled={false}
              />
            </Link>
            <Link
              href={"/cart"}
              onClick={() => setShowCart(false)}
              className="border-b border-(--primary) font-semibold"
            >
              View Cart
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
