"use client";

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
import MainLoader from "@/components/my-ui/MainLoader";
import { useTranslations } from "next-intl";
import { useToast } from "@/components/ui/use-toast";
import { TagsSelect } from "./tags";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import dynamic from "next/dynamic";
import UploadImages from "@/components/my-ui/UploadImages";
import { UploadFileResponse } from "uploadthing/client";
import Image from "next/image";
import { useSession } from "next-auth/react";
const Wysiwyg = dynamic(
    () => import("../../../../../components/my-ui/Wysiwyg"),
    {
        ssr: false,
    }
);

const getFromSchema = (t: any) =>
    z.object({
        title: z.string(),
        item: z.string(),
        group: z.string(),
        grade: z.coerce.number().min(0).max(10),
    });

export function ReviewNewForm() {
    const [loading, setLoading] = useState(false);
    const { data, status } = useSession();
    const t = useTranslations("ReviewNewForm");
    const te = useTranslations("ReviewNewForm.errors");
    const formSchema = getFromSchema(t);
    const { toast } = useToast();
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [uploadedImages, setUploadedImages] = useState<UploadFileResponse[]>(
        []
    );
    const [text, setText] = useState("");
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema as any),
        defaultValues: {
            title: "",
            item: "",
            group: "",
            grade: 0,
        },
    });

    const updateProfile = async (values: z.infer<typeof formSchema>) => {
        setLoading(true);
        await fetch("/api/reviews", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                ...values,
                text: text,
                tags: selectedTags,
                images: uploadedImages.map((im) => im.url),
                userId: data?.user.id,
            }),
        });
        setLoading(false);
    };

    const onUploadComplete = (im: UploadFileResponse[]) => {
        setUploadedImages((images) => [...images, ...im]);
    };

    return (
        <>
            {loading && <MainLoader />}
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(updateProfile)}
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
                                        placeholder={t(
                                            "title-field-placeholder"
                                        )}
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
                                    // defaultValue={field.value}
                                >
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a verified group" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="Movie">
                                            Movie
                                        </SelectItem>
                                        <SelectItem value="Book">
                                            Book
                                        </SelectItem>
                                        <SelectItem value="Music">
                                            Music
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormItem>
                        <FormLabel>{t("tags")}</FormLabel>
                        <FormControl>
                            <TagsSelect
                                tags={[
                                    {
                                        value: "next.js",
                                        label: "Next.js",
                                    },
                                    {
                                        value: "sveltekit",
                                        label: "SvelteKit",
                                    },
                                    {
                                        value: "nuxt.js",
                                        label: "Nuxt.js",
                                    },
                                    {
                                        value: "remix",
                                        label: "Remix",
                                    },
                                    {
                                        value: "astro",
                                        label: "Astro",
                                    },
                                    {
                                        value: "wordpress",
                                        label: "WordPress",
                                    },
                                ]}
                                onChange={(tags) => {
                                    setSelectedTags(tags.map((t) => t.value));
                                }}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    <Wysiwyg
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
                                        images.filter((i) => i.key !== im.key)
                                    );
                                }}
                                className="hover:opacity-70"
                                width={200}
                                height={200}
                                key={im.key}
                                src={im.url}
                                alt={im.key}
                            />
                        ))}
                    </div>
                    <UploadImages onUploadComplete={onUploadComplete} />

                    <Button type="submit">{t("submit")}</Button>
                </form>
            </Form>
        </>
    );
}
