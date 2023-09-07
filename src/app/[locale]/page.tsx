import TagCloud from "@/components/my-ui/TagCloud";
import ReviewCard from "@/components/my-ui/reviews/ReviewCard";
import { prisma } from "@/lib/prisma";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default async function Home() {
    const recentlyAddedReviews = await prisma.review.findMany({
        orderBy: {
            createdAt: "desc",
        },
        take: 5,
        include: {
            author: true,
            likes: true,
            images: true,
            group: true,
            piece: true,
            rates: true,
            tags: true,
        },
    });

    const highestGradesReviews = await prisma.review.findMany({
        orderBy: {
            grade: "desc",
        },
        take: 5,
        include: {
            author: true,
            likes: true,
            images: true,
            group: true,
            piece: true,
            rates: true,
            tags: true,
        },
    });

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
            <TagCloud tags={tags} />

            <Tabs defaultValue="recentlyAdded" className="">
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
                    className="flex flex-col gap-3"
                >
                    {recentlyAddedReviews.map((review) => (
                        <ReviewCard key={review.id} review={review} />
                    ))}
                </TabsContent>
                <TabsContent
                    value="highestGrades"
                    className="flex flex-col gap-3"
                >
                    {highestGradesReviews.map((review) => (
                        <ReviewCard key={review.id} review={review} />
                    ))}
                </TabsContent>
            </Tabs>
        </main>
    );
}
