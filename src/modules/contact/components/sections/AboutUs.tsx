import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export function AboutUs() {
  return (
    <div className="flex flex-col lg:flex-row w-full max-w-280 mx-auto px-8 w1120:px-0 my-12">
      <Image
        src={"/placeholder.png"}
        alt="Random Photo"
        width={720}
        height={532}
        className="lg:w-[50%] w-full"
      />
      <div className="px-8 sm:px-0 sm:pl-18 py-14.5 flex justify-center items-start flex-col gap-6 flex-1 bg-(--neutral-semi-white)">
        <div className="flex flex-col gap-4 max-w-113">
          <h2 className="text-[34px] sm:text-[40px] leading-9.5 sm:leading-11 font-medium">
            About Us
          </h2>
          <p className="leading-6.5 sm:leading-8 sm:text-[20px] text-(--primary)">
            3legant is a gift & decorations store based in HCMC, Vietnam. Est
            since 2019. Our customer service is always prepared to support you
            24/7
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
