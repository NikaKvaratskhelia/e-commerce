import { Hero } from "./components/sections/Hero";
import { ProductsGrid } from "./components/sections/ProductsGrid";

export default function ShopPage() {
  return (
    <div className="flex flex-col">
      <Hero />
      <ProductsGrid />;
    </div>
  );
}
