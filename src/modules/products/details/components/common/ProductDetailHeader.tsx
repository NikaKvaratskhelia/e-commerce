"use client";

import { redirect, useParams } from "next/navigation";
import { useProductDetails } from "../../../hooks/queries/use-product-details";
import { ProductDetailHeaderSkeleton } from "../skeletons/ProductDetailHeaderSkeleton";
import ReviewsHeader from "./ReviewsHeader";

export function ProductDetailHeader() {
  const params = useParams();
  const id = params.id as string;

  if (!id) redirect("/");

  const query = useProductDetails(id);

  if (query.isLoading) return <ProductDetailHeaderSkeleton />;
  if (!query.data || !query.data.data) redirect("/");

  const product = query.data.data;

  const now = new Date();

  const discount = product.discounts.find(
    (d) => new Date(d.discountEndDate).getTime() > now.getTime(),
  );

  const newPrice = discount
    ? product.price * (1 - discount.discountPercentage / 100)
    : null;

  return (
    <div className="flex flex-col gap-4 justify-center max-w-127 py-6">
      <ReviewsHeader />
      
      <h2 className="text-[40px] leading-11 text-(--primary)">
        {product.title}
      </h2>
      <p className="text-(--neutral-light-grey) text-[16px] leading-6.5">
        {product.description}
      </p>

      <p className="text-sm leading-5.5">
        {newPrice !== null ? (
          <>
            <span className="text-(--primary) font-medium text-[28px] leading-8.5">
              ${newPrice.toFixed(2)}
            </span>{" "}
            <span className="line-through text-(--neutral-light-grey) font-medium text-[20px] leading-7">
              ${product.price.toFixed(2)}
            </span>
          </>
        ) : (
          <span className="text-(--primary) font-medium text-[28px] leading-8.5">
            ${product.price.toFixed(2)}
          </span>
        )}
      </p>
    </div>
  );
}
