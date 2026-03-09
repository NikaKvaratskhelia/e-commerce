"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import UserProfileLink from "../components/common/UserProfileLink";

type Props = {
  isAuthenticated: boolean;
};

export default function BurgerMenu({ isAuthenticated }: Props) {
  const [burgerOpen, setBurgerOpen] = useState(false);
  return (
    <>
      <div
        className="w-6 h-6 flex items-center justify-center sm:hidden"
        onClick={() => setBurgerOpen(true)}
      >
        <Image
          src="/burgerMenu.svg"
          alt="Menu"
          width={20}
          height={16}
          className="cursor-pointer"
        />
      </div>
      <div
        className={`fixed -z-10 h-full w-full inset-0 opacity-0 bg-[rgba(0,0,0,0.32)] transition-all duration-500 ${burgerOpen ? "opacity-100 z-99" : "opacity-0"}`}
      ></div>

      <div
        className={`p-6 flex flex-col justify-between bg-white h-screen max-w-85.75 w-full fixed z-100 top-0 bottom-0 transition-all duration-500 ${burgerOpen ? "left-0" : "-left-87.5"}`}
      >
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <Link href={"/shop"}>
              <Image
                src={"/logo.svg"}
                alt="Logo"
                width={70}
                height={24}
                loading="eager"
              />
            </Link>
            <Image
              src={"/X.svg"}
              alt="X button"
              width={14}
              height={14}
              className="cursor-pointer"
              onClick={() => setBurgerOpen(false)}
            />
          </div>

          <Link
            href={"/shop"}
            className="border-b border-(--neutral-dark-white) pb-2"
            onClick={() => setBurgerOpen(false)}
          >
            Home
          </Link>
          <Link
            href={"/shop/products"}
            className="border-b border-(--neutral-dark-white) pb-2"
            onClick={() => setBurgerOpen(false)}
          >
            Shop
          </Link>
          <Link
            href={"/shop/contact"}
            className="border-b border-(--neutral-dark-white) pb-2"
            onClick={() => setBurgerOpen(false)}
          >
            Contact Us
          </Link>
        </div>
        <div className="flex flex-col gap-4">
          <Link
            href={"/shop/cart"}
            className="flex items-center justify-between text-[18px] leading-8 pb-2 border-b  border-(--neutral-dark-white)"
          >
            Cart{" "}
            <div className="flex gap-1 items-center">
              <Image
                src={"/shoppingBagIcon.svg"}
                alt="Cart icon"
                width={24}
                height={24}
              />
              <div className="h-5 w-5 p-1 box-border rounded-full bg-black">
                {/* aq unda daematos cart itemebis raodenoba */}
                <p className="text-white text-[12px] text-center leading-2.5 font-bold">
                  0
                </p>
              </div>
            </div>
          </Link>
          <UserProfileLink isAuthenticated={isAuthenticated} />
        </div>
      </div>
    </>
  );
}
