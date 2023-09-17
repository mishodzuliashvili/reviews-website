import ReviewHeader from "./ReviewHeader";
import ReviewFooter from "./ReviewFooter";
import ReviewBody from "./ReviewBody";
import { ReviewReturnedType } from "@/contexts/ReviewsContext";
type ReviewProps = {
    review: ReviewReturnedType;
};

export default function Review({ review }: ReviewProps) {
    return (
        <article className="border max-w-2xl rounded-lg">
            <ReviewHeader review={review} />
            <ReviewBody review={review} />
            <ReviewFooter review={review} />
        </article>
    );
}
