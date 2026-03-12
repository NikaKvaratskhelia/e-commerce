import { CategoryCardsLayout } from "../categories/components/sections/CategoryCardsLayout";
import BigSaleSection from "./components/sections/BigSaleSection";
import InfoCardsLayout from "./components/sections/InfoCardsLayout";
import { Newsletter } from "./components/sections/Newsletter";
import ProductsSlider from "./components/sections/ProductsSlider";
import { Slider } from "./components/sections/Slider";

export default function HomePage() {
  return (
    <>
      <Slider />
      <CategoryCardsLayout />
      <ProductsSlider/>
      <InfoCardsLayout/>
      <BigSaleSection />
      {/* aq artiklebis sekcia */}
      <Newsletter />
    </>
  );
}
