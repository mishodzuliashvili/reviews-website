import { ReviewReturnedType } from "@/contexts/ReviewsContext";
import { useUser } from "@/contexts/UserContext";
import { useState } from "react";

type UseLikesProps = {
    review: ReviewReturnedType;
};

export default function useLikes({ review }: UseLikesProps) {
    const [numberOfLikes, setNumberOfLikes] = useState(review.likes.length);
    const { user } = useUser();
    const [isLikedByUser, setIsLikedByUser] = useState(
        review.likes.some((like) => like.userId === user?.id)
    );
    const [likesLoading, setLikesLoading] = useState(false);
    const [likesError, setLikesError] = useState<Error | null>(null);
    const toggleLike = async () => {
        if (likesLoading) {
            return;
        }
        setLikesLoading(true);
        setLikesError(null);
        setNumberOfLikes((prev) => (isLikedByUser ? prev - 1 : prev + 1));
        const fetchMethod = isLikedByUser ? "DELETE" : "POST";
        setIsLikedByUser((prev) => !prev);
        const res = await fetch(`/api/likes`, {
            method: fetchMethod,
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                reviewId: review.id,
            }),
        });
        const data = await res.json();
        if (!res.ok || data.error) {
            setLikesError(new Error("Could not like review"));
        }
        setLikesLoading(false);
    };
    return {
        numberOfLikes,
        likesLoading,
        likesError,
        toggleLike,
        isLikedByUser,
    };
}
