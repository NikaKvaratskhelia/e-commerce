"use client";

import { useRef } from "react";
import type { Swiper as SwiperType } from "swiper";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

import Image from "next/image";

export function Slider() {
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <div className="relative max-w-280 w-full mx-auto h-fit">
      <Swiper
        modules={[Pagination]}
        pagination={{ clickable: true }}
        spaceBetween={20}
        slidesPerView={1}
        className="w-full h-134"
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
      >
        <SwiperSlide className="flex items-center justify-center">
          <Image
            src="/slide1.png"
            alt="Random room photo"
            width={1120}
            height={536}
            className="w-full h-full object-cover"
          />
        </SwiperSlide>

        <SwiperSlide className="flex items-center justify-center">
          <Image
            src="/slide2.png"
            alt="Random room photo"
            width={1120}
            height={536}
            className="w-full h-full object-cover"
          />
        </SwiperSlide>

        <SwiperSlide className="flex items-center justify-center">
          <Image
            src="/slide3.png"
            alt="Random room photo"
            width={1120}
            height={536}
            className="w-full h-full object-cover"
          />
        </SwiperSlide>
      </Swiper>

      <button
        type="button"
        aria-label="Previous slide"
        onClick={() => swiperRef.current?.slidePrev()}
        className="absolute top-1/2 left-5 z-10 flex h-13 w-13 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-md transition-all duration-300 hover:bg-neutral-200 cursor-pointer"
      >
        <Image src="/arrow-left.svg" alt="" width={32} height={32} />
      </button>

      <button
        type="button"
        aria-label="Next slide"
        onClick={() => swiperRef.current?.slideNext()}
        className="absolute top-1/2 right-5 z-10 flex h-13 w-13 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-md transition-all duration-300 hover:bg-neutral-200 cursor-pointer"
      >
        <Image
          src="/arrow-left.svg"
          alt=""
          width={32}
          height={32}
          className="rotate-180"
        />
      </button>
    </div>
  );
}
