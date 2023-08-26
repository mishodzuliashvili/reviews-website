"use client";

import { localeLabels, locales } from "@/i18n/locals";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "next-intl/client";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

export default function LanguageSwitch() {
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const locale = useLocale();

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <div>
      <select
        onChange={(e) => {
          router.replace(pathname + "?" + searchParams, {
            locale: e.target.value,
          });
        }}
        value={locale}
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
