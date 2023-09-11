"use client";
import ThemeSwitch from "../../mainSwitchs/ThemeSwitch";
import LanguageSwitcher from "../../mainSwitchs/LanguageSwitch";
import ProfileButton from "./ProfileButton";
import { Button } from "../../ui/button";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useSession } from "next-auth/react";
import SearchInput from "../search/SearchInput";

const Navbar = () => {
    const t = useTranslations("Navbar");
    const { data, status } = useSession();

    if (status === "loading") return null;
    const isBlocked = data?.user.isBlocked;
    const isAuth = status === "authenticated";

    const homeButton = !isBlocked && (
        <Button variant="outline" asChild>
            <Link prefetch={false} href="/">
                {t("home")}
            </Link>
        </Button>
    );

    return (
        <nav className="flex justify-between p-5">
            <div className="flex gap-3">
                {homeButton}
                <ThemeSwitch />
                <LanguageSwitcher />
                <SearchInput />
            </div>
            {!isBlocked && isAuth && <ProfileButton />}
            {!isAuth && (
                <Button variant="outline" asChild>
                    <Link href="/login">{t("signin")}</Link>
                </Button>
            )}
        </nav>
    );
};

export default Navbar;
