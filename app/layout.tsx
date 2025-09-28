// app/layout.tsx

import type { Metadata } from "next";
import "./views/styles/globals.css";
import { inter } from "./views/Fonts";

export const metadata: Metadata = {
  title: "Product List App",
  description:
    "A simple full-stack product list app that implements CRUD operations.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className}  antialiased`}>{children}</body>
    </html>
  );
}
