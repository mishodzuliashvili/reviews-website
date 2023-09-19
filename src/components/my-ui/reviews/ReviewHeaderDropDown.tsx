"use client";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBinLine } from "react-icons/ri";
import ReviewPrintButton from "./ReviewPrintButton";
import { ReviewReturnedType, useReviews } from "@/contexts/ReviewsContext";
import { useUser } from "@/contexts/UserContext";

type ReviewHeaderDropDownProps = {
    review: ReviewReturnedType;
};

export default function ReviewHeaderDropDown({
    review,
}: ReviewHeaderDropDownProps) {
    const { deleteReview } = useReviews();
    const { user } = useUser();
    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <BsThreeDotsVertical />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                {(user?.isAdmin || user?.id === review.author.id) && (
                    <>
                        <DropdownMenuItem asChild>
                            <Link href={`/profile?reviewForEdit=${review.id}`}>
                                <FiEdit className="mr-2 h-4 w-4" />
                                <span>Edit</span>
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            onClick={() => deleteReview(review.id)}
                        >
                            <RiDeleteBinLine className="mr-2 h-4 w-4" />
                            <span>Delete</span>
                        </DropdownMenuItem>
                    </>
                )}
                <DropdownMenuItem>
                    <ReviewPrintButton review={review} />
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
