import { prisma } from "@/lib/prisma";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ReviewsList from "@/components/my-ui/reviews/ReviewsList";
import TagCloud from "@/components/my-ui/main/TagCloud";
import { useTranslations } from "next-intl";

export const revalidate = 0;

export default async function Home() {
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
            <TabsComponent />
        </main>
    );
}

function TabsComponent() {
    const t = useTranslations("Home");

    return (
        <Tabs defaultValue="recentlyAdded">
            <TabsList className="flex flex-col items-start overflow-hidden h-20 sm:flex-row sm:h-auto w-full sm:w-fit">
                <TabsTrigger value="recentlyAdded">
                    {t("recently-added")}
                </TabsTrigger>
                <TabsTrigger value="highestGrades">
                    {t("highest-grades")}
                </TabsTrigger>
            </TabsList>
            <TabsContent value="recentlyAdded" className="flex flex-col gap-4">
                <ReviewsList sortBy="createdAt" take={2} />
            </TabsContent>
            <TabsContent value="highestGrades" className="flex flex-col gap-4">
                <ReviewsList sortBy="grade" take={2} />
            </TabsContent>
        </Tabs>
    );
}
