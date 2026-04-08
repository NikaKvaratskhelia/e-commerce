"use client";

import Link from "next/link";
import { useWishlist } from "../../hooks/queries/use-wishlist";
import { WishlistCard } from "../common/WishlistCard";
import { WishlistCardSkeleton } from "../skeletons/WishlistCardSkeleton";

export function TBody() {
  const { data, isLoading } = useWishlist();

  if (isLoading) {
    return (
      <tbody className="flex flex-col gap-6">
        <WishlistCardSkeleton />
        <WishlistCardSkeleton />
        <WishlistCardSkeleton />
      </tbody>
    );
  }

  if (!data?.wishlistItems?.length) {
    return (
      <tbody className="col-span-full flex items-center py-10 text-center w-full">
        <tr className="w-full">
          <td className="flex flex-col items-center justify-center w-full">
            <h2 className="text-xl font-semibold text-gray-900">
              Your wishlist is empty
            </h2>

            <p className="mt-2 text-sm text-gray-500 max-w-md">
              Looks like you haven&apos;t added anything yet. Start exploring
              and save items you love.
            </p>

            <Link
              href="/shop"
              className="mt-6 px-6 py-3 bg-black text-white text-sm font-medium rounded-md hover:opacity-90 transition"
            >
              Browse products
            </Link>
          </td>
        </tr>
      </tbody>
    );
  }

  return (
    <tbody className="flex flex-col gap-6 w-full">
      {data.wishlistItems.map((i) => (
        <WishlistCard key={i.id} item={i} />
      ))}
    </tbody>
  );
}
