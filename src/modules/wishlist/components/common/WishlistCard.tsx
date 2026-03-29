import { WishlistItemModel } from "../../server/selectors/wishlist.get";
import Image from "next/image";
import { RemoveFromWishlist } from "./RemoveFromWishlist";
import { AddToCartBtn } from "./AddToCartBtn";

export function WishlistCard({ item }: { item: WishlistItemModel }) {
  return (
    <tr className="max-w-176.75 grid grid-cols-1 sm:grid-cols-3 w-full justify-items-start border-b border-(--neutral-light-grey) py-2">
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
          <p className="text-xs leading-5">Color: {item.productColor.color}</p>
        </div>
      </td>
      <td className="flex items-center justify-center">
        <p className="leading-5.5 text-sm">
          ${item.productColor.product.price}
        </p>
      </td>
      <td>
        <AddToCartBtn id={item.productColorId} />
      </td>
    </tr>
  );
}
