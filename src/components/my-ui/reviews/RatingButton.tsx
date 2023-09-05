"use client";
import { useState } from "react";
import StarRatings from "react-star-ratings";
export default function RatingButton() {
    const [rating, setRating] = useState(0);
    const [isRating, setIsRating] = useState(false);

    const handleRating = async (rate: number) => {
        if (isRating) return;
        setIsRating(true);
        setRating(rate);
        await new Promise((resolve) => setTimeout(resolve, 3000));
        setIsRating(false);
    };
    return (
        <div className={isRating ? "opacity-50" : ""}>
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
