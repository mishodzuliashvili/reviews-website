import { ReviewReturnedType } from "@/contexts/ReviewsContext";
import { useUser } from "@/contexts/UserContext";
import { subscribeAbly } from "@/lib/ably";
import { createCommentSchema } from "@/lib/validations/comments";
import { Comment } from "@prisma/client";
import { User } from "next-auth";
import { useEffect, useState } from "react";

type OptimisiticComment = Comment & { pending: boolean; author: User };

type useCommentsProps = {
    review: ReviewReturnedType;
};

export default function useComments({ review }: useCommentsProps) {
    const [comments, setComments] = useState<OptimisiticComment[]>([]);
    const [commentsLoading, setCommentsLoading] = useState(false);
    const [commentsError, setCommentsError] = useState<Error | null>(null);
    const { user } = useUser();
    const createOptimisticComment = (text: string) => {
        return {
            text,
            authorId: user?.id as string,
            reviewId: review.id,
            createdAt: new Date(),
            id: crypto.randomUUID(),
            pending: true,
            author: user,
        } as OptimisiticComment;
    };

    const sendComment = async (comment: OptimisiticComment) => {
        try {
            createCommentSchema.parse({ text: comment.text });
        } catch (e) {
            setCommentsError(new Error("Comment is not valid"));
        }
        const res = await fetch(`/api/comments`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                reviewId: review.id,
                text: comment.text,
            }),
        });
        const data = await res.json();
        if (!res.ok || data.error) {
            setCommentsError(new Error("Something went wrong"));
        }
        return data;
    };

    const addComment = async (text: string) => {
        const comment = createOptimisticComment(text);
        setComments((prev) => [...prev, comment]);
        const data = await sendComment(comment);
        setComments((prev) => {
            const index = prev.findIndex((c) => c.id === comment.id);
            const newComments = [...prev];
            newComments[index].pending = false;
            newComments[index].id = data?.commentId;
            return newComments;
        });
    };

    const fetchComments = async () => {
        setCommentsLoading(true);
        const res = await fetch(`/api/comments/review/${review.id}`);
        const comments = await res.json();
        if (!res.ok || comments.error) {
            setCommentsError(new Error("Something went wrong"));
        } else {
            setComments(comments);
        }
        setCommentsLoading(false);
    };

    const deleteComment = async (commentId: string) => {
        setComments((prev) => prev.filter((c) => c.id !== commentId));
        const res = await fetch(`/api/comments/${commentId}`, {
            method: "DELETE",
        });
        const data = await res.json();
        if (!res.ok || data.error) {
            setCommentsError(new Error("Something went wrong"));
        }
    };

    useEffect(() => {
        fetchComments();
        subscribeAbly(review.id, (comment: Comment) => {
            if (comment.authorId === user?.id) return;
            setComments((prev) => [...prev, comment as OptimisiticComment]);
        });
    }, []);

    return {
        comments,
        addComment,
        deleteComment,
        commentsLoading,
        commentsError,
    } as const;
}
