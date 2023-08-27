import { createNextRouteHandler } from "uploadthing/next";

import { ourFileRouter } from "./core";

export const { GET, POST } = createNextRouteHandler({
  router: ourFileRouter,
});

// <UploadButton
// endpoint="imageUploader"
// onClientUploadComplete={(res) => {
//   // Do something with the response
//   console.log("Files: ", res);
//   alert("Upload Completed");
// }}
// onUploadError={(error: Error) => {
//   // Do something with the error.
//   alert(`ERROR! ${error.message}`);
// }}
// /> */
