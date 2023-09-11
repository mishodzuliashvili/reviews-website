"use client";

import { useTranslations } from "next-intl";
import Error from "next/error";

export default function NotFoundPage() {
    return <Error statusCode={404} />;
}
