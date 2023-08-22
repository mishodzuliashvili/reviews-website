"use client";

import { UploadButton } from "@/utils/uploadthing";
import axios from "axios";
import { useEffect } from "react";

// add file upload
// add fatabase fetch
// test if ably has rooms
// TODO: light and dark theme and 2 languages
// TODO: next auth with providers
export default function Home() {
  useEffect(() => {
    axios
      .get("/api/users")
      .then((res) => console.log(res.data))
      .catch((err) => console.error(err.response.data));
  }, []);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <UploadButton
        endpoint="imageUploader"
        onClientUploadComplete={(res) => {
          // Do something with the response
          console.log("Files: ", res);
          alert("Upload Completed");
        }}
        onUploadError={(error: Error) => {
          // Do something with the error.
          alert(`ERROR! ${error.message}`);
        }}
      />
    </main>
  );
}
