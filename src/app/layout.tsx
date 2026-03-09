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
      <body>{children}</body>
    </html>
  );
}
