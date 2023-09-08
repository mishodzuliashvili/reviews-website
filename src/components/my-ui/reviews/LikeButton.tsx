"use client";
import { Button } from "@/components/ui/button";
import useLikes from "@/hooks/useLikes";
import { Like } from "@prisma/client";
import { AiOutlineLike } from "react-icons/ai";
type LikeButtonProps = {
    reviewId: string;
    likes: Like[];
    disabled?: boolean;
    userId?: string;
};

export default function LikeButton({
    reviewId,
    likes,
    disabled,
    userId,
}: LikeButtonProps) {
    const { loading, isLikedByUser, toggleLike, numberOfLikes } = useLikes({
        likes: likes,
        reviewId,
        userId,
    });

    return (
        <Button
            disabled={loading || disabled}
            className="disabled:opacity-100"
            variant={isLikedByUser ? "destructive" : "outline"}
            onClick={toggleLike}
        >
            <div className="flex gap-2 items-center ">
                <AiOutlineLike />
                <span>{numberOfLikes}</span>
            </div>
        </Button>
    );
}
