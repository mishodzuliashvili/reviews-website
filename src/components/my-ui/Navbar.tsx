"use client";
import ThemeSwitch from "../mainSwitchs/ThemeSwitch";
import LanguageSwitcher from "../mainSwitchs/LanguageSwitch";
import ProfileButton from "./ProfileButton";

const Navbar = () => {
  return (
    <nav className="flex justify-between p-5">
      <div className="flex gap-3">
        <ThemeSwitch />
        <LanguageSwitcher />
      </div>
      <ProfileButton />
    </nav>
  );
};

export default Navbar;
