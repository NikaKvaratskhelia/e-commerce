"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Scrollbar, FreeMode } from "swiper/modules";

import "swiper/css";
import "swiper/css/scrollbar";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useProducts } from "@/src/modules/products/hooks/queries/use-products";
import { ProductCard } from "@/src/modules/products/components/common/ProductCard";
import { useSearchParams } from "next/navigation";

export function ProductSlider() {
  const params = useSearchParams();

  const onlyNewParam = params.get("newProductsOnly");

  const queries = {
    page: params.get("page") ?? "",
    limit: params.get("limit") ?? "",
    sortBy: params.get("sortBy") ?? "",
    sort: params.get("sort") ?? "",
    newOnly: onlyNewParam !== null ? onlyNewParam : "true",
    categoryId: params.get("categoryId") ?? "",
  };

  const { data } = useProducts(queries);

  if (!data) return null;

  if (!data.data || data.data.products?.length === 0) return null;

  return (
    <div className="flex flex-col max-w-280 mx-auto px-8 --breakpoint-1120:px-0 overflow-visible items-start">
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
        slidesPerView={1}
        spaceBetween={24}
        breakpoints={{
          200: {
            slidesPerView: 1,
            spaceBetween: 24,
          },
          600:{
            slidesPerView: 1.4,
            spaceBetween: 24,
          },
          700: {
            slidesPerView: 2.2,
            spaceBetween: 24,
          },
          900: {
            slidesPerView: 3.2,
            spaceBetween: 24,
          },
          1100: {
            slidesPerView: 4,
            spaceBetween: 24,
          },
        }}
        freeMode={true}
        scrollbar={{ draggable: true }}
        className="max-w-7xl! w-full pb-14!"
      >
        {data?.data?.products?.map((item) => (
          <SwiperSlide key={item.id}>
            <ProductCard product={item} />
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
