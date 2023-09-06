import { subscribeAbly } from "@/lib/ably";
import { Comment } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

type OptimisiticComment = Comment & { pending: boolean };

type useCommentsProps = {
    reviewId: string;
};

export default function useComments({ reviewId }: useCommentsProps) {
    const [comments, setComments] = useState<OptimisiticComment[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);
    const { data, status } = useSession();

    const createOptimisticComment = (text: string) => {
        return {
            text,
            authorId: data?.user.id as string,
            reviewId,
            createdAt: new Date(),
            id: crypto.randomUUID(),
            pending: true,
        } as OptimisiticComment;
    };

    const sendComment = async (comment: OptimisiticComment) => {
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
        console.log(res);
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
        if (status !== "loading") {
            subscribeAbly(reviewId, (comment: Comment) => {
                if (comment.authorId === data?.user.id) return;
                setComments((prev) => [...prev, comment as OptimisiticComment]);
            });
        }
    }, [status]);

    return { comments, addComment, loading, error } as const;
}
