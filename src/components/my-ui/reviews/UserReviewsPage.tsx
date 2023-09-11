"use client";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import ReviewsList from "./ReviewsList";
import { useState } from "react";
import { Piece, ReviewGroup, Tag } from "@prisma/client";
import { MultiSelect } from "@/components/my-ui/inputs/MultiSelect";

type UserReviewsPageProps = {
    userId: string;
    tags: Tag[];
    groups: ReviewGroup[];
    pieces: Piece[];
};

export default function UserReviewsPage({
    userId,
    tags,
    pieces,
    groups,
}: UserReviewsPageProps) {
    const [sortBy, setSortBy] = useState<
        "createdAt" | "likes" | "grade" | "rates" | undefined
    >("createdAt");

    const [selectedTagValues, setSelectedTagValues] = useState<string[]>([]);
    const [selectedGroupValues, setSelectedGroupValues] = useState<string[]>(
        []
    );
    const [selectedPieceValues, setSelectedPieceValues] = useState<string[]>(
        []
    );
    return (
        <div className="flex flex-col gap-4">
            <div className="flex gap-4">
                <Select
                    value={sortBy}
                    onValueChange={(e) => setSortBy(e as any)}
                >
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select a sort " />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Fruits</SelectLabel>
                            <SelectItem value="createdAt">Time</SelectItem>
                            <SelectItem value="likes">Likes</SelectItem>
                            <SelectItem value="grade">Grade</SelectItem>
                            <SelectItem value="rates">Rates</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
                <MultiSelect
                    options={tags.map((tag) => ({
                        value: tag.value,
                        label: tag.value,
                    }))}
                    onChange={(tags) => {
                        setSelectedTagValues(tags.map((t) => t.value));
                    }}
                />
                <MultiSelect
                    options={groups.map((group) => ({
                        value: group.value,
                        label: group.value,
                    }))}
                    onChange={(groups) => {
                        setSelectedGroupValues(groups.map((g) => g.value));
                    }}
                />
                <MultiSelect
                    options={pieces.map((piece) => ({
                        value: piece.value,
                        label: piece.value,
                    }))}
                    onChange={(pieces) => {
                        setSelectedPieceValues(pieces.map((p) => p.value));
                    }}
                />
            </div>
            <ReviewsList
                userId={userId}
                sortBy={sortBy}
                tagValues={selectedTagValues}
                groupValues={selectedGroupValues}
                pieceValues={selectedPieceValues}
            />
        </div>
    );
}
