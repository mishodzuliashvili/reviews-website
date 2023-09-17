import { ReviewReturnedType, useReviews } from "@/contexts/ReviewsContext";
import { useUser } from "@/contexts/UserContext";
import { calculateAvarageRate } from "@/lib/utils";
import { Rate } from "@prisma/client";
import { useState } from "react";

type UseRatesProps = {
    review: ReviewReturnedType;
};

export default function useRates({ review }: UseRatesProps) {
    const [ratesLoading, setRatesLoading] = useState<boolean>(false);
    const [ratesError, setRatesError] = useState<Error | null>(null);
    const { setReviews } = useReviews();
    const { user } = useUser();

    const changeRateByPieceValue = async (
        pieceValue: string,
        value: number
    ) => {
        setRatesLoading(true);
        setRatesError(null);
        setReviews(
            (prev) =>
                prev &&
                prev.map((review) => {
                    if (review.piece?.value !== pieceValue) return review;
                    const index: number = !review.piece?.rates
                        ? -1
                        : review.piece.rates.findIndex((rate) => {
                              return rate.userId === user?.id;
                          });
                    if (index === -1) {
                        review.piece?.rates?.push({
                            userId: user?.id as string,
                            value,
                            pieceValue,
                        });
                    } else if (review.piece?.rates) {
                        review.piece.rates[index].value = value;
                    }
                    return review;
                })
        );
        const result = await fetch(`/api/ratings`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                pieceValue: pieceValue,
                value: value,
            }),
        });
        const data = await result.json();
        if (!result.ok || data.error) {
            setRatesError(new Error("Could not rate"));
        }
        setRatesLoading(false);
    };

    const rates: Rate[] = review?.piece?.rates || [];
    const avarageRate = calculateAvarageRate(rates);
    const userRating =
        rates.find((rate) => rate.userId === user?.id)?.value || 0;

    return {
        ratesLoading,
        ratesError,
        changeRateByPieceValue,
        avarageRate,
        userRating,
    };
}
