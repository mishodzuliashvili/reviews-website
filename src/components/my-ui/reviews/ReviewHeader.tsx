import Image from "next/image";
import ReviewHeaderDropDown from "./ReviewHeaderDropDown";
import { ReviewReturnedType } from "@/contexts/ReviewsContext";
import Link from "next/link";

type ReviewHeaderProps = {
    review: ReviewReturnedType;
};

export default function ReviewHeader({
    review,
}: ReviewHeaderProps): JSX.Element {
    return (
        <header className="p-5 flex justify-between items-center">
            <div className="flex items-center gap-3">
                <Link href={`/profile/${review.author.id}`}>
                    <Image
                        src={review.author.image}
                        alt="Profile Image"
                        width={40}
                        height={40}
                        className="rounded-full object-cover border"
                    />
                </Link>
                <div className="flex flex-col">
                    <Link
                        href={`/profile/${review.author.id}`}
                        className="hover:underline break-all"
                    >
                        {review.author.name}
                    </Link>
                    <span className="text-sm text-gray-400 break-all">
                        {review.createdAt.toLocaleString()}
                    </span>
                </div>
            </div>
            <ReviewHeaderDropDown review={review} />
        </header>
    );
}
// TODO: infinite scrool,
// TODO: is ragac language packaghe lodash urevs
// TODO: edit and add correctly,
// TODO: dont be redirect to profile if admin edits

// TODO: edit page change photos remove more flexible

//TODO: admin page if have time
// todo: validation also with zod i dunno
// TODO: handle errors like returned from hooks
