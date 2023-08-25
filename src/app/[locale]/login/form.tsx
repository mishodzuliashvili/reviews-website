"use client";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { signIn } from "next-auth/react";
import { useSearchParams, useRouter } from "next/navigation";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { SignInError, getSignInErrorMessage } from "./signInError";
const CALLBACK_URL = "/";

const LoginForm = () => {
  const searchParams = useSearchParams();

  const [error, setError] = useState<null | string>(
    getSignInErrorMessage(searchParams.get("error"))
  );
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const validateForm = (values: { email: string; password: string }) => {
    const errors: any = {};
    if (!values.email) {
      errors.email = "Required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      errors.email = "Invalid email address";
    }
    if (!values.password) {
      errors.password = "Required";
    }
    return errors;
  };

  const handleSubmit = (
    values: {
      email: string;
      password: string;
    },
    { setSubmitting }: any
  ) => {
    setLoading(true);
    setError(null);
    const { email, password } = values;
    signIn("credentials", {
      redirect: false,
      email,
      password,
      callbackUrl: CALLBACK_URL,
    }).then((res: any) => {
      if (res?.error) {
        setSubmitting(false);
        setLoading(false);
        setError(res.error);
      } else {
        // router.push(CALLBACK_URL);
        window.location.replace(CALLBACK_URL);
      }
    });
  };
  return (
    <>
      <Formik
        initialValues={{ email: "", password: "" }}
        validate={validateForm}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="flex flex-col gap-3 items-start w-full">
            {error && <SignInError errorMessage={error} />}
            <Field
              className="border border-gray-200 rounded-lg p-3 outline-none w-full"
              placeholder="Please enter your email..."
              type="email"
              name="email"
            />
            <ErrorMessage name="email" component="div" />
            <Field
              className="border border-gray-200 rounded-lg p-3 outline-none w-full"
              placeholder="Please enter your password..."
              type="password"
              name="password"
            />
            <ErrorMessage name="password" component="div" />
            <button
              className="bg-[black] text-white py-3 px-5 flex gap-1 items-center font-medium rounded-full"
              type="submit"
              disabled={isSubmitting}
            >
              {loading ? (
                <AiOutlineLoading3Quarters className="animate-spin text-2xl" />
              ) : (
                "Sign In"
              )}
            </button>
            <p>Or sign in with</p>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => signIn("google")}
                className="bg-[#4285F4] text-white py-3 px-5 flex gap-1 items-center font-medium rounded-full"
              >
                <FaGoogle />
                oogle
              </button>
              <button
                type="button"
                onClick={() => signIn("github")}
                className="bg-[#1c1c1c] text-white py-3 px-5 flex gap-1 items-center font-medium rounded-full"
              >
                <FaGithub />
                Github
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default LoginForm;
