import Navbar from "@/components/Navbar";
import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";

export default async function LocaleLayout({
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
    <NextIntlClientProvider locale={locale} messages={messages}>
      <Navbar local={locale} />
      {children}
    </NextIntlClientProvider>
  );
}
