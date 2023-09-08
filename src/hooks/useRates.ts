import { Like, Rate } from "@prisma/client";
import { useState } from "react";

type UseRatesProps = {
    reviewId: string;
    rates: Rate[];
    userId?: string;
};

export default function useRates({
    reviewId,
    rates: _rates,
    userId,
}: UseRatesProps) {
    const [rates, setRates] = useState(_rates);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const rateReview = async (rateValue: number) => {
        if (loading) {
            return;
        }
        setLoading(true);
        setError(null);
        setRates((prev) => {
            const newRates = [...prev];
            const index = newRates.findIndex((rate) => rate.userId === userId);
            if (index === -1) {
                newRates.push({
                    userId: userId as string,
                    value: rateValue,
                    reviewId,
                });
            } else {
                newRates[index].value = rateValue;
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
                value: rateValue,
            }),
        });

        if (!res.ok) {
            setError(new Error("Could not rate review"));
        }
        setLoading(false);
    };

    const sumOfRates =
        rates.reduce((acc, curr) => acc + curr.value, 0) / rates.length;
    const userRating = rates.find((rate) => rate.userId === userId)?.value || 0;
    return { sumOfRates, rateReview, loading, error, userRating };
}
