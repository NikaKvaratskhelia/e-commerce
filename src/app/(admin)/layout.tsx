import { validateRequest } from "@/src/auth/validate";
import { Aside } from "@/src/modules/admin/components/layout/Aside";
import { MobileBlocker } from "@/src/modules/admin/components/sections/MobileBlocker";
import { redirect } from "next/navigation";

export default async function AdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const { user } = await validateRequest();

  if (!user || user.role !== "admin") {
    redirect("/");
  }

  return (
    <div>
      <div className="min-h-screen gap-6 hidden lg:flex">
        <Aside />
        <main className="px-8 py-20 w-full ">{children}</main>
      </div>

      <MobileBlocker />
    </div>
  );
}
