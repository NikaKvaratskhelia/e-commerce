import { ResponsiveTable } from "./sections/ResponsiveTable";
import { Tbody } from "./sections/Tbody";

export function OrdersTable() {
  return (
    <div className="flex flex-col w-full gap-10">
      <h2 className="leading-8 text-[20px] font-semibold">Orders History</h2>

      <table className="hidden lg:table w-full flex-col gap-5 max-w-176.75">
        <thead>
          <tr className="grid grid-cols-4 justify-items-start border-b border-(--neutral-light-grey) py-2 mb-6">
            <th className="font-normal text-(--neutral-light-grey) text-sm lg:text-base">
              Number ID
            </th>
            <th className="font-normal text-(--neutral-light-grey) text-sm lg:text-base">
              Dates
            </th>
            <th className="font-normal text-(--neutral-light-grey) text-sm lg:text-base">
              Status
            </th>
            <th className="font-normal text-(--neutral-light-grey) text-sm lg:text-base">
              Price
            </th>
          </tr>
        </thead>
        <Tbody />
      </table>

      <ResponsiveTable />
    </div>
  );
}
