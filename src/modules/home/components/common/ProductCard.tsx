import { Button } from "@/src/components/ui/Button";
import { ProductModel } from "../../server/product.model";
import Image from "next/image";
type Props = {
  product: ProductModel;
};

export function ProductCard({ product }: Props) {
  const todaysDate = new Date();

  const discount = product.discounts.find(
    (d) => d.discountEndDate.getTime() > todaysDate.getTime(),
  );

  const newPrice = discount
    ? product.price * (1 - discount.discountPercentage / 100)
    : undefined;

  return (
    <div className="max-w-65.5 w-full mx-auto">
      <div className="relative p-4 group h-87.5 bg-(--neutral-semi-white) flex flex-col items-center justify-between">
        <div className="flex flex-col gap-2 font-bold leading-3.5 text-center self-start z-20">
          <div className="px-3.5 py-1 bg-white text-(--primary) rounded-sm">
            New
          </div>

          {discount && (
            <div className="px-3.5 py-1 bg-(--green) text-(--neutral-white) rounded-sm">
              -{discount.discountPercentage}%
            </div>
          )}
        </div>

        <div className="w-full h0full flex items-center justify-center absolute inset-0">
          <Image
            src={product.thumbnail}
            alt={product.title}
            fill
            className="h-full w-full object-cover"
          />
        </div>

        <div className="opacity-100 lg:opacity-0 group-hover:opacity-100 transition-all duration-500 relative z-10 w-full">
          <Button
            text="Add To Cart"
            mode="solid"
            rounded="square"
            disabled={false}
          />
        </div>
      </div>

      <div className="flex flex-col gap-1 mt-4">
        <p className="font-semibold leading-6.5">{product.title}</p>

        <p className="text-sm leading-5.5">
          {newPrice !== undefined ? (
            <>
              <span className="text-(--primary) font-semibold">
                ${newPrice.toFixed(2)}
              </span>{" "}
              <span className="line-through text-(--neutral-light-grey)">
                ${product.price.toFixed(2)}
              </span>
            </>
          ) : (
            <span>${product.price.toFixed(2)}</span>
          )}
        </p>
      </div>
    </div>
  );
}
