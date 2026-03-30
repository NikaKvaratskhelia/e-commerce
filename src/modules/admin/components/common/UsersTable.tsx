import { UsersTableBody } from "./UsersTableBody";

export function UsersTable() {
  return (
    <div className="w-full bg-(--neutral-semi-white) border border-(--neutral-light-gray) rounded-lg p-5">
      <table className="w-full ">
        <thead className="w-full">
          <tr className="w-full">
            <th className="w-[30%] text-left">User</th>
            <th className="w-[14%] text-left">Username</th>
            <th className="w-[14%] text-left">Email</th>
            <th className="w-[14%] text-left">Role</th>
            <th className="w-[14%] text-left">Verified</th>
            <th className="w-[14%] text-left">Orders</th>
          </tr>
        </thead>
      </table>
      <UsersTableBody />
    </div>
  );
}
