import Link from "next/link";
import LoginForm from "./form";
import { redirectIfAuthenticated, signOutIfBlocked } from "@/lib/protected";

export default async function Login({
  params: { lang },
}: {
  params: { lang: string };
}) {
  // await redirectIfAuthenticated();
  return (
    <div className="">
      <div className="lg:mt-10 bg-white w-full max-w-xl mx-auto shadow-slate-200 shadow-sm rounded-lg p-5">
        <header>
          <h2 className="text-xl font-bold">Sign in</h2>
          <p className="text-tsecondary">
            {"Dont Have an account? "}
            <Link className="underline" href="/register">
              Sign Up
            </Link>
          </p>
        </header>
        <section className="mt-5">
          <LoginForm />
        </section>
      </div>
    </div>
  );
}
