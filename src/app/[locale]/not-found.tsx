"use client";

import { useTranslations } from "next-intl";
// import PageLayout from "components/PageLayout";

export default function NotFoundPage() {
  const t = useTranslations("NotFoundPage");

  return (
    // <PageLayout title={t('title')}>
    //   <p className="max-w-[460px]">{t('description')}</p>
    // </PageLayout>
    <div>
      <h1>404 - Page Not Found</h1>
    </div>
  );
}
