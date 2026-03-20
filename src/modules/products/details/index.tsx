import { ProductDetails } from "./components/sections/ProductDetails";
import { ViewProduct } from "./components/sections/ViewProduct";

export default function ProductDetailsPage() {
  return (
    <div className="flex h-fit max-w-280 mx-auto gap-16 mt-15 w-full  pb-17">
      <ViewProduct />

      <ProductDetails />
    </div>
  );
}
