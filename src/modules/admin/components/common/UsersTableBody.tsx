"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { useAdminUsers } from "@/src/modules/user/hooks/queries/use-users";
import { useUpdateRole } from "../../hooks/mutations/use-update-role";
import { user_role } from "@/generated/prisma/client";

function RoleDropdown({
  value,
  onChange,
  disabled,
}: {
  value: user_role;
  onChange: (role: user_role) => void;
  disabled?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (!wrapperRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const roles: user_role[] = ["user", "admin"];

  return (
    <div ref={wrapperRef} className="relative inline-block min-w-32">
      <button
        type="button"
        disabled={disabled}
        onClick={() => setOpen((prev) => !prev)}
        className="flex cursor-pointer w-full items-center justify-between rounded-lg border border-(--neutral-light-grey) bg-white px-3 py-2 text-sm font-medium capitalize disabled:cursor-not-allowed disabled:opacity-60"
      >
        <span>{value}</span>
        <ChevronDown
          size={16}
          className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && !disabled && (
        <div className="absolute left-0 top-full z-20 mt-2 w-full overflow-hidden rounded-lg border border-(--neutral-light-grey) bg-white shadow-md">
          {roles.map((role) => (
            <button
              key={role}
              type="button"
              onClick={() => {
                if (role === value) {
                  setOpen(false);
                  return;
                }

                onChange(role);
                setOpen(false);
              }}
              className={`block cursor-pointer w-full px-3 py-2 text-left text-sm capitalize transition hover:bg-(--neutral-semi-white) ${
                value === role ? "bg-(--primary)/10 font-semibold" : ""
              }`}
            >
              {role}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export function UsersTableBody() {
  const { data } = useAdminUsers();
  const { mutate, isPending } = useUpdateRole();

  return (
    <tbody className="w-full">
      {data?.data?.map((user) => (
        <tr
          key={user.id}
          className="w-full border-b border-(--neutral-light-grey)"
        >
          <td className="py-5 pr-4">{user.name}</td>
          <td className="py-5 pr-4">@{user.username}</td>
          <td className="py-5 pr-4">{user.email}</td>

          <td className="py-5 pr-4">
            <RoleDropdown
              value={user.role}
              disabled={isPending}
              onChange={() => {
                mutate(user.id);
              }}
            />
          </td>

          <td className="py-5 pr-4">
            <p
              className={`w-fit rounded-full border border-(--neutral-light-grey) px-2 py-1 font-semibold text-white ${
                user.emailVerified ? "bg-(--green)" : "bg-(--red)"
              }`}
            >
              {user.emailVerified ? "Verified" : "Not Verified"}
            </p>
          </td>

          <td className="py-5 pr-4">{user._count.orders}</td>
        </tr>
      ))}
    </tbody>
  );
}
