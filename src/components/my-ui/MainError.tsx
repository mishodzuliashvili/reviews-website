import { useTranslations } from "next-intl";
import React from "react";

const MainError = ({ error }: { error: Error }) => {
  const t = useTranslations("MainError");
  return (
    <div className="flex items-center justify-center h-screen">
      <h2 className="text-center text-2xl font-semibold">
        {t("error")}: {t(error.message)}
      </h2>
    </div>
  );
};

export default MainError;
