import ReviewsList from "@/components/my-ui/reviews/ReviewsList";

type TagsPageProps = {
    params: {
        id: string;
    };
};
export default function TagsPage({ params: { id } }: TagsPageProps) {
    return (
        <div>
            <ReviewsList sortBy="createdAt" tagValues={[id]} />
        </div>
    );
}
