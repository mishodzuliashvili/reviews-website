import { subscribeAbly } from "@/lib/ably";
import { createCommentSchema } from "@/lib/validations/comments";
import { Comment } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import useUser from "./useUser";

type OptimisiticComment = Comment & { pending: boolean };

type useCommentsProps = {
    reviewId: string;
};

export default function useComments({ reviewId }: useCommentsProps) {
    const [comments, setComments] = useState<OptimisiticComment[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);
    const { user, isLoading: userLoading } = useUser();

    const createOptimisticComment = (text: string) => {
        return {
            text,
            authorId: user?.id as string,
            reviewId,
            createdAt: new Date(),
            id: crypto.randomUUID(),
            pending: true,
        } as OptimisiticComment;
    };

    const sendComment = async (comment: OptimisiticComment) => {
        try {
            createCommentSchema.parse({ text: comment.text });
        } catch (e) {
            setError(new Error("Comment is not valid"));
        }
        const res = await fetch(`/api/comments`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                reviewId,
                text: comment.text,
            }),
        });
        if (!res.ok) {
            setError(new Error("Something went wrong"));
        }
        const { commentId } = await res.json();
        return commentId;
    };

    const addComment = async (text: string) => {
        const comment = createOptimisticComment(text);
        setComments((prev) => [...prev, comment]);
        await sendComment(comment);
        setComments((prev) => {
            const index = prev.findIndex((c) => c.id === comment.id);
            const newComments = [...prev];
            newComments[index].pending = false;
            return newComments;
        });
    };
    const fetchComments = async () => {
        setLoading(true);
        const res = await fetch(`/api/comments/review/${reviewId}`);
        if (!res.ok) {
            setError(new Error("Something went wrong"));
            setLoading(false);
            return;
        }
        const comments = await res.json();
        setComments(comments);
        setLoading(false);
    };

    useEffect(() => {
        fetchComments();
    }, []);

    useEffect(() => {
        if (!userLoading) {
            subscribeAbly(reviewId, (comment: Comment) => {
                if (comment.authorId === user?.id) return;
                setComments((prev) => [...prev, comment as OptimisiticComment]);
            });
        }
    }, [userLoading]);

    return { comments, addComment, loading, error } as const;
}
