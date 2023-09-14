"use client";
import React, { useState } from "react";
import { Input } from "../../ui/input";
import { useRouter } from "next/navigation";

export default function SearchInput() {
    const [searchText, setSearchText] = useState("");
    const router = useRouter();
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        router.push(`/reviews?searchTerm=${searchText}`);
    };

    return (
        <form onSubmit={handleSubmit}>
            <Input
                placeholder="Enter searching text"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
            />
        </form>
    );
}
