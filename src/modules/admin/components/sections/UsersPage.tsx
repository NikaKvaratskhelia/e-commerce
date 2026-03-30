import { UsersTable } from "../common/UsersTable";

export default function UsersPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex w-full justify-between items-center">
        <h2 className="text-[24px]  font-medium">Users</h2>
      </div>

      <UsersTable />
    </div>
  );
}
