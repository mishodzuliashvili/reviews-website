"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { FiEdit } from "react-icons/fi";

export default function EditButton({ reviewId }: { reviewId: string }) {
    const router = useRouter();
    return (
        <Button
            variant="outline"
            onClick={() => {
                router.push(`/profile?reviewForEdit=${reviewId}`);
            }}
        >
            <FiEdit />
        </Button>
    );
}
