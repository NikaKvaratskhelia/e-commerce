import { TBody } from "./TBody";

export function Table() {
  return (
    <table className="w-full flex flex-col gap-5 max-w-176.75">
      <thead>
        <tr className="grid grid-cols-1 sm:grid-cols-3 justify-items-start border-b border-(--neutral-light-grey) py-2">
          <th>Product</th>
          <th className="hidden sm:flex">Price</th>
          <th className="hidden sm:flex">Action</th>
        </tr>
      </thead>
      <TBody />
    </table>
  );
}
