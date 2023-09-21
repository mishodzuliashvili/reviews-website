import ReviewCreateEdit from "@/components/my-ui/reviews/ReviewCreateEdit";
import UserReviewsPage from "@/components/my-ui/reviews/UserReviewsPage";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ReviewReturnedType } from "@/contexts/ReviewsContext";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/session";
import { useTranslations } from "next-intl";
import Link from "next/link";
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

    const profileId = (id?.length > 0 && id?.[0]) || user?.id;

    const isCurrentUserProfile = profileId === user?.id;

    const idOfEditReview = searchParams?.reviewForEdit;
    const ifCreate = searchParams?.create;

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

    let authorId = user?.id;
    if (!isCurrentUserProfile) {
        authorId = profileId;
    }
    if (reviewForEdit) {
        authorId = reviewForEdit.authorId;
    }

    return (
        <div className="flex flex-col gap-3">
            <ProfileHeader isCurrentUserProfile={isCurrentUserProfile} />
            <ProfileTabs
                authorId={authorId}
                id={id}
                user={user}
                tags={tags}
                groups={groups}
                pieces={pieces}
                isCurrentUserProfile={isCurrentUserProfile}
                reviewForEdit={reviewForEdit}
                idOfEditReview={idOfEditReview}
                ifCreate={ifCreate}
                profileId={profileId}
            />
        </div>
    );
}

function ProfileTabs({
    user,
    tags,
    groups,
    pieces,
    isCurrentUserProfile,
    reviewForEdit,
    idOfEditReview,
    ifCreate,
    authorId,
    profileId,
}: {
    id: string[] | undefined | string;
    user: any;
    tags: any;
    groups: any;
    pieces: any;
    isCurrentUserProfile: boolean;
    reviewForEdit: any;
    idOfEditReview: any;
    ifCreate: any;
    authorId: any;
    profileId: any;
}) {
    const t = useTranslations("ProfileTabs");
    return (
        <Tabs value={idOfEditReview || ifCreate ? "createoredit" : "reviews"}>
            <div className="flex items-center justify-center mb-5">
                <TabsList className="">
                    <TabsTrigger value="reviews" className="">
                        <Link href={`/profile/${authorId}`} className="flex">
                            {t("reviews")}
                        </Link>
                    </TabsTrigger>
                    {(isCurrentUserProfile || user?.isAdmin) && (
                        <TabsTrigger asChild value="createoredit">
                            <Link
                                href={`/profile/${authorId}?create=true`}
                                className="flex items-center gap-1"
                            >
                                <PiPencilLineLight className="sm:hidden text-lg" />
                                <span className="w-16 overflow-hidden gap-1 text-ellipsis sm:w-fit">
                                    {t("create-or-edit")}
                                </span>
                            </Link>
                        </TabsTrigger>
                    )}
                </TabsList>
            </div>
            <TabsContent value={"reviews"} className="flex flex-col gap-4">
                <UserReviewsPage
                    userId={profileId}
                    tags={tags}
                    groups={groups}
                    pieces={pieces}
                />
            </TabsContent>
            <TabsContent value="createoredit" className="flex flex-col gap-4">
                <ReviewCreateEdit
                    tags={tags}
                    groups={groups}
                    pieces={pieces}
                    review={reviewForEdit}
                    authorId={authorId}
                />
            </TabsContent>
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
