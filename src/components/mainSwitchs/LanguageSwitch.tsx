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
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "next-intl/client";
import { useSearchParams } from "next/navigation";
import { useMounted } from "@/hooks/useMounted";

export default function LanguageSwitch() {
    const mounted = useMounted();
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const locale = useLocale();
    const t = useTranslations("LanguageSwitch");

    if (!mounted) return null;

    const handleClick = (locale: string) => {
        router.replace(pathname + "?" + searchParams, {
            locale,
        });
    };

    return (
        <div>
            <DropdownMenu>
                <DropdownMenuTrigger asChild className="outline-none">
                    <Button variant="outline">
                        <span className="hidden sm:block">
                            {localeLabels[locale as keyof typeof localeLabels]}
                        </span>
                        <span className="block sm:hidden">
                            {localeLabels[
                                locale as keyof typeof localeLabels
                            ].slice(0, 2)}
                        </span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuLabel>
                        {t("choose-language")}
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuRadioGroup
                        value={locale}
                        onValueChange={(val) => handleClick(val)}
                    >
                        {locales.map((locale: string) => (
                            <DropdownMenuRadioItem key={locale} value={locale}>
                                {
                                    localeLabels[
                                        locale as keyof typeof localeLabels
                                    ]
                                }
                            </DropdownMenuRadioItem>
                        ))}
                    </DropdownMenuRadioGroup>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}
