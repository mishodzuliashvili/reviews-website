"use client";

import { useState } from "react";
import useComments from "@/hooks/useComments";
import { useSession } from "next-auth/react";

export default function Comments({ reviewId }: { reviewId: string }) {
    const { comments, addComment, loading, error } = useComments({ reviewId });
    const [sendText, setSendText] = useState("");
    const { status } = useSession();
    return (
        <div>
            <h2>Comments:</h2>
            {loading && <p>Loading...</p>}
            <div>
                {comments.map((comment) => (
                    <div
                        className={comment.pending ? "opacity-50" : ""}
                        key={comment.id}
                    >
                        <p>{comment.text}</p>
                    </div>
                ))}
            </div>
            {status === "authenticated" && (
                <div>
                    <input
                        onChange={(e) => setSendText(e.target.value)}
                        type="text"
                        className="p-5 border"
                    />
                    <button onClick={() => addComment(sendText)}>
                        Send Comment
                    </button>
                </div>
            )}
        </div>
    );
}
