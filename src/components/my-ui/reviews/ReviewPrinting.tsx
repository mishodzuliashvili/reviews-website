import { ReviewReturnedType } from "@/hooks/useReviews";
import React from "react";
import ReviewTextSanitized from "./ReviewTextSanitized";

const ReviewPrinting = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement> & {
        review: ReviewReturnedType;
    }
>(({ review, ...props }, ref) => {
    return (
        <div className="review-printing" ref={ref} {...props}>
            <h1>{review.title}</h1>
            <h3>{review.piece?.value}</h3>
            <h3>{review.author.name}</h3>
            <h3>{review.createdAt.toLocaleString()}</h3>
            <ReviewTextSanitized text={review.text} />
            <h3>
                {review.images.map((img) => (
                    <img key={img.id} src={img.url} alt="review image" />
                ))}
            </h3>
            <h4> {review.group.value}</h4>
            <h4> {review.grade}</h4>
            <h4> {review.tags.map((tag) => tag.value)}</h4>
            <h3>{review.likes.length}</h3>
            {/* <h3>{review.rates.reduce((acc, rate) => acc + rate.value, 0)}</h3> */}
        </div>
    );
});

ReviewPrinting.displayName = "ReviewPrinting";

export default ReviewPrinting;
