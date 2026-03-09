import Footer from "@/src/layout/Footer";
import Header from "@/src/layout/header";

export default function ShopLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="min-h-screen flex flex-col justify-between">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
