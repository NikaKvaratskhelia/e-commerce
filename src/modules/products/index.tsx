import { Suspense } from "react";
import { Hero } from "./components/sections/Hero";
import { ProductsGrid } from "./components/sections/ProductsGrid";

function ProductsGridFallback() {
  return <div>Loading products...</div>;
}

export default function ShopPage() {
  return (
    <div className="flex flex-col">
      <Hero />

      <Suspense fallback={<ProductsGridFallback />}>
        <ProductsGrid />
      </Suspense>
    </div>
  );
}
