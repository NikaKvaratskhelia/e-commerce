"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Scrollbar, FreeMode } from "swiper/modules";

import "swiper/css";
import "swiper/css/scrollbar";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function ProductSlider() {
  return (
    <div className="flex flex-col max-w-280 mx-auto px-8 lg:px-0 overflow-visible items-start">
      <div className="py-12 flex justify-between w-full">
        <h2 className="leading-9.5 sm:leading-11 font-medium text-[34px] sm:text-[40px] max-w-37.5">
          New Arrivals
        </h2>
        <Link
          href={"/shop"}
          className="hidden sm:flex items-center gap-1 border-b border-(--primary) leading-7 text-(--primary) self-end"
        >
          More Products
          <ArrowRight className="size-5" />
        </Link>
      </div>
      <Swiper
        modules={[Scrollbar, FreeMode]}
        slidesPerView={3.2}
        spaceBetween={24}
        freeMode={true}
        scrollbar={{ draggable: true }}
        className="max-w-7xl! w-[105%] pb-14!"
      >
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <SwiperSlide key={item}>
            <div className="h-40 bg-gray-200 flex items-center justify-center">
              {item}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <Link
        href={"/shop"}
        className="flex sm:hidden items-center gap-1 border-b border-(--primary) leading-7 text-(--primary) self-start mt-10"
      >
        More Products
        <ArrowRight className="size-5" />
      </Link>
    </div>
  );
}
