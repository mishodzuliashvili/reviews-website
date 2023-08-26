"use client";
import ThemeSwitch from "../mainSwitchs/ThemeSwitch";
import LanguageSwitcher from "../mainSwitchs/LanguageSwitch";
import ProfileButton from "./ProfileButton";
import { Button } from "../ui/button";
import Link from "next-intl/link";

const Navbar = () => {
  return (
    <nav className="flex justify-between p-5">
      <div className="flex gap-3">
        <Button variant="outline" asChild>
          <Link href="/">Home</Link>
        </Button>
        <ThemeSwitch />
        <LanguageSwitcher />
      </div>
      <ProfileButton />
    </nav>
  );
};

export default Navbar;
