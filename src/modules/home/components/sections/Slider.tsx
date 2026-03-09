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
    <div className="max-w-280 w-full mx-auto px-8 pb-10 box-content">
      <div className="relative w-full h-fit">
        <Swiper
          modules={[Pagination]}
          pagination={{ clickable: true }}
          spaceBetween={20}
          slidesPerView={1}
          className="w-full h-76 sm:h-134"
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
              className="w-full object-cover h-76 sm:h-full"
            />
          </SwiperSlide>

          <SwiperSlide className="flex items-center justify-center">
            <Image
              src="/slide2.png"
              alt="Random room photo"
              width={1120}
              height={536}
              className="w-full object-cover h-76 sm:h-full"
            />
          </SwiperSlide>

          <SwiperSlide className="flex items-center justify-center">
            <Image
              src="/slide3.png"
              alt="Random room photo"
              width={1120}
              height={536}
              className="w-full object-cover h-76 sm:h-full"
            />
          </SwiperSlide>
        </Swiper>

        <button
          type="button"
          aria-label="Previous slide"
          onClick={() => swiperRef.current?.slidePrev()}
          className="absolute top-1/2 left-16.5 z-10 h-13 w-13 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-md transition-all duration-300 hover:bg-neutral-200 cursor-pointer hidden sm:flex"
        >
          <Image src="/arrow-left.svg" alt="" width={32} height={32} />
        </button>

        <button
          type="button"
          aria-label="Next slide"
          onClick={() => swiperRef.current?.slideNext()}
          className="absolute top-1/2 right-16.5 z-10 h-13 w-13 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-md transition-all duration-300 hover:bg-neutral-200 cursor-pointer  hidden sm:flex"
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
      <div className="flex flex-col items-center justify-center 8h:flex-row 8h:justify-between mt-8 gap-4">
        <h1 className="font-medium text-left sm:text-center 8h:text-left text-[40px] sm:text-[72px] text-(--primary) leading-11 sm:leading-19 tracking-[-0.4px] sm:tracking-[2px] max-w-160.75 w-fit">
          Simply Unique
          <span className="text-(--neutral-light-grey)">/</span> Simply Better
          <span className="text-(--neutral-light-grey)">.</span>
        </h1>
        <p className="leading-5.5 text-left sm:text-center 8h:text-left sm:leading-6.5 text-(--neutral-light-grey) max-w-106 w-fit text-sm sm:text-[16px]">
          <span className="text-(--neutral-semi-grey) font-semibold">
            3legant
          </span>
          is a gift & decorations store based in HCMC, Vietnam. Est since 2019.-
        </p>
      </div>
    </div>
  );
}
