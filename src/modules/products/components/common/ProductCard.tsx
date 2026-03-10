import { Button } from "@/src/components/ui/Button";
import Image from "next/image";
import { Discount } from "@/generated/prisma/browser";

const SEVEN_DAYS_IN_MS = 7 * 24 * 60 * 60 * 1000;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function ProductCard({ product }: any) {
  const now = new Date();

  const isNew = now.getTime() - product.createdAt.getTime() <= SEVEN_DAYS_IN_MS;

  const discount = product.discounts.find(
    (d: Discount) => d.discountEndDate.getTime() > now.getTime(),
  );

  const newPrice = discount
    ? product.price * (1 - discount.discountPercentage / 100)
    : null;

  return (
    <div className="max-w-65.5 w-full mx-auto">
      <div className="relative h-87.5 p-4 group bg-(--neutral-semi-white) flex flex-col justify-between overflow-hidden">
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

        <div className="absolute inset-0 w-full h-full">
          <Image
            src={product.thumbnail}
            alt={product.title}
            fill
            sizes="(max-width: 768px) 100vw, 262px"
            className="object-cover"
          />
        </div>

        <div className="relative z-10 w-full opacity-100 transition-all duration-500 lg:opacity-0 group-hover:opacity-100">
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
            <span>${product.price.toFixed(2)}</span>
          )}
        </p>
      </div>
    </div>
  );
}
