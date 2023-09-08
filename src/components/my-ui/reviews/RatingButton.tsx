"use client";
import useRates from "@/hooks/useRates";
import { Rate } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useState } from "react";
import StarRatings from "react-star-ratings";

type RatingButtonProps = {
    reviewId: string;
    rates: Rate[];
    disabled?: boolean;
    userId?: string;
};

export default function RatingButton({
    reviewId,
    rates,
    userId,
}: RatingButtonProps) {
    const { loading, sumOfRates, rateReview, userRating } = useRates({
        rates,
        reviewId,
        userId,
    });

    return (
        <div
            className={
                (loading ? "opacity-50 " : "") + "flex items-center gap-3"
            }
        >
            <span className="text-xl font-sans text-[orange] font-bold">
                {sumOfRates.toFixed(1)}
            </span>
            <StarRatings
                changeRating={(newRating) => rateReview(newRating)}
                rating={userRating}
                starRatedColor="orange"
                starHoverColor="orange"
                starDimension="28px"
                starSpacing="5px"
            />
        </div>
    );
}
