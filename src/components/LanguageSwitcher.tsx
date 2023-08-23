"use client";

import { localeLabels, locales } from "@/locals";
import { useRouter } from "next/navigation";

export default function LanguageSwitcher({ lang }: { lang: string }) {
  const router = useRouter();
  return (
    <div>
      <select
        onChange={(e) => {
          router.push(`/${e.target.value}`);
        }}
        value={lang}
      >
        {locales.map((locale: string) => (
          <option key={locale} value={locale}>
            {localeLabels[locale as keyof typeof localeLabels]}
          </option>
        ))}
      </select>
    </div>
  );
}
