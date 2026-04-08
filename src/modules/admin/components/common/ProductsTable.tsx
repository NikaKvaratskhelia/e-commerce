import { ProductsTableBody } from "./ProductsTableBody";

export function ProductsTable() {
  return (
    <div className="w-full bg-(--neutral-semi-white) border border-(--neutral-light-gray) rounded-lg p-5">
      <table className="w-full ">
        <thead className="w-full">
          <tr className="w-full">
            <th className="w-[30%] text-left">Product</th>
            <th className="w-[14%] text-left">Category</th>
            <th className="w-[14%] text-left">Price</th>
            <th className="w-[14%] text-left">Stock</th>
            <th className="w-[14%] text-left">Colors</th>
            <th className="w-[14%] text-left">Discount</th>
          </tr>
        </thead>
        <ProductsTableBody />
      </table>
    </div>
  );
}
