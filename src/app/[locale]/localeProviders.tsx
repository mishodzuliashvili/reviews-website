"use client";
import { NextIntlClientProvider } from "next-intl";
import React from "react";
import _ from "lodash";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";

export function LocaleProviders({
  children,
  locale,
  messages,
}: {
  children: React.ReactNode;
  locale: string;
  messages: any;
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
        <ThemeProvider attribute="class">{children}</ThemeProvider>
      </SessionProvider>
    </NextIntlClientProvider>
  );
}
