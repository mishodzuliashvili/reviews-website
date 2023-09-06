"use client";

import { useEffect, useState } from "react";
import { Comment } from "@prisma/client";
import { subscribeAbly } from "@/lib/ably";
import { useSession } from "next-auth/react";
export default function Comments({ reviewId }: { reviewId: string }) {
    const [comments, setComments] = useState<Comment[]>([]);
    const [sendText, setSendText] = useState<string>("");
    const { data, status } = useSession();
    const initComments = async () => {
        const res = await fetch(`/api/comments/review/${reviewId}`);
        const comments = await res.json();
        setComments(comments);
        await subscribeAbly(reviewId, (comment: Comment) => {
            setComments((prev) => [...prev, comment]);
        });
    };

    const sendComment = async () => {
        const res = await fetch(`/api/comments`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                reviewId,
                text: sendText,
            }),
        });
        // setComments((prev) => [...prev, comment]);
    };

    useEffect(() => {
        initComments();
    }, []);

    return (
        <div>
            <h2>Comments:</h2>
            <div>
                {comments.map((comment) => (
                    <div key={comment.id}>
                        <p>{comment.text}</p>
                    </div>
                ))}
            </div>
            <input
                onChange={(e) => setSendText(e.target.value)}
                type="text"
                className="p-5 border"
            />
            <button onClick={sendComment}>Send Comment</button>
        </div>
    );
}
