import { CategoryCardsLayout } from "../categories/components/sections/CategoryCardsLayout";
import BigSaleSection from "./components/sections/BigSaleSection";
import { Newsletter } from "./components/sections/Newsletter";
import { Slider } from "./components/sections/Slider";

export default function HomePage() {
  return (
    <>
      <Slider />
      <CategoryCardsLayout />
      {/* aq new productebis sekcia */}
      <BigSaleSection />
      {/* aq artiklebis sekcia */}
      <Newsletter />
    </>
  );
}
