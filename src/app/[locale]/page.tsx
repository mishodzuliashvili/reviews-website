"use client";
import { useMain } from "./mainContext";
import { useTranslations } from "next-intl";

export default function Home() {
  const { user } = useMain();

  return <main></main>;
}
