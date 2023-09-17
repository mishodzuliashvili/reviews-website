import RatingButton from "./RatingButton";
import CommentsButton from "./CommentsButton";
import { ReviewReturnedType } from "@/contexts/ReviewsContext";
import Comments from "./Comments";
import { useState } from "react";
import LikeButton from "./LikeButton";

type ReviewFooterProps = {
    review: ReviewReturnedType;
};

export default function ReviewFooter({ review }: ReviewFooterProps) {
    const [isReadMode, setIsReadMode] = useState(false);
    return (
        <footer className="p-5 flex flex-col gap-5">
            <div>
                <RatingButton review={review} />
            </div>
            <div className="flex items-center gap-3">
                <LikeButton review={review} />
                <CommentsButton setIsReadMode={setIsReadMode} />
            </div>
            {isReadMode && <Comments review={review} />}
        </footer>
    );
}
