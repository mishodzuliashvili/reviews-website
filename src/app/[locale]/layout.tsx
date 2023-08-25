import "../globals.css";
import type { Metadata } from "next";
import { Jost } from "next/font/google";
import { Providers } from "../providers";
import Navbar from "@/components/Navbar";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";

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
  let messages;
  try {
    messages = (await import(`../../messages/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={font.className}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Providers>
            <Navbar local={locale} />
            {children}
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
