"use client";
import React, { useState, useTransition } from "react";
import { Input } from "../ui/input";
import { redirect, usePathname, useRouter } from "next/navigation";
import { revalidatePath } from "next/cache";
import MainLoader from "./MainLoader";
import useReviews from "@/hooks/useReviews";

export default function SearchInput() {
    const [searchText, setSearchText] = useState("");
    const { search, loading } = useReviews({});

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        search(searchText);
    };

    return (
        <form onSubmit={handleSubmit}>
            <Input
                placeholder="Enter searching text"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
            />
            {loading && <MainLoader />}
        </form>
    );
}
