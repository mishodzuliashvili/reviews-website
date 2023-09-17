"use client";
import { Badge } from "@/components/ui/badge";
import { ReviewReturnedType } from "@/contexts/ReviewsContext";
import Link from "next/link";

type TagLinksProps = {
    review: ReviewReturnedType;
};

export default function TagLinks({ review }: TagLinksProps) {
    return (
        <div className="flex gap-3 px-5 flex-wrap">
            {review.tags.map((tag) => (
                <Badge
                    className="font-medium text-sm px-4 py-2 cursor-pointer dark:hover:bg-[#ffffff2b] hover:bg-gray-100"
                    variant="outline"
                    key={tag.value}
                >
                    <Link href={`/reviews?tagValue=${tag.value}`}>
                        {tag.value}
                    </Link>
                </Badge>
            ))}
        </div>
    );
}
