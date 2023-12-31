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
import MainLoader from "@/components/my-ui/main/MainLoader";
import { useTranslations } from "next-intl";
import { useToast } from "@/components/ui/use-toast";
import { Session } from "next-auth";
import { useSession } from "next-auth/react";

const getFromSchema = (t: any) =>
    z.object({
        name: z.string().min(2, {
            message: t("name-min"),
        }),
    });

export function ProfileSettingsForm({ user }: { user: Session["user"] }) {
    const [loading, setLoading] = useState(false);
    const t = useTranslations("ProfileSettingsForm");
    const te = useTranslations("ProfileSettingsForm.errors");
    const formSchema = getFromSchema(t);
    const { toast } = useToast();
    const { update, data } = useSession();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema as any),
        defaultValues: {
            name: user.name || "",
        },
    });

    const updateProfile = async (values: z.infer<typeof formSchema>) => {
        setLoading(true);
        const res = await fetch(`/api/users/${user.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
        });
        if (!res.ok) {
            te("update-error");
            return;
        }
        await update();
        toast({
            title: t("update-success"),
        });
        setLoading(false);
    };

    return (
        <>
            {loading && <MainLoader />}
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(updateProfile)}
                    className="space-y-8 max-w-xs w-full"
                >
                    <h1 className="text-2xl">{t("title")}</h1>
                    <FormDescription>{t("description")}</FormDescription>
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
                    <Button type="submit">{t("submit")}</Button>
                </form>
            </Form>
        </>
    );
}
