import ReviewCreateEdit from "@/components/my-ui/reviews/ReviewCreateEdit";
import UserReviewsPage from "@/components/my-ui/reviews/UserReviewsPage";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ReviewReturnedType } from "@/contexts/ReviewsContext";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/session";
import { useTranslations } from "next-intl";
import { PiPencilLineLight } from "react-icons/pi";
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
    const isCurrentUserProfile = !id || (id && user?.id === id[0]) || false;
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
            <ProfileHeader isCurrentUserProfile={isCurrentUserProfile} />
            <ProfileTabs
                id={id}
                user={user}
                tags={tags}
                groups={groups}
                pieces={pieces}
                isCurrentUserProfile={isCurrentUserProfile}
                reviewForEdit={reviewForEdit}
                idOfEditReview={idOfEditReview}
            />
        </div>
    );
}

function ProfileTabs({
    id,
    user,
    tags,
    groups,
    pieces,
    isCurrentUserProfile,
    reviewForEdit,
    idOfEditReview,
}: {
    id: string[] | undefined | string;
    user: any;
    tags: any;
    groups: any;
    pieces: any;
    isCurrentUserProfile: boolean;
    reviewForEdit: any;
    idOfEditReview: any;
}) {
    const t = useTranslations("ProfileTabs");
    return (
        <Tabs
            defaultValue={idOfEditReview ? "createoredit" : "reviews"}
            className=""
        >
            <div className="flex items-center justify-center mb-5">
                <TabsList className="">
                    <TabsTrigger value="reviews" className="">
                        {t("reviews")}
                    </TabsTrigger>
                    {(isCurrentUserProfile || user?.isAdmin) && (
                        <TabsTrigger value="createoredit">
                            <span className="flex items-center gap-1">
                                <PiPencilLineLight className="sm:hidden text-lg" />
                                <span className="w-16 overflow-hidden gap-1 text-ellipsis sm:w-fit">
                                    {t("create-or-edit")}
                                </span>
                            </span>
                        </TabsTrigger>
                    )}
                </TabsList>
            </div>
            <TabsContent value="reviews" className="flex flex-col gap-4">
                <UserReviewsPage
                    userId={
                        id && id?.length > 0
                            ? (id[0] as string)
                            : (user?.id as string)
                    }
                    tags={tags}
                    groups={groups}
                    pieces={pieces}
                />
            </TabsContent>
            {(isCurrentUserProfile || user?.isAdmin) && (
                <TabsContent
                    value="createoredit"
                    className="flex flex-col gap-4"
                >
                    <ReviewCreateEdit
                        tags={tags}
                        groups={groups}
                        pieces={pieces}
                        review={reviewForEdit}
                        authorId={
                            id && id?.length > 0
                                ? (id[0] as string)
                                : (user?.id as string)
                        }
                    />
                </TabsContent>
            )}
        </Tabs>
    );
}

function ProfileHeader({
    isCurrentUserProfile,
}: {
    isCurrentUserProfile: boolean;
}) {
    const t = useTranslations("ProfileHeader");
    return (
        <div className="flex mt-5 flex-col gap-3 items-center">
            <h1 className="text-3xl font-bold">
                {isCurrentUserProfile ? t("title-my") : t("title-other")}
            </h1>
            <p>{t("description")}</p>
        </div>
    );
}
