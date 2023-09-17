"use client";
import { ReviewReturnedType, useReviews } from "@/contexts/ReviewsContext";
import { useUser } from "@/contexts/UserContext";
import useRates from "@/hooks/useRates";
import StarRatings from "react-star-ratings";

type RatingButtonProps = {
    review: ReviewReturnedType;
};
export default function RatingButton({ review }: RatingButtonProps) {
    const { ratesLoading, changeRateByPieceValue, userRating } = useRates({
        review,
    });
    const { user } = useUser();

    return (
        <div
            className={
                (ratesLoading ? "opacity-50 " : "") + "flex items-center gap-3"
            }
        >
            <StarRatings
                changeRating={(newRating) => {
                    if (user && !ratesLoading) {
                        changeRateByPieceValue(
                            review.piece?.value as string,
                            newRating
                        );
                    }
                }}
                rating={userRating}
                starRatedColor="orange"
                starHoverColor="orange"
                starDimension="28px"
                starSpacing="5px"
            />
        </div>
    );
}
