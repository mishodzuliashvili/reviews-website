import { UploadDropzone } from "@/lib/uploadthing";
import { useTheme } from "next-themes";
import { UploadFileResponse } from "uploadthing/client";
// import "@uploadthing/react/styles.css";

export default function UploadImages({
    onUploadComplete,
}: {
    onUploadComplete: (im: UploadFileResponse[]) => void;
}) {
    const { theme } = useTheme();
    return (
        <UploadDropzone
            appearance={{
                uploadIcon: {
                    color: theme === "light" ? "black" : "white",
                },
                button: {
                    backgroundColor: theme === "light" ? "black" : "white",
                    color: theme === "light" ? "white" : "black",
                    padding: "0.5rem 1rem",
                },
            }}
            className="p-5 cursor-pointer"
            endpoint="imageUploader"
            onClientUploadComplete={(data) => {
                if (data) {
                    onUploadComplete(data);
                }
            }}
            onUploadError={(error: Error) => {
                alert(`ERROR! ${error.message}`);
            }}
        />
    );
}
