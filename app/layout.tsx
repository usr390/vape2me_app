import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Vape2Me | Local Vape Delivery MVP",
  description:
    "Vape2Me is a local 21+ vape delivery MVP for browsing products, building a cart, and requesting delivery."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
