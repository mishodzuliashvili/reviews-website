"use client";
import { useMounted } from "@/hooks/useMounted";
import * as sanitizeHtml from "sanitize-html";
export default function ReviewTextSanitized({ text }: { text: string }) {
    const isMounted = useMounted();

    if (!isMounted) return null;
    const cleanHTML = sanitizeHtml.default(text);

    return (
        <div
            dangerouslySetInnerHTML={{
                __html: cleanHTML,
            }}
        ></div>
    );
}
