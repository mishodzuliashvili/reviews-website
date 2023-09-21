"use client";
import { Button } from "@/components/ui/button";
import { ReviewReturnedType } from "@/contexts/ReviewsContext";
import { useUser } from "@/contexts/UserContext";
import useLikes from "@/hooks/useLikes";
import { AiOutlineLike } from "react-icons/ai";
type LikeButtonProps = {
    review: ReviewReturnedType;
};

export default function LikeButton({ review }: LikeButtonProps) {
    const {
        likesError,
        isLikedByUser,
        toggleLike,
        numberOfLikes,
        likesLoading,
    } = useLikes({
        review,
    });
    const { user } = useUser();
    if (likesError) {
        return <div>error</div>;
    }
    return (
        <Button
            disabled={likesLoading || !user}
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
