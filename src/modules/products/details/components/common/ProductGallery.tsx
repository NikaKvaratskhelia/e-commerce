"use client";

import "swiper/css";

import type { Swiper as SwiperType } from "swiper";
import { useParams } from "next/navigation";
import { useProductDetails } from "../../../hooks/queries/use-product-details";
import { redirect } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { useRef } from "react";
import Image from "next/image";
import { ProductGallerySkeleton } from "../skeletons/ProductGallerySkeleton";

const SEVEN_DAYS_IN_MS = 7 * 24 * 60 * 60 * 1000;

export function ProductGallery() {
  const params = useParams();
  const id = params.id as string;

  if (!id) redirect("/");

  const query = useProductDetails(id);
  const { data } = query;  

  //   es unda shevcvalo archeuli ferit
  const photos = data?.data?.colors[0].photos;

  const swiperRef = useRef<SwiperType | null>(null);

  if (query.isLoading) return <ProductGallerySkeleton />;

  if (!data || !data.data) redirect("/");

  const now = new Date();

  const isNew =
    now.getTime() - new Date(data.data.createdAt).getTime() <= SEVEN_DAYS_IN_MS;

  const discount = data?.data?.discounts.find(
    (d) => new Date(d.discountEndDate).getTime() > now.getTime(),
  );

  return (
    <div className="max-w-136.75 w-full flex flex-col gap-6">
      <div className="relative bg-(--neutral-semi-white)">
        {(isNew || discount) && (
          <div className="flex flex-col gap-2 font-bold leading-3.5 text-center absolute top-8 left-8 z-20">
            {isNew && (
              <div className="px-4.5 py-2 bg-white text-(--primary) rounded-sm">
                New
              </div>
            )}

            {discount && (
              <div className="px-4.5 py-2 bg-(--green) text-(--neutral-white) rounded-sm">
                -{discount.discountPercentage}%
              </div>
            )}
          </div>
        )}
        <Swiper
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          slidesPerView={1}
          modules={[Navigation]}
          allowTouchMove={false}
          className="w-137 h-182.25"
        >
          {photos?.map((i, indx) => (
            <SwiperSlide key={indx}>
              <Image
                src={i.url}
                alt="product photo"
                fill
                className="object-contain aspect-1"
              />
            </SwiperSlide>
          ))}
        </Swiper>

        <button
          onClick={() => swiperRef.current?.slidePrev()}
          className="absolute z-10 flex items-center justify-center w-10 h-10 transition -translate-y-1/2 rounded-full shadow cursor-pointer left-3 top-1/2 bg-white/80 hover:bg-white"
          aria-label="Previous slide"
        >
          <Image src={"/arrow-left.svg"} alt="arrow" width={24} height={24} />
        </button>

        <button
          onClick={() => swiperRef.current?.slideNext()}
          className="absolute z-10 flex items-center justify-center w-10 h-10 transition -translate-y-1/2 rounded-full shadow cursor-pointer right-3 top-1/2 bg-white/80 hover:bg-white"
          aria-label="Next slide"
        >
          <Image
            src={"/arrow-left.svg"}
            alt="arrow"
            width={24}
            height={24}
            className="rotate-180"
          />
        </button>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {photos?.slice(1, 4).map((i) => (
          <Image
            src={i.url}
            alt="product photo"
            width={167}
            height={167}
            key={i.id}
            className="object-cover h-41.75 aspect-auto "
          />
        ))}
      </div>
    </div>
  );
}
