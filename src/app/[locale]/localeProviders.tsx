"use client";
import { NextIntlClientProvider } from "next-intl";
import React from "react";
import _ from "lodash";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";
import { UserProvider } from "./mainContext";

export function LocaleProviders({
  children,
  locale,
  messages,
  user,
}: {
  children: React.ReactNode;
  locale: string;
  messages: any;
  user: User | null;
}) {
  return (
    <NextIntlClientProvider
      onError={() => {}}
      getMessageFallback={({ error, key, namespace }) => {
        const nestedMessages = _.get(messages, namespace ?? "");
        if (!nestedMessages) return key;
        if (error.code === "MISSING_MESSAGE") return nestedMessages["default"];
        return nestedMessages[key];
      }}
      locale={locale}
      messages={messages}
    >
      <SessionProvider>
        <ThemeProvider attribute="class">
          <UserProvider user={user}>{children}</UserProvider>
        </ThemeProvider>
      </SessionProvider>
    </NextIntlClientProvider>
  );
}
