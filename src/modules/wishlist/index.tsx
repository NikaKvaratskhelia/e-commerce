import { Table } from "./components/sections/Table";

export default function WishlistPage() {
  return (
    <div className="flex flex-col items-start gap-10 w-full ml-10">
      <h2 className="leading-8 text-[20px] font-semibold">Your Wishlist</h2>
      <Table />
    </div>
  );
}
