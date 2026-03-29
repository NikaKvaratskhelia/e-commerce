import { WishlistItemModel } from "../../server/selectors/wishlist.get";
import Image from "next/image";
import { RemoveFromWishlist } from "./RemoveFromWishlist";
import { AddToCartBtn } from "./AddToCartBtn";

export function WishlistCard({ item }: { item: WishlistItemModel }) {
  return (
    <tr className="max-w-176.75 grid grid-cols-1 lg:grid-cols-3 gap-4 w-full justify-items-start border-b border-(--neutral-light-grey) py-2">
      <td className="flex items-center gap-4 relative">
        <RemoveFromWishlist id={item.productColorId} />
        <Image
          src={item.productColor.photos[0].url}
          alt="product photo"
          width={60}
          height={72}
        />
        <div className="flex flex-col gap-2">
          <p className="font-semibold text-sm leading-5.5">
            {item.productColor.product.title}
          </p>
          <div className="flex gap-4 items-center">
            <p className="text-xs leading-5">
              Color: {item.productColor.color}
            </p>
            <p className="leading-5.5 text-sm lg:hidden">
              ${item.productColor.product.price}
            </p>
          </div>
        </div>
      </td>
      <td className="items-center justify-center hidden lg:flex">
        <p className="leading-5.5 text-sm">
          ${item.productColor.product.price}
        </p>
      </td>
      <td className="w-full lg:w-fit">
        <AddToCartBtn id={item.productColorId} />
      </td>
    </tr>
  );
}
