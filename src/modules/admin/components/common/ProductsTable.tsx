import { ProductsTableBody } from "./ProductsTableBody";

export default function ProductsTable() {
  return (
    <table className="w-full">
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
  );
}
