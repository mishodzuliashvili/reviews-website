import "../globals.css";
import type { Metadata } from "next";
import { Jost } from "next/font/google";
import { Providers } from "../providers";
import Navbar from "@/components/Navbar";

const font = Jost({
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
  params: { lang },
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={font.className}>
        <Providers>
          <Navbar lang={lang} />
          {children}
        </Providers>
      </body>
    </html>
  );
}
