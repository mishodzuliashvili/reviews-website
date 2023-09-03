import { notFound } from "next/navigation";
import { LocaleProviders } from "./localeProviders";
import Navbar from "@/components/my-ui/Navbar";
import { Toaster } from "@/components/ui/toaster";

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  let messages: any;
  try {
    messages = (await import(`../../i18n/messages/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }

  return (
    <html lang={locale}>
      <body>
        <LocaleProviders locale={locale} messages={messages}>
          <Navbar />
          <Toaster />
          {children}
        </LocaleProviders>
      </body>
    </html>
  );
}

{
}
