"use client";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { RiArrowUpDoubleFill } from "react-icons/ri";
type LikeButtonProps = {
    numberOfLikes: number;
    reviewId: string;
    isLiked: boolean;
};

export default function LikeButton({
    numberOfLikes,
    reviewId,
    isLiked,
}: LikeButtonProps) {
    const [likes, setLikes] = useState<number>(numberOfLikes);
    const [liked, setLiked] = useState<boolean>(isLiked);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { data, status } = useSession();
    const handleClick = async () => {
        if (isLoading) {
            return;
        }
        setIsLoading(true);
        setLikes((prev) => (liked ? prev - 1 : prev + 1));
        const fetchMethod = liked ? "DELETE" : "POST";
        setLiked((prev) => !prev);
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
            throw new Error("Something went wrong");
        }
        setIsLoading(false);
    };
    return (
        <Button
            disabled={isLoading || status === "loading" || !data}
            className="px-4 py-8"
            variant={liked ? "destructive" : "outline"}
            onClick={handleClick}
        >
            <div className="flex flex-col gap-2 items-center ">
                <RiArrowUpDoubleFill />
                <span>{likes}</span>
            </div>
        </Button>
    );
}
