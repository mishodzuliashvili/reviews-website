import ReviewsList from "@/components/my-ui/reviews/ReviewsList";

type ReviewsPageProps = {
    params: {};
    searchParams: { [key: string]: string | undefined };
};

export default function ReviewsPage({
    params,
    searchParams,
}: ReviewsPageProps) {
    const { searchTerm, pieceValue, tagValue, groupValue } = searchParams;
    return (
        <div>
            <ReviewsList
                sortBy="createdAt"
                searchTerm={searchTerm}
                pieceValues={pieceValue ? [pieceValue] : undefined}
                groupValues={groupValue ? [groupValue] : undefined}
                tagValues={tagValue ? [tagValue] : undefined}
            />
        </div>
    );
}
