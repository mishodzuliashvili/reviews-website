import "./globals.css";
import type { Metadata } from "next";
import { Jost } from "next/font/google";
import { Providers } from "./providers";
import Navbar from "@/components/Navbar";
import { notFound } from "next/navigation";

const font = Jost({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "InsightfulPicks",
  description:
    "Discover and share recommendations for books, movies, games, and more.",
};

export default async function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={font.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
