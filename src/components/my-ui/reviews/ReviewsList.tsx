"use client";
import useReviews, { UseReviewsProps } from "@/hooks/useReviews";
import Review from "./Review";
import MainLoader from "../main/MainLoader";
import { Skeleton } from "@/components/ui/skeleton";
import { useTranslations } from "next-intl";

type ReviewsListProps = UseReviewsProps;

export default function ReviewsList({
    userId,
    groupValues,
    pieceValues,
    sortBy,
    tagValues,
    take,
    searchTerm,
}: ReviewsListProps) {
    const { loading, reviews, deleteReview, error, changeRateByPiece } =
        useReviews({
            userId,
            groupValues,
            pieceValues,
            sortBy,
            tagValues,
            take,
            searchTerm,
        });
    const t = useTranslations("ReviewsList");
    return (
        <div className="flex flex-col gap-3">
            {loading &&
                Array(10)
                    .fill(0)
                    .map((_, i) => (
                        <div
                            key={i}
                            className="flex flex-col gap-3 relative items-start"
                        >
                            <Skeleton className="h-52 w-full rounded-lg" />
                            <Skeleton className="h-20 w-full rounded-lg" />
                        </div>
                    ))}
            {!loading && reviews.length === 0 && (
                <div>
                    <h2 className="text-xl">{t("no-reviews")}</h2>
                </div>
            )}
            {reviews?.map((review) => (
                <Review
                    key={review.id}
                    review={review}
                    onDelete={() => {
                        deleteReview(review);
                    }}
                    changeRateByPiece={changeRateByPiece}
                />
            ))}
        </div>
    );
}
