"use client";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
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

  const handleClick = (locale: string) => {
    router.replace(pathname + "?" + searchParams, {
      locale,
    });
  };

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger className="outline-none">
          <Button variant="outline">{locale.toUpperCase()}</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Choose Language</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuRadioGroup
            value={locale}
            onValueChange={(val) => handleClick(val)}
          >
            {locales.map((locale: string) => (
              <DropdownMenuRadioItem key={locale} value={locale}>
                {localeLabels[locale as keyof typeof localeLabels]}
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
