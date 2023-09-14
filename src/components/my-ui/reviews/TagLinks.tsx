"use client";
import { Button } from "@/components/ui/button";
import { Tag } from "@prisma/client";
import { redirect, useRouter } from "next/navigation";
import Link from "next/link";

type TagLinksProps = {
    tags: Tag[];
};

export default function TagLinks({ tags }: TagLinksProps) {
    const router = useRouter();

    return (
        <div className="flex gap-3">
            {tags.map((tag) => (
                <Button
                    variant="outline"
                    key={tag.value}
                    onClick={() => {
                        router.push(`/tags/${tag.value}`);
                    }}
                >
                    {tag.value}
                </Button>
            ))}
        </div>
    );
}
