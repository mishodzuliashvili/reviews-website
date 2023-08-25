"use client";
import { useTranslations } from "next-intl";

const Header = ({ email }: { email: string }) => {
  const t = useTranslations("Index");
  return (
    <div>
      {t("title")} {email}
    </div>
  );
};

export default Header;
