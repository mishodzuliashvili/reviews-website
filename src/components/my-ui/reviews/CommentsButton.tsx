"use client";
import { Button } from "@/components/ui/button";
import { Dispatch, SetStateAction } from "react";
import { BiCommentDetail } from "react-icons/bi";
type CommentsButtonProps = {
    setIsReadMode: Dispatch<SetStateAction<boolean>>;
};
export default function CommentsButton({ setIsReadMode }: CommentsButtonProps) {
    return (
        <Button
            variant="outline"
            onClick={() => {
                setIsReadMode((prev) => !prev);
            }}
        >
            <BiCommentDetail />
        </Button>
    );
}
