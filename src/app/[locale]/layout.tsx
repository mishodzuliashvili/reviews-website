import Navbar from "@/components/my-ui/Navbar";
import { notFound } from "next/navigation";
import { Toaster } from "@/components/ui/toaster";
import { LocaleProviders } from "./localeProviders";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextRequest } from "next/server";
import { headers } from "next/headers";

async function getUser(userId: string) {
  const host = headers().get("host");
  const res = await import("../api/users/[id]/route");
  const { user } = await (
    await res.GET(new NextRequest(`http://${host}/api/users/[id]/route`), {
      params: {
        id: userId,
      },
    })
  ).json();
  return user;
}

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
  const session = await getServerSession(authOptions);

  const user = session ? await getUser((session as any).userId) : null;
  return (
    <LocaleProviders user={user} locale={locale} messages={messages}>
      <Navbar />
      <Toaster />
      {children}
    </LocaleProviders>
  );
}
