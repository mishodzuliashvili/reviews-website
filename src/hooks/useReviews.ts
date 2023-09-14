"use client";
import { buildQueryParams } from "@/lib/utils";
import { Prisma, Review } from "@prisma/client";
import { useEffect, useState } from "react";

export type ReviewReturnedType = Prisma.ReviewGetPayload<{
    include: {
        author: true;
        likes: true;
        images: true;
        group: true;
        piece: {
            include: {
                rates: true;
            };
        };
        tags: true;
    };
}>;

export type UseReviewsProps = {
    userId?: string;
    sortBy?: "createdAt" | "grade" | "likes" | "rates";
    tagValues?: string[];
    groupValues?: string[];
    pieceValues?: string[];
    isQuery?: boolean;
    take?: number;
    searchTerm?: string;
};

export default function useReviews({
    userId,
    sortBy,
    tagValues,
    groupValues,
    pieceValues,
    isQuery = true,
    take,
    searchTerm,
}: UseReviewsProps) {
    const [reviews, setReviews] = useState<ReviewReturnedType[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchReviews = async (searchTerm?: string) => {
        setLoading(true);
        setError(null);
        const queryParams = buildQueryParams({
            userId,
            sortBy,
            searchTerm,
        });
        fetch(`/api/reviews/query?${queryParams}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                tagValues,
                groupValues,
                pieceValues,
                take,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.error) {
                    throw new Error(data.error);
                }
                setReviews(data);
                setLoading(false);
            })
            .catch((error) => {
                setError("Could not fetch reviews");
                setLoading(false);
            });
    };

    useEffect(() => {
        if (isQuery) {
            fetchReviews(searchTerm);
        } else {
            setLoading(false);
        }
    }, [userId, sortBy, tagValues, groupValues, pieceValues, searchTerm]);

    const search = (text: string) => {
        fetchReviews(text);
    };

    const addOrUpdateReview = async (newReview: {
        reviewId?: string;
        title: string;
        item: string;
        grade: number;
        text: string;
        group: string;
        tags: string[];
        images: string[];
    }) => {
        setLoading(true);
        setError(null);
        console.log("sss", newReview.tags);
        const response = await fetch("/api/reviews", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newReview),
        });
        const data = await response.json();

        if (!response.ok || data.error) {
            setError("Review could not be added");
        }
        setLoading(false);
        return data.id;
    };

    const deleteReview = async (review: Review) => {
        setLoading(true);
        setError(null);
        const response = await fetch(`/api/reviews/${review.id}`, {
            method: "DELETE",
        });
        if (response.ok) {
            setReviews(reviews.filter((r) => r.id !== review.id));
        } else {
            setError("Review could not be deleted");
        }
        setLoading(false);
    };

    return {
        reviews,
        loading,
        error,
        addOrUpdateReview,
        deleteReview,
        search,
        fetchReviews,
    };
}
