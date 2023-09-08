import { Like } from "@prisma/client";
import { useState } from "react";

type UseLikesProps = {
    reviewId: string;
    likes: Like[];
    userId?: string;
};

export default function useLikes({ reviewId, likes, userId }: UseLikesProps) {
    const [numberOfLikes, setNumberOfLikes] = useState(likes.length);
    const [isLikedByUser, setIsLikedByUser] = useState(
        likes.some((like) => like.userId === userId)
    );
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const toggleLike = async () => {
        if (loading) {
            return;
        }
        setLoading(true);
        setNumberOfLikes((prev) => (isLikedByUser ? prev - 1 : prev + 1));
        const fetchMethod = isLikedByUser ? "DELETE" : "POST";
        setIsLikedByUser((prev) => !prev);
        const res = await fetch(`/api/likes`, {
            method: fetchMethod,
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                reviewId,
            }),
        });

        if (!res.ok) {
            setError(new Error("Could not like review"));
        }
        setLoading(false);
    };
    return { numberOfLikes, loading, error, toggleLike, isLikedByUser };
}
