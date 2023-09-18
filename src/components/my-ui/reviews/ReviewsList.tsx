"use client";
import Review from "./Review";
import { Skeleton } from "@/components/ui/skeleton";
import { RefetchReviewsParams, useReviews } from "@/contexts/ReviewsContext";
import { useTranslations } from "next-intl";
import { useEffect } from "react";

export default function ReviewsList({
    userId,
    groupValues,
    pieceValues,
    sortBy,
    tagValues,
    take,
    searchTerm,
}: RefetchReviewsParams) {
    const { reviewsError, reviewsLoading, reviews, refetchReviews } =
        useReviews();
    const t = useTranslations("ReviewsList");
    useEffect(() => {
        refetchReviews({
            userId,
            groupValues,
            pieceValues,
            sortBy,
            tagValues,
            take,
            searchTerm,
        });
    }, [userId, groupValues, pieceValues, sortBy, tagValues, take, searchTerm]);
    return (
        <div className="flex flex-col gap-3 w-full max-w-2xl mx-auto items-center">
            {reviewsLoading &&
                Array(10)
                    .fill(0)
                    .map((_, i) => (
                        <div
                            key={i}
                            className="flex flex-col gap-3 relative items-start w-full"
                        >
                            <Skeleton className="h-52 w-full rounded-lg" />
                            <Skeleton className="h-20 w-full rounded-lg" />
                        </div>
                    ))}
            {!reviewsLoading && reviews?.length === 0 && (
                <div className="">
                    <h2 className="text-xl text-center">{t("no-reviews")}</h2>
                </div>
            )}
            {!reviewsLoading &&
                reviews?.map((review) => (
                    <Review key={review.id} review={review} />
                ))}
        </div>
    );
}
