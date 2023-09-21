"use client";
import Review from "./Review";
import { Skeleton } from "@/components/ui/skeleton";
import { RefetchReviewsParams, useReviews } from "@/contexts/ReviewsContext";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

export default function ReviewsList({
    userId,
    groupValues,
    pieceValues,
    sortBy,
    tagValues,
    searchTerm,
}: RefetchReviewsParams) {
    const {
        reviewsError,
        reviewsLoading,
        reviews,
        refetchReviews,
        setReviews,
        resetReviews,
        hasMore,
    } = useReviews();

    const t = useTranslations("ReviewsList");
    useEffect(() => {
        resetReviews();
        refetchReviews({
            userId,
            groupValues,
            pieceValues,
            sortBy,
            tagValues,
            searchTerm,
        });
    }, [userId, groupValues, pieceValues, sortBy, tagValues, searchTerm]);

    if (reviewsError) {
        return <div>error</div>;
    }

    return (
        <div className="flex flex-col gap-3 w-full max-w-2xl mx-auto items-center">
            {!reviewsLoading && reviews?.length === 0 && (
                <div className="">
                    <h2 className="text-xl text-center">{t("no-reviews")}</h2>
                </div>
            )}
            <InfiniteScroll
                className="flex flex-col gap-3 w-full max-w-2xl mx-auto items-center"
                dataLength={reviews?.length || 0} //This is important field to render the next data
                next={() => {
                    refetchReviews({
                        userId,
                        groupValues,
                        pieceValues,
                        sortBy,
                        tagValues,
                        searchTerm,
                    });
                }}
                hasMore={hasMore}
                loader={<h4>Loading...</h4>}
                releaseToRefreshContent={
                    <h3 style={{ textAlign: "center" }}>
                        &#8593; Release to refresh
                    </h3>
                }
            >
                {reviews?.map((review) => (
                    <Review key={review.id} review={review} />
                ))}
            </InfiniteScroll>
        </div>
    );
}
