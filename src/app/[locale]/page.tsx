import ReviewCard from "@/components/my-ui/reviews/ReviewCard";
import { searchFullText } from "@/prisma-functions/reviews";
import { redirect } from "next/navigation";

export const revalidate = 0;

type Props = {
    params: {};
    searchParams: { [key: string]: string };
};

export default async function Home(props: Props) {
    // const recentReviews = await getRecentReviews();
    const searchParams = props.searchParams;
    const searchText = searchParams.searchText;
    const searchedRevies = await searchFullText(searchText);

    // async function create(formData: FormData) {
    //     "use server";
    //     redirect(`/ka?searchText=${formData.get("searchText")}`);
    // }

    return (
        <main className="px-5 flex flex-col gap-3">
            {/* <form>
                <input
                    type="text"
                    name="searchText"
                    className="p-5 w-full border"
                    placeholder="Yep Yep"
                />
            </form> */}
            {searchedRevies.map((review) => (
                <ReviewCard key={review.id} review={review} />
            ))}
        </main>
    );
}
