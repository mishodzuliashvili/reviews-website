import { prisma } from "@/lib/prisma";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ReviewsList from "@/components/my-ui/reviews/ReviewsList";
import TagCloud from "@/components/my-ui/main/TagCloud";
import { useTranslations } from "next-intl";
import Link from "next/link";

export const revalidate = 0;

export default async function Home({
    searchParams,
}: {
    searchParams?: { [key: string]: string | string[] | undefined };
}) {
    const tags = await prisma.tag.findMany({
        include: {
            _count: {
                select: {
                    reviews: true,
                },
            },
        },
    });

    return (
        <main className="px-5 flex flex-col gap-3">
            <TagCloud
                tags={tags.map((tag) => ({
                    value: tag.value,
                    count: tag._count.reviews,
                }))}
            />
            <TabsComponent searchParams={searchParams} />
        </main>
    );
}

function TabsComponent({ searchParams }: { searchParams?: any }) {
    const { sortBy } = searchParams || {};
    const t = useTranslations("Home");
    return (
        <Tabs
            value={
                (sortBy === "createdAt" && "recentlyAdded") ||
                (sortBy === "grade" && "highestGrades") ||
                "recentlyAdded"
            }
        >
            <div className="flex justify-center">
                <TabsList className="flex flex-col items-start overflow-hidden h-20 sm:flex-row sm:h-auto w-full sm:w-fit">
                    <TabsTrigger value="recentlyAdded" asChild>
                        <Link href={`/?sortBy=createdAt`}>
                            {t("recently-added")}
                        </Link>
                    </TabsTrigger>
                    <TabsTrigger value="highestGrades">
                        <Link href={`/?sortBy=grade`}>
                            {t("highest-grades")}
                        </Link>
                    </TabsTrigger>
                </TabsList>
            </div>
            <TabsContent value="recentlyAdded">
                <ReviewsList sortBy="createdAt" />
            </TabsContent>
            <TabsContent value="highestGrades">
                <ReviewsList sortBy="grade" />
            </TabsContent>
        </Tabs>
    );
}
