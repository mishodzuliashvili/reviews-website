"use client";
import { Button } from "@/components/ui/button";
import useRates from "@/hooks/useRates";
import { Rate } from "@prisma/client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import StarRatings from "react-star-ratings";

type RatingButtonProps = {
    rates: Rate[];
    disabled?: boolean;
    userId?: string;
    pieceValue: string;
    changeRateByPiece: (pieceValue: string, rate: number) => void;
};

export default function RatingButton({
    rates,
    userId,
    pieceValue,
    changeRateByPiece,
}: RatingButtonProps) {
    const { loading, sumOfRates, rateReview, userRating } = useRates({
        rates,
        userId,
        pieceValue,
    });
    const router = useRouter();
    return (
        <div
            className={
                (loading ? "opacity-50 " : "") + "flex items-center gap-3"
            }
        >
            <Button variant="outline" disabled={loading} asChild>
                <Link href={`/reviews?pieceValue=${pieceValue}`}>
                    {pieceValue}
                </Link>
            </Button>
            <span className="text-xl font-sans text-[orange] font-bold">
                {sumOfRates.toFixed(1)}
            </span>
            <StarRatings
                changeRating={(newRating) => {
                    if (userId) {
                        rateReview(newRating);
                        changeRateByPiece(pieceValue, newRating);
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
