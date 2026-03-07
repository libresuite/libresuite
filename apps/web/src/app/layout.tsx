import "./globals.css";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "LibreSuite",
  description: "The unified collaboration suite you’ve always wanted — open, flexible, limitless.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
