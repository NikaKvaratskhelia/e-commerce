import { Comment } from "../../comments";
import { ProductDetails } from "./components/sections/ProductDetails";
import { ViewProduct } from "./components/sections/ViewProduct";

export default function ProductDetailsPage() {
  return (
    <div className="flex h-fit max-w-280 mx-auto flex-col px-8 w1120:px-0 items-center w1120:items-start gap-16 mt-15 w-full pb-17">
      <div className="flex flex-col w1120:flex-row gap-16">
        <ViewProduct />
        <ProductDetails />
      </div>
      <Comment />
    </div>
  );
}
