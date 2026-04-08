import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function BigSaleSection() {
  return (
    <div className="flex flex-col lg:flex-row w-full">
      <Image
        src={"/placeholder.png"}
        alt="Random Photo"
        width={720}
        height={532}
        className="lg:w-[50%] w-full"
      />
      <div className="px-8 sm:px-0 sm:pl-18 py-14.5 flex justify-center items-start flex-col gap-6 flex-1 bg-(--neutral-semi-white)">
        <div className="flex flex-col gap-4 max-w-113">
          <h3 className="text-(--blue) leading-4 font-bold">
            SALE UP TO 35% OFF
          </h3>
          <h2 className="text-[34px] sm:text-[40px] leading-9.5 sm:leading-11 font-medium">
            HUNDREDS of New lower prices!
          </h2>
          <p className="leading-6.5 sm:leading-8 sm:text-[20px] text-(--primary)">
            It&apos;s more affordable than ever to give every room in your home
            a stylish makeover
          </p>
        </div>
        <Link
          href={"/shop"}
          className="inline-flex items-center gap-1 border-b border-(--primary) leading-7 text-(--primary)"
        >
          Shop Now
          <ArrowRight className="size-5" />
        </Link>
      </div>
    </div>
  );
}
