"use client";
import { useMounted } from "@/hooks/useMounted";
import { useRouter } from "next/navigation";

type TagCloudProps = {
    tags: {
        value: string;
        count: number;
    }[];
};

export default function TagCloud({ tags }: TagCloudProps) {
    const isMounted = useMounted();
    const router = useRouter();
    if (!isMounted) return null;

    const counts = tags.map((tag) => tag.count);
    const minCount = Math.min(...counts);
    const maxCount = Math.max(...counts);

    const calculateTagSize = (count: number) => {
        const minSize = 14;
        const maxSize = 30;
        return (
            minSize +
            ((count - minCount) / (maxCount - minCount)) * (maxSize - minSize)
        );
    };

    return (
        <div className="tag-cloud">
            {tags.map((tag, index) => (
                <span
                    key={index}
                    className="cursor-pointer mr-1 inline-block hover:scale-110 duration-300"
                    style={{
                        fontSize: calculateTagSize(tag.count) + "px",
                    }}
                    onClick={() => router.push(`/tags/${tag.value}`)}
                >
                    {tag.value}
                </span>
            ))}
        </div>
    );
}
