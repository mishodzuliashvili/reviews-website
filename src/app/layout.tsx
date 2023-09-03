import { ReactNode } from "react";
import "./globals.css";
import { Metadata } from "next";

type Props = {
  children: ReactNode;
};

export const metadata: Metadata = {
  title: "InsightfulPicks",
  description:
    "Discover and share recommendations for books, movies, games, and more.",
};

export default function RootLayout({ children }: Props) {
  return children;
}
