import ReviewImages from "./ReviewImages";
import { ReviewReturnedType } from "@/contexts/ReviewsContext";
import TagLinks from "./TagLinks";
import Link from "next/link";
import ReviewTextSanitized from "./ReviewTextSanitized";
import { calculateAvarageRate } from "@/lib/utils";
import { FaStar } from "react-icons/fa";
import { BiSolidBookmarkHeart } from "react-icons/bi";
import { BsBalloonHeart } from "react-icons/bs";
import { AiOutlineHeart } from "react-icons/ai";
import { useTranslations } from "next-intl";

type ReviewBodyProps = {
    review: ReviewReturnedType;
};

export default function ReviewBody({ review }: ReviewBodyProps) {
    const t = useTranslations("ReviewBody");
    return (
        <div>
            <div className="px-5 mb-5 text-xl font-medium flex justify-between gap-2">
                <p className="break-all">{review.title}</p>
                <p className="flex gap-2">
                    <span className="text-sm self-end">{t("grade")}</span>
                    {review.grade}
                </p>
            </div>
            <ReviewImages review={review} />
            <div className="px-5 mb-5 text-xl font-medium">
                <Link
                    className="hover:underline break-all"
                    href={`/reviews?groupValue=${review.group.value}`}
                >
                    {review.group.value}
                </Link>{" "}
                -{" "}
                <Link
                    className="hover:underline break-all"
                    href={`/reviews?pieceValue=${review.piece?.value}`}
                >
                    <p>{review.piece?.value}</p>
                    <p className="flex gap-2">
                        {calculateAvarageRate(
                            review.piece?.rates || []
                        ).toFixed(2)}{" "}
                        <FaStar className="text-[orange]" />
                    </p>
                </Link>
            </div>
            <div className="px-5 mb-5 break-all">
                <ReviewTextSanitized review={review} />
            </div>
            <TagLinks review={review} />
        </div>
    );
}
