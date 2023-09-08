import ReviewsList from "@/components/my-ui/reviews/ReviewsList";
import UserReviewsPage from "@/components/my-ui/reviews/UserReviewsPage";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/session";

type ProfileProps = {
    params: {
        id: string;
    };
};

export default async function Profile({ params: { id } }: ProfileProps) {
    const user = await getCurrentUser();
    const tags = await prisma.tag.findMany({});
    const groups = await prisma.reviewGroup.findMany({});
    const pieces = await prisma.piece.findMany({});
    const isCurrentUserProfile = user?.id === id;

    return (
        <div className="flex flex-col gap-3">
            <Tabs defaultValue="reviews" className="">
                <TabsList>
                    <TabsTrigger value="reviews" className="">
                        Reviews
                    </TabsTrigger>
                    {isCurrentUserProfile && (
                        <TabsTrigger value="createoredit">
                            Add/Edit Review
                        </TabsTrigger>
                    )}
                </TabsList>
                <TabsContent value="reviews" className="flex flex-col gap-4">
                    <UserReviewsPage
                        userId={id}
                        tags={tags}
                        groups={groups}
                        pieces={pieces}
                    />
                </TabsContent>
                {isCurrentUserProfile && (
                    <TabsContent
                        value="createoredit"
                        className="flex flex-col gap-4"
                    ></TabsContent>
                )}
            </Tabs>
        </div>
    );
}
