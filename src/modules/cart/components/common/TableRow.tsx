import Image from "next/image";
import { CartItemDTO } from "../../server/models";
import { DeleteBtn } from "./DeleteBtn";
import { EditQtyBtn } from "./EditQtyBtn";

type Props = {
  cartItem: CartItemDTO;
};

export function TableRow({ cartItem }: Props) {
  return (
    <tr className="py-6 w-full grid grid-cols-[2fr_1fr_1fr_1fr] border-b border-(--neutral-dark-white)">
      <td className="flex gap-4">
        <Image
          src={cartItem.productColor.photos[0].url}
          alt={"Product photo"}
          width={80}
          height={96}
        />
        <div className="flex flex-col gap-2 items-start justify-start">
          <p className="font-semibold text-sm leading-5.5">
            {cartItem.productColor.product.title}
          </p>
          <p className="text-xs leading-5 text-(--neutral-light-grey)">
            Color: {cartItem.productColor.color}
          </p>
          <div className="flex items-center gap-2">
            <DeleteBtn id={cartItem.productColor.id} />
            <p className="text-sm leading-5.5 text-(--neutral-light-grey) font-semibold">
              Remove
            </p>
          </div>
        </div>
      </td>
      <td>
        <EditQtyBtn id={cartItem.productColor.id} qty={cartItem.quantity} />
      </td>
      <td>
        <p className="text-[18px] leading-6">
          ${cartItem.productColor.product.price}
        </p>
      </td>
      <td>
        <p className="text-[18px] leading-6 font-semibold">
          $
          {(cartItem.quantity * cartItem.productColor.product.price).toFixed(2)}
        </p>
      </td>
    </tr>
  );
}
