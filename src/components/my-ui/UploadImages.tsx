import { UploadDropzone } from "@/lib/uploadthing";
import "@uploadthing/react/styles.css";
import { UploadFileResponse } from "uploadthing/client";

export default function UploadImages({
  onUploadComplete,
}: {
  onUploadComplete: (im: UploadFileResponse[]) => void;
}) {
  return (
    <UploadDropzone
      endpoint="imageUploader"
      onClientUploadComplete={(data) => {
        if (data) {
          onUploadComplete(data);
        }
      }}
      onUploadError={(error: Error) => {
        // Do something with the error.
        alert(`ERROR! ${error.message}`);
      }}
    />
  );
}
