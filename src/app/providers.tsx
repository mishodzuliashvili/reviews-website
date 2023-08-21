"use client";
import React from "react";
import { MainProvider } from "./mainContext";

export function Providers({ children }: { children: React.ReactNode }) {
  return <MainProvider>{children}</MainProvider>;
}
