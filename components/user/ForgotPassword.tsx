"use client";

import { useForgotPasswordMutation } from "@/redux/api/authApi";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import ButtonLoader from "../layout/ButtonLoader";

interface CustomError extends Error {
  errMessage: string;
}

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const router = useRouter();

  const [forgotPassword, { isLoading, error, isSuccess }] =
    useForgotPasswordMutation();

  useEffect(() => {
    if (error && "data" in error) {
      const errorData = error.data as CustomError;
      toast.error(errorData.errMessage);
    }

    if (isSuccess) {
      toast.success("Email sent successfully");
      router.refresh();
    }
  }, [error, isSuccess]);

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const userData = { email };

    forgotPassword(userData);
  };
  return (
    <div className="row wrapper">
      <div className="col-10 col-lg-5">
        <form className="shadow rounded bg-body" onSubmit={submitHandler}>
        <h2 className="mb-3 stays-heading ">Forgot Password</h2>
          <div className="mb-3">
            <label htmlFor="email_field" className="form-label">
              {" "}
              Enter Email{" "}
            </label>
            <input
              type="email"
              id="email_field"
              className="form-control"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="btn form-btn w-100 py-2 btn-danger"
            disabled={isLoading}
          >
            {isLoading ? <ButtonLoader /> : "Send Email"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
