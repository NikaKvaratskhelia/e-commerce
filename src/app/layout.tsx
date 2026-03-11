import { Toaster } from "sonner";
import { QueryProvider } from "../providers/query-provider";
import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "E-commerce app",
  description: "E-commerce site",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <QueryProvider>
        <body>{children}</body>
        <Toaster />
      </QueryProvider>
    </html>
  );
}
