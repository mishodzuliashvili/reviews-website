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
type ReviewProps = {
    review: ReviewReturnedType;
    onDelete: () => void;
};

export default function Review({ review, onDelete }: ReviewProps) {
    const { user, isAuth, isAdmin } = useUser();

    const canDeleteOrEdit = isAdmin || user?.id === review.author.id;

    return (
        <Card>
            <CardHeader>
                <CardTitle>{review.title}</CardTitle>
                <CardDescription>
                    {review.createdAt.toLocaleString()}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <ReviewTextSanitized text={review.text} />
                <ReviewImages images={review.images} />
            </CardContent>
            <CardFooter className="flex-col items-start gap-3">
                <h2>{review.author.name}</h2>
                <div className="flex gap-3">
                    <LikeButton
                        reviewId={review.id}
                        likes={review.likes}
                        disabled={!isAuth}
                        userId={user?.id}
                    />
                    {canDeleteOrEdit && <DeleteButton onDelete={onDelete} />}
                    {/* {canDeleteOrEdit && <EditButton />} */}
                    {/* <CommentsButton /> */}
                    <RatingButton
                        reviewId={review.id}
                        rates={review.rates}
                        disabled={!isAuth}
                        userId={user?.id}
                    />
                </div>
            </CardFooter>
        </Card>
    );
}
