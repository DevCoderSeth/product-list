// app/layout.tsx

import type { Metadata } from "next";
import "./views/styles/globals.css";
import { Toaster } from "./views/components/sonner";
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
      <body className={`${inter.className}  antialiased`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
