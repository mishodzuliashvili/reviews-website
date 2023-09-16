"use client";
import React, { useState } from "react";
import { Input } from "../../ui/input";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

export default function SearchInput() {
    const [searchText, setSearchText] = useState("");
    const router = useRouter();
    const t = useTranslations("SearchInput");
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        router.push(`/reviews?searchTerm=${searchText}`);
    };

    return (
        <form onSubmit={handleSubmit}>
            <Input
                placeholder={t("search")}
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
            />
        </form>
    );
}
