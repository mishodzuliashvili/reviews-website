"use client";
import { buildQueryParams } from "@/lib/utils";
import { Prisma } from "@prisma/client";
import { createContext, useContext, useState } from "react";

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

type ReviewsContextType = {
    reviews: ReviewReturnedType[] | null;
    setReviews: React.Dispatch<
        React.SetStateAction<ReviewReturnedType[] | null>
    >;
    reviewsLoading: boolean;
    reviewsError: Error | null;
    refetchReviews: (params: RefetchReviewsParams) => void;
    deleteReview: (reviewId: string) => void;
    addOrUpdateReview: (newReview: {
        reviewId?: string;
        title: string;
        item: string;
        grade: number;
        text: string;
        group: string;
        tags: string[];
        images: string[];
        authorId?: string;
    }) => void;
};

const ReviewsContext = createContext<ReviewsContextType>({
    reviews: null,
    setReviews: () => {},
    reviewsLoading: false,
    reviewsError: null,
    refetchReviews: () => {},
    deleteReview: () => {},
    addOrUpdateReview: () => {},
});

type ReviewsContextProviderProps = {
    children: React.ReactNode;
};

export type RefetchReviewsParams = {
    userId?: string;
    sortBy?: "createdAt" | "grade" | "likes" | "rates";
    tagValues?: string[];
    groupValues?: string[];
    pieceValues?: string[];
    take?: number;
    searchTerm?: string;
};

export default function ReviewsContextProvider({
    children,
}: ReviewsContextProviderProps) {
    const [reviews, setReviews] = useState<ReviewReturnedType[] | null>(null);
    const [reviewsLoading, setReviewsLoading] = useState(false);
    const [reviewsError, setReviewsError] = useState<Error | null>(null);

    const refetchReviews = ({
        userId,
        sortBy,
        tagValues,
        groupValues,
        pieceValues,
        take,
        searchTerm,
    }: RefetchReviewsParams) => {
        setReviewsLoading(true);
        setReviewsError(null);
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
                setReviewsLoading(false);
            })
            .catch((error) => {
                setReviewsError(new Error("Could not fetch reviews"));
                setReviewsLoading(false);
            });
    };

    const deleteReview = async (reviewId: string) => {
        setReviewsLoading(true);
        setReviewsError(null);
        const response = await fetch(`/api/reviews/${reviewId}`, {
            method: "DELETE",
        });
        const data = await response.json();

        if (!response.ok || data.error) {
            setReviewsError(new Error("Review could not be deleted"));
        } else {
            setReviews((prev) => prev && prev.filter((r) => r.id !== reviewId));
        }
        setReviewsLoading(false);
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
        authorId?: string;
    }) => {
        setReviewsLoading(true);
        setReviewsError(null);
        const response = await fetch("/api/reviews", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newReview),
        });
        const data = await response.json();

        if (!response.ok || data.error) {
            setReviewsError(new Error("Review could not be added"));
        }
        setReviewsLoading(false);
    };

    return (
        <ReviewsContext.Provider
            value={{
                reviews,
                setReviews,
                reviewsLoading: reviewsLoading,
                reviewsError: reviewsError,
                refetchReviews,
                deleteReview,
                addOrUpdateReview,
            }}
        >
            {children}
        </ReviewsContext.Provider>
    );
}

export function useReviews() {
    const context = useContext(ReviewsContext);
    if (!context) {
        throw new Error(
            "useReviewsContext must be used within a ReviewsContextProvider"
        );
    }
    return context;
}
