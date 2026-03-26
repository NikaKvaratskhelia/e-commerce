import Image from "next/image";
import { CartItemDTO } from "../../server/models";
import { DeleteBtn } from "./DeleteBtn";
import { EditQtyBtn } from "./EditQtyBtn";

type Props = {
  cartItem: CartItemDTO;
};

export function CartItem({ cartItem }: Props) {
  return (
    <div className="border-b border-(--neutral-dark-white) py-6 flex gap-4 items-start">
      <Image
        src={cartItem.productColor.photos[0].url}
        alt={"Product photo"}
        width={80}
        height={96}
      />
      <div className="flex w-full justify-between items-start">
        <div className="flex flex-col gap-2 items-start justify-start">
          <p className="font-semibold text-sm leading-5.5">
            {cartItem.productColor.product.title}
          </p>
          <p className="text-xs leading-5 text-(--neutral-light-grey)">
            Color: {cartItem.productColor.color}
          </p>
          <EditQtyBtn id={cartItem.productColor.id} qty={cartItem.quantity} />
        </div>
        <div className="flex flex-col gap-2 items-end justify-start">
          <p className="font-semibold text-sm leading-5.5">
            ${cartItem.productColor.product.price}
          </p>
          <DeleteBtn id={cartItem.productColorId} />
        </div>
      </div>
    </div>
  );
}
