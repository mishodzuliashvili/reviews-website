import ReviewCreateEdit from "@/components/my-ui/reviews/ReviewCreateEdit";
import ReviewsList from "@/components/my-ui/reviews/ReviewsList";
import UserReviewsPage from "@/components/my-ui/reviews/UserReviewsPage";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ReviewReturnedType } from "@/hooks/useReviews";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/session";

type ProfileProps = {
    params: {
        id: string;
    };
    searchParams: { [key: string]: string | string[] | undefined };
};

export default async function Profile({
    params: { id },
    searchParams,
}: ProfileProps) {
    const user = await getCurrentUser();
    const tags = await prisma.tag.findMany({});
    const groups = await prisma.reviewGroup.findMany({});
    const pieces = await prisma.piece.findMany({});
    const isCurrentUserProfile = user?.id === id;
    const idOfEditReview = searchParams?.reviewForEdit;
    let reviewForEdit = (await prisma.review.findUnique({
        where: {
            id: (searchParams?.reviewForEdit as string) || "",
        },
        include: {
            tags: true,
            group: true,
            piece: true,
            images: true,
        },
    })) as ReviewReturnedType;

    return (
        <div className="flex flex-col gap-3">
            <Tabs
                defaultValue={idOfEditReview ? "createoredit" : "reviews"}
                className=""
            >
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
                    >
                        <ReviewCreateEdit
                            tags={tags}
                            groups={groups}
                            review={reviewForEdit}
                        />
                    </TabsContent>
                )}
            </Tabs>
        </div>
    );
}
