"use client";
import useReviews, { ReviewReturnedType } from "@/hooks/useReviews";

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { useState } from "react";
import MainLoader from "@/components/my-ui/main/MainLoader";
import { useTranslations } from "next-intl";
import { useToast } from "@/components/ui/use-toast";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import dynamic from "next/dynamic";
import UploadImages from "@/components/my-ui/inputs/UploadImages";
import { UploadFileResponse } from "uploadthing/client";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { MultiSelect } from "@/components/my-ui/inputs/MultiSelect";
import { Piece, ReviewGroup, Tag } from "@prisma/client";
import { useRouter } from "next/navigation";
const Wysiwyg = dynamic(() => import("../inputs/Wysiwyg"), {
    ssr: false,
});

const getFromSchema = (t: any) =>
    z.object({
        title: z.string(),
        item: z.string(),
        group: z.string(),
        grade: z.coerce.number().min(0).max(10),
    });

type ReviewCreateEditProps = {
    review?: ReviewReturnedType;
    tags: Tag[];
    groups: ReviewGroup[];
    pieces: Piece[];
};

export default function ReviewCreateEdit({
    review,
    tags,
    groups,
    pieces,
}: ReviewCreateEditProps) {
    const { addOrUpdateReview } = useReviews({
        isQuery: false,
    });
    const router = useRouter();
    const t = useTranslations("ReviewNewForm");
    const [selectedTags, setSelectedTags] = useState<string[]>(
        review?.tags.map((t) => t.value) || []
    );
    const [uploadedImages, setUploadedImages] = useState<string[]>(
        review?.images.map((i) => i.url) || []
    );
    const formSchema = getFromSchema(t);
    const [text, setText] = useState(review?.text || "");
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema as any),
        defaultValues: {
            title: review?.title || "",
            item: review?.piece?.value || "",
            group: review?.group.value || "",
            grade: review?.grade || 0,
        },
    });
    const handleSubmit = async (data: any) => {
        console.log(selectedTags);
        const reviewId = await addOrUpdateReview({
            ...(review
                ? {
                      reviewId: review.id,
                  }
                : {}),
            title: data.title,
            grade: data.grade,
            group: data.group,
            images: uploadedImages,
            item: data.item,
            tags: selectedTags,
            text: text,
        });
        console.log(reviewId);
        // router.push(`/review/${reviewId}`);
    };

    const onUploadComplete = (im: UploadFileResponse[]) => {
        setUploadedImages((images) => [...images, ...im.map((i) => i.url)]);
    };

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="space-y-8"
            >
                <h1 className="text-2xl">{t("title")}</h1>
                <FormDescription>{t("description")}</FormDescription>
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{t("title-field")}</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder={t("title-field-placeholder")}
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="item"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{t("item")}</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder={t("item-placeholder")}
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="grade"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{t("grade")}</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder={t("grade-placeholder")}
                                    {...field}
                                    type="number"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="group"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Group</FormLabel>
                            <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                            >
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a verified group" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {groups.map((group) => (
                                        <SelectItem
                                            value={group.value}
                                            key={group.value}
                                        >
                                            {group.value}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormItem>
                    <FormLabel>{t("tags")}</FormLabel>
                    <FormControl>
                        <MultiSelect
                            options={tags.map((tag) => ({
                                label: tag.value,
                                value: tag.value,
                            }))}
                            defaultValue={review?.tags.map((t) => ({
                                value: t.value,
                                label: t.value,
                            }))}
                            onChange={(tags) => {
                                setSelectedTags(tags.map((t) => t.label));
                            }}
                        />
                    </FormControl>
                    <FormMessage />
                </FormItem>
                <Wysiwyg
                    defaultValue={text ?? ""}
                    onChange={(data) => {
                        setText(data);
                    }}
                />
                <div>
                    <h1>Images</h1>
                    <p>Upload images for your review</p>
                    {uploadedImages.map((im) => (
                        <Image
                            onClick={() => {
                                setUploadedImages((images) =>
                                    images.filter((i) => i !== im)
                                );
                            }}
                            className="hover:opacity-70"
                            width={200}
                            height={200}
                            key={im}
                            src={im}
                            alt={im}
                        />
                    ))}
                </div>
                <UploadImages onUploadComplete={onUploadComplete} />

                <Button type="submit">{t("submit")}</Button>
            </form>
        </Form>
    );
}
