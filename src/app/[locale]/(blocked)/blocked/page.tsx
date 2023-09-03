"use client";

import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";
import { useTranslations } from "next-intl";

export default function Blocked() {
  const t = useTranslations("Blocked");
  return (
    <div className="p-5 flex flex-col gap-4 items-center text-center">
      <h1 className="">{t("description")}</h1>
      <Button
        onClick={() => {
          signOut();
        }}
      >
        {t("signout")}
      </Button>
    </div>
  );
}
