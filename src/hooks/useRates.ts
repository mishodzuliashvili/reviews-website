import { Like, Rate } from "@prisma/client";
import { useState } from "react";

type UseRatesProps = {
    rates: Rate[];
    userId?: string;
    pieceValue: string;
};

export default function useRates({
    rates: _rates,
    userId,
    pieceValue,
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
                    pieceValue,
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
                pieceValue: pieceValue,
                value: rateValue,
            }),
        });

        if (!res.ok) {
            setError(new Error("Could not rate review"));
        }
        setLoading(false);
    };

    const sumOfRates =
        rates.length > 0
            ? rates.reduce((acc, curr) => acc + curr.value, 0) / rates.length
            : 0;
    const userRating = rates.find((rate) => rate.userId === userId)?.value || 0;
    return { sumOfRates, rateReview, loading, error, userRating };
}
