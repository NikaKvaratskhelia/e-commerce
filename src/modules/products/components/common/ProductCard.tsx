import Image from "next/image";
import Link from "next/link";
import { Heart } from "lucide-react";
import { ProductDTO } from "../../server/models";
import { AddToCartBtn } from "@/src/modules/cart/components/common/AddToCartBtn";

type Props = {
  product: ProductDTO;
};

const SEVEN_DAYS_IN_MS = 7 * 24 * 60 * 60 * 1000;

export function ProductCard({ product }: Props) {
  const now = new Date();

  console.log(product);
  
  const isNew =
    now.getTime() - new Date(product.createdAt).getTime() <= SEVEN_DAYS_IN_MS;

  const discount = product.discounts.find(
    (d) => new Date(d.discountEndDate).getTime() > now.getTime(),
  );

  const newPrice = discount
    ? product.price * (1 - discount.discountPercentage / 100)
    : null;

  return (
    <div className="w-65.5 mx-auto">
      <div className="relative h-87.5 p-4 group bg-(--neutral-semi-white) flex flex-col justify-between overflow-hidden">
        <div className="flex items-center justify-between">
          {(isNew || discount) && (
            <div className="flex flex-col gap-2 font-bold leading-3.5 text-center self-start z-20">
              {isNew && (
                <div className="px-3.5 py-1 bg-white text-(--primary) rounded-sm">
                  New
                </div>
              )}

              {discount && (
                <div className="px-3.5 py-1 bg-(--green) text-(--neutral-white) rounded-sm">
                  -{discount.discountPercentage}%
                </div>
              )}
            </div>
          )}

          <div className="bg-white rounded-full p-2 z-10 cursor-pointer">
            <Heart
              width={18}
              height={18}
              className="text-red-600 hover:fill-current"
            />
          </div>
        </div>

        <Link
          href={`/product/${product.id}`}
          className="absolute inset-0 w-full h-full z-1"
        >
          <Image
            src={product.thumbnail}
            alt={product.title}
            fill
            sizes="(max-width: 768px) 100vw, 262px"
            className="object-cover"
          />
        </Link>

        <AddToCartBtn id={product.colors[0]?.id} />
      </div>

      <div className="flex flex-col gap-1 mt-4">
        <p className="font-semibold leading-6.5">{product.title}</p>

        <p className="text-sm leading-5.5">
          {newPrice !== null ? (
            <>
              <span className="text-(--primary) font-semibold">
                ${newPrice.toFixed(2)}
              </span>{" "}
              <span className="line-through text-(--neutral-light-grey)">
                ${product.price.toFixed(2)}
              </span>
            </>
          ) : (
            <span className="text-(--primary) font-semibold text-sm">
              ${product.price.toFixed(2)}
            </span>
          )}
        </p>
      </div>
    </div>
  );
}
