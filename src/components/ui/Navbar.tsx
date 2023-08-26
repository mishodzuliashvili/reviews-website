"use client";
import ThemeSwitch from "../mainSwitchs/ThemeSwitch";
import LanguageSwitcher from "../mainSwitchs/LanguageSwitch";

const Navbar = () => {
  return (
    <nav>
      <ThemeSwitch />
      <LanguageSwitcher />
    </nav>
  );
};

export default Navbar;
