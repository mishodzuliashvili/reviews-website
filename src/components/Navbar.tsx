"use client";
import ThemeSwitch from "./ThemeSwitch";
import LanguageSwitcher from "./LanguageSwitcher";

const Navbar = ({ lang }: { lang: string }) => {
  return (
    <div>
      <ThemeSwitch />
      <LanguageSwitcher lang={lang} />
    </div>
  );
};

export default Navbar;
