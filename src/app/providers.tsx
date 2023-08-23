"use client";
import React from "react";
import { MainProvider } from "./mainContext";
import { ThemeProvider } from "next-themes";
import { SessionProvider } from "next-auth/react";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <ThemeProvider attribute="class">
        <MainProvider>{children}</MainProvider>
      </ThemeProvider>
    </SessionProvider>
  );
}
