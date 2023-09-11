import ReviewsList from "@/components/my-ui/reviews/ReviewsList";

type SearchPageProps = {
    params: {
        id: string;
    };
};
export default function SearchPage({ params: { id } }: SearchPageProps) {
    return (
        <div>
            <ReviewsList searchTerm={id} sortBy="createdAt" />
        </div>
    );
}
