import { prisma } from "@/lib/prisma";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ReviewsList from "@/components/my-ui/reviews/ReviewsList";
import { createCommentSchema } from "@/lib/validations/comments";
import Comments from "@/components/my-ui/reviews/Comments";
import TagCloud from "@/components/my-ui/main/TagCloud";

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
            <Tabs defaultValue={"recentlyAdded"} className="">
                <TabsList>
                    <TabsTrigger value="recentlyAdded" className="">
                        Recently Added Reviewes
                    </TabsTrigger>
                    <TabsTrigger value="highestGrades">
                        Reviews with highest grades
                    </TabsTrigger>
                </TabsList>
                <TabsContent
                    value="recentlyAdded"
                    className="flex flex-col gap-4"
                >
                    <ReviewsList sortBy="createdAt" take={2} />
                </TabsContent>
                <TabsContent
                    value="highestGrades"
                    className="flex flex-col gap-4"
                >
                    <ReviewsList sortBy="grade" take={2} />
                </TabsContent>
            </Tabs>
        </main>
    );
}
