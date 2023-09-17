import { ReviewReturnedType } from "@/contexts/ReviewsContext";
import Image from "next/image";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

type ReviewImagesProps = {
    review: ReviewReturnedType;
};
export default function ReviewImages({ review }: ReviewImagesProps) {
    if (!review.images || review.images.length <= 0) return null;
    return (
        <Carousel>
            {review.images.map((image) => (
                <div key={image.id}>
                    <img src={image.url} />
                </div>
            ))}
        </Carousel>
    );
}
