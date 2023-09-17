"use client";
import ReactToPrint from "react-to-print";
import { useRef } from "react";
import { FiPrinter } from "react-icons/fi";
import ReviewPrinting from "./ReviewPrinting";
import { ReviewReturnedType } from "@/contexts/ReviewsContext";

type ReviewPrintButtonProps = {
    review: ReviewReturnedType;
};

export default function ReviewPrintButton({ review }: ReviewPrintButtonProps) {
    const componentRef = useRef<HTMLDivElement>(null);

    return (
        <>
            <ReviewPrinting review={review} ref={componentRef} />
            <ReactToPrint
                trigger={() => (
                    <button className="flex w-full">
                        <FiPrinter className="mr-2 h-4 w-4" />
                        Print
                    </button>
                )}
                content={() => componentRef.current || null}
            />
        </>
    );
}
