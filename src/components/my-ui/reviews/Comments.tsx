"use client";

import { useEffect, useState } from "react";
import { Comment } from "@prisma/client";
import { subscribeAbly } from "@/lib/ably";
export default function Comments({ reviewId }: { reviewId: string }) {
    const [comments, setComments] = useState<Comment[]>([]);

    useEffect(() => {
        subscribeAbly(reviewId, (comment: Comment) => {
            setComments((prev) => [...prev, comment]);
        });
    }, []);

    return (
        <div>
            {comments?.map((comment) => (
                <div key={comment.id}>
                    <p>{comment.text}</p>
                </div>
            ))}
        </div>
    );
}
