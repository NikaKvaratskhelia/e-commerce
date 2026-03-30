import { validateRequest } from "@/src/auth/validate";
import { redirect } from "next/navigation";

export default async function AdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const { user } = await validateRequest();

  if (!user || user.role !== "admin") {
    redirect("/");
  }

  return (
    <div className="min-h-screen flex flex-col justify-between">
      <main className="px-8 py-20">{children}</main>
    </div>
  );
}
