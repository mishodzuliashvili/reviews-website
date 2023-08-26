"use client";
import { signOut } from "next-auth/react";
import { useMain } from "../mainContext";
import { useTranslations } from "next-intl";
import Image from "next/image";

export default function Home() {
  const { user } = useMain();
  const t = useTranslations("Index");

  return <main></main>;
}

{
  /* <p>{langDictionary[lang].homeHeader}</p>
      <ThemeSwitch />
      <LanguageSwitcher lang={lang} />
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
      /> */
}
