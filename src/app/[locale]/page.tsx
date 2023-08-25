import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirectIfNotAuthenticated, signOutIfBlocked } from "@/lib/protected";
import { HiOutlineLightBulb } from "react-icons/hi";
import { LoginButton, LogoutButton } from "@/components/buttons.component";
import axios from "axios";
import { useTranslations } from "next-intl";
import Header from "@/components/Header";
import { signOut } from "next-auth/react";
export default async function Home({
  params: { lang },
}: {
  params: { lang: string };
}) {
  await redirectIfNotAuthenticated();
  // await signOutIfBlocked();
  //  if user is blocked then signout
  // TODO: middleware do everything for auth and for admin page i dont know exactly know if user is blocked from main context signout ez
  const session = await getServerSession(authOptions);
  console.log(session);
  // fetch("/api/users/" + session?.user?.email)
  //   .then((res) => {
  //     return res.json();
  //   })
  //   .then((data) => {
  //     console.log(data);
  //   });
  // TODO: auth with providers not only email
  console.log(session);
  return (
    <main className="py-12 lg:py-20 px-10">
      <div className="flex justify-center items-start max-w-5xl mx-auto w-full flex-col lg:flex-row gap-7">
        <Header email={session?.user?.email || ""} />
        {session ? <LogoutButton /> : <LoginButton />}
        {JSON.stringify(session)}
        {/* left section */}
        {/* <section className="flex flex-row lg:flex-col gap-2 lg:max-w-xs w-full">
          <div className="radial-gradient rounded-lg p-6 pt-14">
            <div className="text-white">
              <h2 className="text-xl font-bold">
                Hello, {session?.user?.email}
              </h2>
              <p>Feedback board</p>
              <LoginButton />
              <LogoutButton />
            </div>
          </div>
          <div className="bg-white p-5 flex flex-wrap gap-2 text-blue-600 font-medium items-start ">
            <button className="px-3 py-1 bg-[#f2f4ff] rounded-lg">All</button>
            <button className="px-3 py-1 bg-[#f2f4ff] rounded-lg">UI</button>
            <button className="px-3 py-1 bg-[#f2f4ff] rounded-lg">UX</button>
          </div>
          <div className="bg-white p-5">
            <h3 className="text-[#3a4374] font-semibold text-xl">Roadmap</h3>
          </div>
        </section> */}
        {/* right section */}
        {/* <section className="w-full">
          <div className="bg-[#373f68] p-5 rounded-lg flex justify-between items-center text-white">
            <div className="flex gap-3 items-center">
              <HiOutlineLightBulb className="text-3xl" />
              <h3 className="text-xl font-medium">0 Suggestions</h3>
            </div>
            <button className="bg-[#ad1fea] rounded-lg py-2 px-4 font-medium">
              + Add Review
            </button>
          </div>
        </section> */}
      </div>
    </main>
  );
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
{
  /* <div>{user && JSON.stringify(user)}</div>
      <div>
        <LoginButton />
        <RegisterButton />
        <LogoutButton />
        <ProfileButton />
      </div>
      <h1>Server Session</h1>
      <pre>{JSON.stringify(session)}</pre>
      <User /> */
}
