import { requireAuth } from "@/src/auth/helpers";
import { UserAside } from "@/src/modules/user-dashboard/components/sections/UserAside";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

export default async function dashboardLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  const { user, session } = await requireAuth();

  if (!user || !session) redirect("/login");
  return (
    <div className="flex items-center flex-col max-w-280 mx-auto w-full pb-10 px-8 w1120:px-0">
      <h1 className="py-20 leading-11 text-[40px] sm:leading-14.5 sm:text-[54px] font-medium">
        My Account
      </h1>
      <main className="flex gap-10 items-center w-full flex-col sm:items-start sm:flex-row">
        <UserAside />
        {children}
      </main>
    </div>
  );
}
