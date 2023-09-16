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
import { useTranslations } from "next-intl";

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
    const t = useTranslations("UserReviewsPage");
    const [selectedTagValues, setSelectedTagValues] = useState<string[]>([]);
    const [selectedGroupValues, setSelectedGroupValues] = useState<string[]>(
        []
    );
    const [selectedPieceValues, setSelectedPieceValues] = useState<string[]>(
        []
    );
    return (
        <div className="flex flex-col gap-4">
            <div className="flex gap-4 flex-wrap">
                <Select
                    value={sortBy}
                    onValueChange={(e) => setSortBy(e as any)}
                >
                    <SelectTrigger className="w-full sm:w-[180px]">
                        <SelectValue placeholder="Select a sort " />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>{t("sort-by")}</SelectLabel>
                            <SelectItem value="createdAt">
                                {t("created-at")}
                            </SelectItem>
                            <SelectItem value="likes">{t("likes")}</SelectItem>
                            <SelectItem value="grade">{t("grade")}</SelectItem>
                            <SelectItem value="rates">{t("rates")}</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
                <MultiSelect
                    placeholder={t("select-tags")}
                    canCreate={false}
                    options={tags.map((tag) => ({
                        value: tag.value,
                        label: tag.value,
                    }))}
                    onChange={(tags) => {
                        setSelectedTagValues(tags.map((t) => t.value));
                    }}
                />
                <MultiSelect
                    canCreate={false}
                    placeholder={t("select-groups")}
                    options={groups.map((group) => ({
                        value: group.value,
                        label: group.value,
                    }))}
                    onChange={(groups) => {
                        setSelectedGroupValues(groups.map((g) => g.value));
                    }}
                />
                <MultiSelect
                    placeholder={t("select-pieces")}
                    canCreate={false}
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
