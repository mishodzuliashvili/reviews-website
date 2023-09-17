"use client";
import { ReviewReturnedType } from "@/contexts/ReviewsContext";
import { useMounted } from "@/hooks/useMounted";
import * as sanitizeHtml from "sanitize-html";
export default function ReviewTextSanitized({
    review,
}: {
    review: ReviewReturnedType;
}) {
    const isMounted = useMounted();

    if (!isMounted) return null;
    const cleanHTML = sanitizeHtml.default(review.text);

    return (
        <div
            dangerouslySetInnerHTML={{
                __html: cleanHTML,
            }}
        ></div>
    );
}
