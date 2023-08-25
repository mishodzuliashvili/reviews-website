"use client";

import { localeLabels, locales } from "@/locals";
import { useRouter } from "next/navigation";

export default function LanguageSwitcher({ local }: { local: string }) {
  const router = useRouter();
  return (
    <div>
      <select
        onChange={(e) => {
          router.push(`/${e.target.value}`);
        }}
        value={local}
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
