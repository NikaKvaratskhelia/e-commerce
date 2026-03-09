import { CategoryCardsLayout } from "../categories/components/sections/CategoryCardsLayout";
import { Newsletter } from "./components/sections/Newsletter";
import { Slider } from "./components/sections/Slider";

export default function HomePage() {
  return (
    <>
      <Slider />
      <CategoryCardsLayout />
      <Newsletter />
    </>
  );
}
