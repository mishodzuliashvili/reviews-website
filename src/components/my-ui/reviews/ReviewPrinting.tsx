"use client";
import React from "react";
import ReviewTextSanitized from "./ReviewTextSanitized";
import { ReviewReturnedType } from "@/contexts/ReviewsContext";
import { calculateAvarageRate } from "@/lib/utils";
import { useTranslations } from "next-intl";

const ReviewPrinting = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement> & {
        review: ReviewReturnedType;
    }
>(({ review, ...props }, ref) => {
    const t = useTranslations("ReviewPrinting");
    return (
        <div
            ref={ref}
            {...props}
            className="bg-white p-8 w-full review-printing"
        >
            <h1 className="text-2xl font-bold mb-4">{review.title}</h1>
            <h3 className="text-lg mb-2">{review.piece?.value}</h3>
            <h3 className="text-lg mb-2">{review.author.name}</h3>
            <h3 className="text-lg mb-2">
                {review.createdAt.toLocaleString()}
            </h3>
            <div className="mb-4">
                {review.images?.map((img) => (
                    <img
                        key={img.id}
                        src={img.url}
                        alt="review image"
                        className="max-w-full mb-2"
                    />
                ))}
            </div>
            <h4 className="text-lg font-semibold mb-2">{review.group.value}</h4>
            <h4 className="text-lg font-semibold mb-2">
                {review.piece?.value}
            </h4>

            <h4 className="text-lg font-semibold mb-2">
                {t("grade")}: {review.grade}
            </h4>
            <div className="mb-4">
                {review.tags.map((tag) => (
                    <span
                        key={tag.value}
                        className="bg-gray-200 px-2 py-1 rounded-full text-sm mr-2"
                    >
                        {tag.value}
                    </span>
                ))}
            </div>
            <div className="flex justify-between mb-4">
                <div className="text-lg font-semibold">
                    {t("likes")}: {review.likes.length}
                </div>
                <div className="text-lg font-semibold">
                    {t("avarage-rate")}:{" "}
                    {calculateAvarageRate(review.piece?.rates || [])}
                </div>
            </div>
            <div className="text-lg">
                <ReviewTextSanitized review={review} />
            </div>
        </div>
    );
});

ReviewPrinting.displayName = "ReviewPrinting";

export default ReviewPrinting;
