import { CategoryCardsLayout } from "../categories/components/sections/CategoryCardsLayout";
import BigSaleSection from "./components/sections/BigSaleSection";
import InfoCardsLayout from "./components/sections/InfoCardsLayout";
import { Newsletter } from "./components/sections/Newsletter";
import { Slider } from "./components/sections/Slider";

export default function HomePage() {
  return (
    <>
      <Slider />
      <CategoryCardsLayout />
      {/* aq new productebis sekcia */}
      <InfoCardsLayout/>
      <BigSaleSection />
      {/* aq artiklebis sekcia */}
      <Newsletter />
    </>
  );
}
