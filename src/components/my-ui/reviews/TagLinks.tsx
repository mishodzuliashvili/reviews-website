"use client";
import { Button } from "@/components/ui/button";
import { Tag } from "@prisma/client";
import { redirect, useRouter } from "next/navigation";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

type TagLinksProps = {
    tags: Tag[];
};

export default function TagLinks({ tags }: TagLinksProps) {
    const router = useRouter();

    return (
        <div className="flex gap-3">
            {tags.map((tag) => (
                <Badge
                    className="font-medium text-sm px-3 py-1 cursor-pointer"
                    variant="outline"
                    key={tag.value}
                    onClick={() => {
                        router.push(`/reviews?tagValue=${tag.value}`);
                    }}
                >
                    {tag.value}
                </Badge>
            ))}
        </div>
    );
}
