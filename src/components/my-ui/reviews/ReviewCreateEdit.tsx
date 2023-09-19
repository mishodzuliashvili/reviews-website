"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

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
import { useTranslations } from "next-intl";
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
import { MultiSelect } from "@/components/my-ui/inputs/MultiSelect";
import { Piece, ReviewGroup, Tag } from "@prisma/client";
import { useRouter } from "next/navigation";
import { ReviewReturnedType, useReviews } from "@/contexts/ReviewsContext";
import { AiOutlineDelete } from "react-icons/ai";
import MainLoader from "../main/MainLoader";
const Wysiwyg = dynamic(() => import("../inputs/Wysiwyg"), {
    ssr: false,
});

const getFromSchema = (t: any) =>
    z.object({
        title: z.string({
            required_error: t("title-required"),
            invalid_type_error: t("title-invalid"),
        }),
        item: z.string({
            required_error: t("item-required"),
            invalid_type_error: t("item-invalid"),
        }),
        group: z.string({
            required_error: t("group-required"),
            invalid_type_error: t("group-invalid"),
        }),
        grade: z.coerce
            .number({
                invalid_type_error: t("grade-invalid"),
                required_error: t("grade-required"),
            })
            .int({
                message: t("grade-invalid"),
            })
            .min(0, {
                message: t("grade-invalid"),
            })
            .max(10, {
                message: t("grade-invalid"),
            }),
    });

type ReviewCreateEditProps = {
    review?: ReviewReturnedType;
    tags: Tag[];
    groups: ReviewGroup[];
    pieces: Piece[];
    authorId: string;
};

export default function ReviewCreateEdit({
    review,
    tags,
    groups,
    pieces,
    authorId,
}: ReviewCreateEditProps) {
    const { addOrUpdateReview, reviewsLoading } = useReviews();
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
            title: review?.title,
            item: review?.piece?.value,
            group: review?.group.value,
            grade: review?.grade,
        },
    });
    const handleSubmit = async (data: any) => {
        await addOrUpdateReview({
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
            authorId: authorId,
        });
        router.push(`/profile/${authorId}`);
    };

    const onUploadComplete = (im: UploadFileResponse[]) => {
        setUploadedImages((images) => [...images, ...im.map((i) => i.url)]);
    };

    return (
        <Form {...form}>
            {reviewsLoading && <MainLoader />}
            <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="space-y-8 mx-auto max-w-xl w-full"
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
                            <FormLabel>{t("group")}</FormLabel>
                            <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                            >
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue
                                            placeholder={t("group-placeholder")}
                                        />
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
                            placeholder={t("tags-placeholder")}
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
                    placeholder={t("text-placeholder")}
                    defaultValue={text ?? ""}
                    onChange={(data) => {
                        setText(data);
                    }}
                />
                <div>
                    <h1>{t("images")}</h1>
                    <p>{t("images-placeholder")}</p>

                    <Carousel
                        key={uploadedImages.length}
                        className="cursor-pointer max-w-xl"
                    >
                        {uploadedImages.map((image) => (
                            <div key={image} className="relative group">
                                <img
                                    className="group-hover:opacity-70"
                                    src={image}
                                />
                                <div
                                    className="absolute top-[50%] translate-x-[-50%] left-[50%] translate-y-[-50%] group-hover:opacity-100 opacity-0 transition-all duration-300 cursor-pointer text-5xl"
                                    onClick={() => {
                                        setUploadedImages((images) =>
                                            images.filter((i) => i !== image)
                                        );
                                    }}
                                >
                                    <AiOutlineDelete />
                                </div>
                            </div>
                        ))}
                    </Carousel>
                </div>
                <UploadImages onUploadComplete={onUploadComplete} />

                <Button type="submit">{t("submit")}</Button>
            </form>
        </Form>
    );
}
