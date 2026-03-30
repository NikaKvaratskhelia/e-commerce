import { UsersTableBody } from "./UsersTableBody";

export function UsersTable() {
  return (
    <div className="w-full bg-(--neutral-semi-white) border border-(--neutral-light-gray) rounded-lg p-5">
      <table className="w-full ">
        <thead className="w-full">
          <tr className="w-full">
            <th className="text-left">User</th>
            <th className="text-left">Username</th>
            <th className="text-left">Email</th>
            <th className="text-left">Role</th>
            <th className="text-left">Verified</th>
            <th className="text-left">Orders</th>
          </tr>
        </thead>
        <UsersTableBody />
      </table>
    </div>
  );
}
