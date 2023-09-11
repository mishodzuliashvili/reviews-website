"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";

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
import { Loader2 } from "lucide-react";
import Link from "next-intl/link";
import { useTranslations } from "next-intl";

const getFormSchema = (t: any) =>
    z.object({
        name: z.string().min(2, {
            message: t("name-min"),
        }),
        email: z
            .string()
            .email({
                message: t("invalid-email"),
            })
            .min(2, {
                message: t("email-min"),
            }),
        password: z.string().min(6, {
            message: t("password-min"),
        }),
    });

const CALLBACK_URL = "/login";

const RegisterForm = () => {
    const { toast } = useToast();
    const router = useRouter();
    const [error, setError] = useState<null | Error>(null);
    const [loading, setLoading] = useState(false);
    const t = useTranslations("RegisterForm");
    const te = useTranslations("RegisterForm.errors");
    const tform = useTranslations("RegisterForm.form");

    const formSchema = getFormSchema(tform);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema as any),
        defaultValues: {
            name: "",
            email: "",
            password: "",
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setLoading(true);
        try {
            const res = await fetch("/api/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(values),
            });
            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error);
            } else {
                toast({
                    title: t("success-title"),
                    description: t("success-description"),
                });
                setTimeout(() => {
                    router.push(CALLBACK_URL);
                }, 1000);
            }
        } catch (error: any) {
            setError(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (error) {
            toast({
                variant: "destructive",
                title: t("error-heading"),
                description: te(error.message),
            });
        }
    }, [error]);

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <h1 className="text-2xl">{t("title")}</h1>
                <FormDescription>
                    {t("description")} {t("have-account")}{" "}
                    <Link href="/login" className="text-black dark:text-white">
                        {t("signin")}
                    </Link>
                </FormDescription>
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{t("name")}</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder={t("name-placeholder")}
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{t("email")}</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder={t("email-placeholder")}
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{t("password")}</FormLabel>
                            <FormControl>
                                <Input
                                    type="password"
                                    placeholder={t("password-placeholder")}
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" variant="default" disabled={loading}>
                    {loading ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            {t("wait")}
                        </>
                    ) : (
                        <>{t("submit")}</>
                    )}
                </Button>
            </form>
        </Form>
    );
};

export default RegisterForm;
