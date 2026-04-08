import { CategoryCardsLayout } from "../categories/components/sections/CategoryCardsLayout";
import { BigSaleSection } from "./components/sections/BigSaleSection";
import { BlogsLayout } from "./components/sections/BlogsLayout";
import { InfoCardsLayout } from "./components/sections/InfoCardsLayout";
import { Newsletter } from "./components/sections/Newsletter";
import { ProductSlider } from "./components/sections/ProductsSlider";
import { Slider } from "./components/sections/Slider";

export default function HomePage() {
  return (
    <>
      <Slider />
      <CategoryCardsLayout />
      <ProductSlider />
      <InfoCardsLayout />
      <BigSaleSection />
      <BlogsLayout />
      <Newsletter />
    </>
  );
}
