"use client";
import { useMounted } from "@/hooks/use-mounted";
import * as sanitizeHtml from "sanitize-html";
export default function HTMLSanitized({ text }: { text: string }) {
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
