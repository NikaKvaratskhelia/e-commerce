import { CartHero } from "./components/section/CartHero";
import { CartTable } from "./components/section/CartTable";

export default function CartPage() {
  return (
    <div className="flex flex-col py-20 max-w-280 w-full mx-auto px-8 w1120:px-0">
      <CartHero />
      <CartTable />
    </div>
  );
}
