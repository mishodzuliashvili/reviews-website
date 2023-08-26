import Link from "next/link";
import RegisterForm from "./form";

export default async function Register({
  params: { lang },
}: {
  params: { lang: string };
}) {
  return (
    <div>
      <div className="p-5 flex flex-col gap-3 items-start">
        <h2 className="font-bold text-2xl">Register for an account</h2>
        <p className="text-tsecondary">
          {"Have an account? "}
          <Link className="underline" href="/login">
            Sign in
          </Link>
        </p>
        <RegisterForm />
      </div>
    </div>
  );
}
