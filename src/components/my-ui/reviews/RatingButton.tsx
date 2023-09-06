"use client";
import { Rate } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useState } from "react";
import StarRatings from "react-star-ratings";

type RatingButtonProps = {
    reviewId: string;
    rates: Rate[];
    userId: string;
};

export default function RatingButton({
    reviewId,
    rates,
    userId,
}: RatingButtonProps) {
    const [myRates, setMyRates] = useState(rates);
    const { data, status } = useSession();
    const [rating, setRating] = useState(() => {
        const rate = rates.find((rate) => rate.userId === userId);
        if (!rate) return 0;
        return rate.value;
    });
    const [isRating, setIsRating] = useState(false);

    const handleRating = async (rate: number) => {
        if (isRating || status === "unauthenticated" || status === "loading")
            return;
        setIsRating(true);
        setRating(rate);
        setMyRates((prev) => {
            const newRates = [...prev];
            const index = newRates.findIndex((rate) => rate.userId === userId);
            if (index === -1) {
                newRates.push({ userId, value: rate, reviewId });
            } else {
                newRates[index].value = rate;
            }
            return newRates;
        });
        const res = await fetch(`/api/ratings`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                reviewId,
                value: rate,
            }),
        });

        if (!res.ok) {
            throw new Error("Something went wrong");
        }
        setIsRating(false);
    };
    return (
        <div
            className={
                (isRating ? "opacity-50 " : "") + "flex items-center gap-3"
            }
        >
            <span className="text-xl font-sans text-[orange] font-bold">
                {(
                    myRates.reduce((acc, rate) => acc + rate.value, 0) /
                    myRates.length
                ).toFixed(1)}
            </span>
            <StarRatings
                changeRating={handleRating}
                rating={rating}
                starRatedColor="orange"
                starHoverColor="orange"
                starDimension="28px"
                starSpacing="5px"
            />
        </div>
    );
}
