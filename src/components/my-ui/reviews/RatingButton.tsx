"use client";
import useRates from "@/hooks/useRates";
import { Rate } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useState } from "react";
import StarRatings from "react-star-ratings";

type RatingButtonProps = {
    rates: Rate[];
    disabled?: boolean;
    userId?: string;
    pieceValue: string;
};

export default function RatingButton({
    rates,
    userId,
    pieceValue,
}: RatingButtonProps) {
    const { loading, sumOfRates, rateReview, userRating } = useRates({
        rates,
        userId,
        pieceValue,
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
                changeRating={(newRating) => {
                    if (userId) {
                        rateReview(newRating);
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
