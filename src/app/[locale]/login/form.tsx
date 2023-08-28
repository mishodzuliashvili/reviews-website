"use client";
import React, { useEffect, useState } from "react";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { FaGithub, FaGoogle } from "react-icons/fa";
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

const CALLBACK_URL = "/";

const LoginForm = () => {
    const searchParams = useSearchParams();
    const { toast } = useToast();
    const searchParamsError = searchParams.get("error");
    const [loading, setLoading] = useState(false);
    const t = useTranslations("LoginForm");
    const te = useTranslations("LoginForm.errors");
    const tform = useTranslations("LoginForm.form");
    const [error, setError] = useState<null | Error>(
        searchParamsError ? new Error(searchParamsError) : null
    );
    const formSchema = getFormSchema(tform);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema as any),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        setLoading(true);
        setError(null);
        const { email, password } = values;
        signIn("credentials", {
            redirect: false,
            email,
            password,
            callbackUrl: CALLBACK_URL,
        }).then((res: any) => {
            if (res?.error) {
                setLoading(false);
                setError(new Error(res.error));
            } else {
                window.location.replace(CALLBACK_URL);
            }
        });
    }
    //TODO: learn axios by some project
    // TODO: learn custom hooks
    // TODO: learn react-query and write your own small with AbortController useffect and error and etc, swr
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
                <h1 className="text-xl">{t("title")}</h1>
                <FormDescription>
                    {t("description")}
                    {t("no-account")}{" "}
                    <Link
                        href="/register"
                        className="text-black dark:text-white"
                    >
                        {t("signup")}
                    </Link>
                </FormDescription>
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
                <FormDescription>{t("other-options")}</FormDescription>
                <div className="flex gap-3 flex-wrap">
                    <Button
                        variant="outline"
                        type="button"
                        disabled={loading}
                        onClick={() => {
                            setLoading(true);
                            signIn("google", {
                                callbackUrl: CALLBACK_URL,
                            });
                        }}
                        className="flex gap-3 items-center"
                    >
                        <FaGoogle />
                        google
                    </Button>
                    <Button
                        variant="outline"
                        type="button"
                        disabled={loading}
                        onClick={() => {
                            setLoading(true);
                            signIn("github", {
                                callbackUrl: CALLBACK_URL,
                            });
                        }}
                        className="flex gap-3 items-center "
                    >
                        <FaGithub />
                        github
                    </Button>
                </div>
            </form>
        </Form>
    );
};

export default LoginForm;
