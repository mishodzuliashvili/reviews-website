"use client";
import useReviews, { UseReviewsProps } from "@/hooks/useReviews";
import Review from "./Review";
import MainLoader from "../MainLoader";

type ReviewsListProps = UseReviewsProps;

export default function ReviewsList({
    userId,
    groupValues,
    pieceValues,
    sortBy,
    tagValues,
    take,
}: ReviewsListProps) {
    const { loading, reviews, deleteReview } = useReviews({
        userId,
        groupValues,
        pieceValues,
        sortBy,
        tagValues,
        take,
    });
    return (
        <div className="flex flex-col gap-3">
            {loading && <MainLoader />}
            {reviews.map((review) => (
                <Review
                    key={review.id}
                    review={review}
                    onDelete={() => {
                        deleteReview(review);
                    }}
                />
            ))}
        </div>
    );
}
