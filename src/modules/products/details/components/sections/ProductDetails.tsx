import { AddButtons } from "../common/AddButtons";
import { DiscountExpires } from "../common/DiscountExpires";
import { ProductDetailHeader } from "../common/ProductDetailHeader";
import { ProductColors } from "./ProductColors";

export function ProductDetails() {
  return (
    <div className="flex flex-col items-start flex-1">
      <ProductDetailHeader />
      <DiscountExpires />
      <ProductColors />
      <AddButtons />
    </div>
  );
}
