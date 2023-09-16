import { type ReviewReturnedType } from "@/hooks/useReviews";
import useUser from "@/hooks/useUser";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import ReviewImages from "./ReviewImages";
import ReviewTextSanitized from "./ReviewTextSanitized";
import LikeButton from "./LikeButton";
import DeleteButton from "./DeleteButton";
import EditButton from "./EditButton";
import CommentsButton from "./CommentsButton";
import RatingButton from "./RatingButton";
import { useRef, useState } from "react";
import ReactToPrint from "react-to-print";
import ReviewPrinting from "./ReviewPrinting";
import { Button } from "@/components/ui/button";
import { AiFillPrinter } from "react-icons/ai";
import { FiPrinter } from "react-icons/fi";
import Link from "next/link";
import TagLinks from "./TagLinks";
import Comments from "./Comments";
import { BsFillBookmarkHeartFill } from "react-icons/bs";
type ReviewProps = {
    review: ReviewReturnedType;
    onDelete: () => void;
    changeRateByPiece: (pieceValue: string, rate: number) => void;
};

export default function Review({
    review,
    onDelete,
    changeRateByPiece,
}: ReviewProps) {
    const { user, isAuth, isAdmin } = useUser();
    const [isReadMode, setIsReadMode] = useState(true);
    const canDeleteOrEdit = isAdmin || user?.id === review.author.id;
    const componentRef = useRef<HTMLDivElement>(null);

    return (
        <Card>
            <ReviewPrinting review={review} ref={componentRef} />
            <CardHeader>
                <CardTitle>{review.title}</CardTitle>
                <CardDescription>
                    {review.createdAt.toLocaleString()}
                </CardDescription>
                <p>
                    Grade: <span className="font-bold">{review.grade}</span>
                </p>
            </CardHeader>
            <CardContent>
                <ReviewTextSanitized text={review.text} />
                <ReviewImages images={review.images} />
            </CardContent>
            <CardFooter className="flex-col items-start gap-3">
                <h2>
                    <Link href={`/profile/${review.author.id}`}>
                        {review.author.name}
                    </Link>
                </h2>
                <div>
                    <TagLinks tags={review.tags} />
                </div>
                <div className="flex gap-3">
                    <LikeButton
                        reviewId={review.id}
                        likes={review.likes}
                        disabled={!isAuth}
                        userId={user?.id}
                    />
                    {canDeleteOrEdit && <DeleteButton onDelete={onDelete} />}
                    {canDeleteOrEdit && <EditButton reviewId={review.id} />}
                    <CommentsButton setIsReadMode={setIsReadMode} />
                    <ReactToPrint
                        trigger={() => (
                            <Button variant="outline">
                                <FiPrinter />
                            </Button>
                        )}
                        content={() => componentRef.current || null}
                    />
                    <RatingButton
                        pieceValue={review.piece?.value as string}
                        rates={review.piece?.rates || []}
                        disabled={!isAuth}
                        userId={user?.id}
                        changeRateByPiece={changeRateByPiece}
                    />
                </div>
                {!isReadMode && (
                    <div className="border-t w-full pt-3 mt-2">
                        <Comments reviewId={review.id} />
                    </div>
                )}
            </CardFooter>
        </Card>
    );
}
