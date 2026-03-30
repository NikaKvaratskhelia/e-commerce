import { AddItemBtn } from "../common/AddItemBtn";
import { ProductsTable } from "../common/ProductsTable";

export default function ProductsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex w-full justify-between items-center">
        <h2 className="text-[24px]  font-medium">Products</h2>
        <AddItemBtn text="Product" />
      </div>

      <ProductsTable />
    </div>
  );
}
