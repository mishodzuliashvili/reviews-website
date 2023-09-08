import { type Image } from "@prisma/client";
import NextImage from "next/image";

type ReviewImagesProps = {
    images: Image[];
};
export default function ReviewImages({ images }: ReviewImagesProps) {
    return (
        <div>
            {images.length > 0 && <br />}
            {images.map((image) => (
                <NextImage
                    key={image.id}
                    src={image.url}
                    alt="review image"
                    width={400}
                    height={400}
                />
            ))}
        </div>
    );
}
