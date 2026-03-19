import { DiscountExpires } from "../common/DiscountExpires";
import { ProductDetailHeader } from "../common/ProductDetailHeader";

export function ProductDetails() {
  return (
    <div className="flex flex-col items-start flex-1">
      <ProductDetailHeader />
      <DiscountExpires />
    </div>
  );
}
