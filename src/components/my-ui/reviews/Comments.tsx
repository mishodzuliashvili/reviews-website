"use client";

import { useState } from "react";
import useComments from "@/hooks/useComments";
import { useUser } from "@/contexts/UserContext";
import { ReviewReturnedType } from "@/contexts/ReviewsContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { ImBin } from "react-icons/im";
type CommentsProps = {
    review: ReviewReturnedType;
};

export default function Comments({ review }: CommentsProps) {
    const {
        comments,
        commentsError,
        addComment,
        commentsLoading,
        deleteComment,
    } = useComments({ review });
    const [sendText, setSendText] = useState("");
    const { user } = useUser();
    if (commentsError) {
        return <div>error</div>;
    }
    return (
        <div>
            <div className="flex flex-col gap-3">
                {commentsLoading && (
                    <div>
                        <p>Loading...</p>
                    </div>
                )}
                {comments.map((comment) => (
                    <div
                        className={comment.pending ? "opacity-50" : ""}
                        key={comment.id}
                    >
                        <div className="flex justify-between items-center">
                            <Link
                                className="flex items-center gap-3 hover:underline"
                                href={`/profile/${comment.author.id}`}
                            >
                                <Image
                                    src={comment.author.image || ""}
                                    alt="Profile Image"
                                    width={30}
                                    height={30}
                                    className="rounded-full object-cover border"
                                />
                                <span>{comment.author.name}</span>
                            </Link>
                            {(user?.id === comment.author.id ||
                                user?.isAdmin) && (
                                <button
                                    disabled={comment.pending}
                                    onClick={() => deleteComment(comment.id)}
                                >
                                    <ImBin />
                                </button>
                            )}
                        </div>
                        <p className="px-10 opacity-70 break-words">
                            {comment.text}
                        </p>
                    </div>
                ))}
            </div>
            {user && (
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        addComment(sendText);
                        setSendText("");
                    }}
                    className="flex gap-1 mt-5"
                >
                    <Input
                        // placeholder={t("search")}
                        value={sendText}
                        className="p-6"
                        onChange={(e) => setSendText(e.target.value)}
                    />
                    <Button
                        className="p-6"
                        variant="outline"
                        // onClick={() => addComment(sendText)}
                    >
                        Send
                    </Button>
                </form>
            )}
        </div>
    );
}
