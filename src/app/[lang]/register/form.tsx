"use client";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RegisterForm = () => {
  const [error, setError] = useState<null | string>(null);

  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const CALLBACK_URL = "/login";

  const validateForm = (values: {
    email: string;
    password: string;
    username: string;
  }) => {
    const errors: any = {};
    if (!values.email) {
      errors.email = "Required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      errors.email = "Invalid email address";
    }
    if (!values.password) {
      errors.password = "Required";
    }
    if (!values.username) {
      errors.username = "Required";
    }
    return errors;
  };

  const handleSubmit = async (
    values: {
      email: string;
      password: string;
      username: string;
    },
    { setSubmitting }: any
  ) => {
    setLoading(true);
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message);
      } else {
        toast.success("🦄 Success!", {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        setTimeout(() => {
          router.push(CALLBACK_URL);
        }, 1000);
      }
    } catch (error: any) {
      setSubmitting(false);
      setLoading(false);
      setError(error.message);
    }
  };
  return (
    <>
      <ToastContainer />
      {error && <div className="text-red-500">{error}</div>}
      <Formik
        initialValues={{ email: "", password: "", username: "" }}
        validate={validateForm}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="flex flex-col gap-3 items-start max-w-xs w-full">
            <Field
              className="border border-secondary p-3 bg-transparent outline-none w-full rounded-sm"
              placeholder="Please enter your name..."
              type="text"
              name="username"
            />
            <ErrorMessage name="name" component="div" />
            <Field
              className="border border-secondary p-3 bg-transparent outline-none w-full rounded-sm"
              placeholder="Please enter your email..."
              type="email"
              name="email"
            />
            <ErrorMessage name="email" component="div" />
            <Field
              className="border border-secondary p-3 bg-transparent outline-none w-full rounded-sm"
              placeholder="Please enter your password..."
              type="password"
              name="password"
            />
            <ErrorMessage name="password" component="div" />
            <button type="submit" disabled={isSubmitting}>
              {loading ? (
                <AiOutlineLoading3Quarters className="animate-spin text-2xl" />
              ) : (
                "Sign Up"
              )}
            </button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default RegisterForm;
