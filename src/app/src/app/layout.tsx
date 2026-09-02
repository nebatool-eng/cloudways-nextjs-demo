import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tech News Dashboard",
  description: "A server-rendered Next.js dashboard, deployed on Cloudways.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
