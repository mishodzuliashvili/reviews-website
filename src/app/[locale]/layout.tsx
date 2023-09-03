import Navbar from "@/components/my-ui/Navbar";
import { notFound } from "next/navigation";
import { Toaster } from "@/components/ui/toaster";
import { LocaleProviders } from "./localeProviders";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  let messages, user;
  try {
    messages = (await import(`../../i18n/messages/${locale}.json`)).default;
    const session = await getServerSession(authOptions);
    user = null; // TODO: user fetch
  } catch (error) {
    notFound();
  }

  return (
    <LocaleProviders user={user} locale={locale} messages={messages}>
      <Navbar />
      <Toaster />
      {children}
    </LocaleProviders>
  );
}
