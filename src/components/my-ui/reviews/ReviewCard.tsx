import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { ResultOfSearchFullText } from "@/prisma-functions/reviews";
import NextImage from "next/image";
import LikeButton from "./LikeButton";
import RatingButton from "./RatingButton";
import HTMLSanitized from "./HTMLSanitized";
import { getCurrentUser } from "@/lib/session";
import { GrScorecard } from "react-icons/gr";
import { GoCommentDiscussion } from "react-icons/go";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Comments from "./Comments";
type ReviewCardProps = {
    review: ResultOfSearchFullText[number];
};

export default async function ReviewCard({ review }: ReviewCardProps) {
    const user = await getCurrentUser();
    return (
        <Card className="bg-transparent">
            <div className="flex">
                <div className="p-6 flex flex-col gap-3 items-center">
                    <LikeButton
                        numberOfLikes={review.likes?.length ?? 0}
                        reviewId={review.id}
                        isLiked={review.likes?.some(
                            (like) => like.userId === user?.id
                        )}
                    />

                    <Button className="px-4 py-7 text-xl" variant="outline">
                        <GoCommentDiscussion />
                    </Button>
                </div>
                <div className="w-full">
                    <CardHeader>
                        <CardTitle>
                            {review.groupValue} - {review.title}
                        </CardTitle>

                        <CardDescription>
                            {review.createdAt.toLocaleString()}
                        </CardDescription>
                        <h3 className="text-sm">{review.author.name}</h3>
                        <h3 className="flex items-center gap-3">
                            <span>Grade:</span>
                            <span className="pt-1">{review.grade} /10</span>
                        </h3>
                    </CardHeader>
                    <CardContent>
                        <div className="flex gap-3">
                            {review.images.map((image) => (
                                <NextImage
                                    width={1000}
                                    height={1000}
                                    key={image.id}
                                    src={image.url}
                                    alt=""
                                    className="w-80 h-auto object-cover rounded-lg"
                                />
                            ))}
                        </div>
                        {review.images.length > 0 && <div className="h-5" />}
                        {/* <Link
                            href={""}
                            className="text-lg hover:underline cursor-pointer"
                        >
                            {review.pieceValue}
                        </Link> */}
                        <div className="mt-2">
                            <HTMLSanitized text={review.text} />
                        </div>
                    </CardContent>
                    <CardFooter className="flex justify-between flex-col w-full gap-3 items-start">
                        <div className="flex flex-wrap gap-3">
                            {review.tags.map((tag) => (
                                <Button
                                    className="px-4 py-2 text-sm font-medium"
                                    key={tag.value}
                                    variant="outline"
                                >
                                    <Link href={`/?searchText=${tag.value}`}>
                                        {tag.value}
                                    </Link>
                                </Button>
                            ))}
                        </div>
                        <div className="pt-1 flex gap-3 items-center">
                            <RatingButton
                                reviewId={review.id}
                                rates={review.rates}
                                userId={user?.id || ""}
                            />
                        </div>
                        <Comments reviewId={review.id} />
                    </CardFooter>
                </div>
            </div>
        </Card>
    );
}
