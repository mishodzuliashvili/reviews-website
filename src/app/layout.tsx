import "./globals.css";
import type { Metadata } from "next";
import { Ubuntu } from "next/font/google";

const font = Ubuntu({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "InsightfulPicks",
  description:
    "Discover and share recommendations for books, movies, games, and more.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={font.className}>{children}</body>
    </html>
  );
}
