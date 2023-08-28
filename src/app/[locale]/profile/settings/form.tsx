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
import { useMain } from "../../mainContext";
import { useState } from "react";
import MainLoader from "@/components/my-ui/MainLoader";
import { useTranslations } from "next-intl";
import { useToast } from "@/components/ui/use-toast";

const getFromSchema = (t: any) =>
  z.object({
    name: z.string().min(2, {
      message: t("name-min"),
    }),
  });

export function ProfileSettingsForm() {
  const { user, updateClientUser } = useMain();
  const [loading, setLoading] = useState(false);
  const t = useTranslations("ProfileSettingsForm");
  const te = useTranslations("ProfileSettingsForm.errors");
  const formSchema = getFromSchema(t);
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: user?.name,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    fetch(`/api/users/${user?.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(te("update-error"));
        }
        toast({
          title: t("update-success"),
        });
        updateClientUser(values);
      })
      .catch((err) => {
        toast({
          title: te("update-error"),
        });
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <>
      {loading && <MainLoader />}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <h1 className="text-2xl">{t("title")}</h1>
          <FormDescription>{t("description")}</FormDescription>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("name")}</FormLabel>
                <FormControl>
                  <Input placeholder={t("name-placeholder")} {...field} />
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
