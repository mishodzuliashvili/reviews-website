"use client";
import { useRouter } from "next/navigation";
import { TagCloud as ReactTagCloud } from "react-tagcloud";

type TagCloudProps = {
    tags: {
        value: string;
        _count: {
            reviews: number;
        };
    }[];
};

export default function TagCloud({ tags }: TagCloudProps) {
    const router = useRouter();

    return (
        <ReactTagCloud
            minSize={14}
            maxSize={35}
            renderer={(tag: any, size: any) => (
                <span
                    key={tag.value}
                    className="inline-block cursor-pointer hover:scale-110 duration-300"
                    style={{
                        fontSize: `${size}pt`,
                        margin: "3px",
                        lineHeight: "1",
                    }}
                >
                    {tag.value}
                </span>
            )}
            disableRandomColor={true}
            shuffle={false}
            tags={tags.map((tag) => ({
                value: tag.value,
                count: tag._count.reviews,
            }))}
            onClick={(tag: any) => {
                router.push(`/?searchText=${tag.value}`);
            }}
        />
    );
}
