import Navbar from "@/components/my-ui/Navbar";
import { notFound } from "next/navigation";
import { Toaster } from "@/components/ui/toaster";
import { LocaleProviders } from "./localeProviders";

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  let messages;
  try {
    messages = (await import(`../../i18n/messages/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }

  return (
    <LocaleProviders locale={locale} messages={messages}>
      <Navbar />
      <Toaster />
      {children}
    </LocaleProviders>
  );
}
