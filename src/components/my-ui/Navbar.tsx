"use client";
import ThemeSwitch from "../mainSwitchs/ThemeSwitch";
import LanguageSwitcher from "../mainSwitchs/LanguageSwitch";
import ProfileButton from "./ProfileButton";
import { Button } from "../ui/button";
import Link from "next-intl/link";
import { useTranslations } from "next-intl";

const Navbar = () => {
  const t = useTranslations("Navbar");

  return (
    <nav className="flex justify-between p-5">
      <div className="flex gap-3">
        <Button variant="outline" asChild>
          <Link href="/">{t("home")}</Link>
        </Button>
        <ThemeSwitch />
        <LanguageSwitcher />
      </div>
      <ProfileButton />
    </nav>
  );
};

export default Navbar;
