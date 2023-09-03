"use client";
import ThemeSwitch from "../mainSwitchs/ThemeSwitch";
import LanguageSwitcher from "../mainSwitchs/LanguageSwitch";
import ProfileButton from "./ProfileButton";
import { Button } from "../ui/button";
import Link from "next-intl/link";
import { useTranslations } from "next-intl";
import { useUser } from "@/app/[locale]/mainContext";

const Navbar = () => {
  const { user } = useUser();
  const t = useTranslations("Navbar");

  const isUserBlocked = user?.isBlocked;

  return (
    <nav className="flex justify-between p-5">
      <div className="flex gap-3">
        {!isUserBlocked && (
          <Button variant="outline" asChild>
            <Link href="/">{t("home")}</Link>
          </Button>
        )}
        <ThemeSwitch />
        <LanguageSwitcher />
      </div>
      {!isUserBlocked &&
        (user ? (
          <ProfileButton />
        ) : (
          <Button variant="outline" asChild>
            <Link href="/auth/signin">{t("signin")}</Link>
          </Button>
        ))}
    </nav>
  );
};

export default Navbar;
