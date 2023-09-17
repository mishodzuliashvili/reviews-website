"use client";
import React, { useState } from "react";
import { Input } from "../../ui/input";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";

export default function SearchInput() {
    const [searchText, setSearchText] = useState("");
    const router = useRouter();
    const t = useTranslations("SearchInput");
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        router.push(`/reviews?searchTerm=${searchText}`);
    };

    return (
        <form onSubmit={handleSubmit} className="flex gap-2">
            <Input
                className="max-w-xs"
                placeholder={t("search")}
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
            />
            <Button className="mr-3" type="submit">
                {t("submit")}
            </Button>
        </form>
    );
}
