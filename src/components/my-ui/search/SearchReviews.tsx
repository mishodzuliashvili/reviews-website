"use client";
import { useState } from "react";
import { Input } from "../../ui/input";
import useReviews from "@/hooks/useReviews";
import Review from "../reviews/Review";
import MainLoader from "../main/MainLoader";

export default function SearchReviews() {
    const [searchText, setSearchText] = useState("");
    const { reviews, loading, search } = useReviews({ isQuery: false });

    if (loading) return <MainLoader />;

    return (
        <div>
            <form onSubmit={() => search(searchText)}>
                <Input
                    onChange={(e) => setSearchText(e.target.value)}
                    placeholder="Search"
                />
            </form>
            <div className="flex flex-col gap-3">
                {/* {reviews.map((review) => (
                    <Review key={review.id} review={review} />
                ))} */}
            </div>
        </div>
    );
}
