"use client";
import ThemeSwitch from "./ThemeSwitch";
import LanguageSwitcher from "./LanguageSwitcher";

const Navbar = ({ local }: { local: string }) => {
  return (
    <div>
      <ThemeSwitch />
      <LanguageSwitcher local={local} />
    </div>
  );
};

export default Navbar;
