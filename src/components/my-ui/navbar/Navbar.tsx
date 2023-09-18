"use client";
import ThemeSwitch from "../../mainSwitchs/ThemeSwitch";
import LanguageSwitcher from "../../mainSwitchs/LanguageSwitch";
import ProfileButton from "./ProfileButton";
import { Button } from "../../ui/button";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useSession } from "next-auth/react";
import SearchInput from "../search/SearchInput";
import { AiOutlineHome, AiOutlineSearch } from "react-icons/ai";
import { useState } from "react";

const Navbar = () => {
    const t = useTranslations("Navbar");
    const { data, status } = useSession();
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    if (status === "loading") return null;
    const isBlocked = data?.user.isBlocked;
    const isAuth = status === "authenticated";

    const homeButton = !isBlocked && (
        <Button variant="outline" asChild>
            <Link prefetch={false} href="/">
                <span className="hidden sm:block">{t("home")}</span>
                <span className="block sm:hidden">
                    <AiOutlineHome />
                </span>
            </Link>
        </Button>
    );

    return (
        <>
            <nav className="flex justify-between p-5">
                <div className="flex gap-3 mr-3">
                    {homeButton}
                    <ThemeSwitch />
                    <LanguageSwitcher />
                    {/* <div className="hidden md:block">
                        <SearchInput />
                    </div> */}
                    <div className="">
                        <Button
                            onClick={() => setIsSearchOpen((p) => !p)}
                            variant="outline"
                        >
                            <AiOutlineSearch />
                        </Button>
                    </div>
                </div>
                {!isBlocked && isAuth && <ProfileButton />}
                {!isAuth && (
                    <Button variant="outline" asChild>
                        <Link href="/login">{t("signin")}</Link>
                    </Button>
                )}
            </nav>
            {isSearchOpen && (
                <div className="w-full px-5 pb-5">
                    <SearchInput />
                </div>
            )}
        </>
    );
};

export default Navbar;
