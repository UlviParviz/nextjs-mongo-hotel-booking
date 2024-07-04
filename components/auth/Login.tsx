"use client";

import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import ButtonLoader from "../layout/ButtonLoader";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);

  const router = useRouter();
  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    setLoading(false);

    if (result?.error) {
      toast.error(result.error);
    } else {
      router.replace("/");
    }
  };

  const toggleShow = () => {
    if (show) {
      setShow(false);
    } else {
      setShow(true);
    }
  };

  return (
    <div className="wrapper pb-5">
      <div className="col-12 col-md-10 col-lg-6">
        <form className="shadow rounded bg-body" onSubmit={submitHandler}>
          <h1 className="mb-3 stays-heading text-center">Login</h1>
          <div className="mb-3">
            <label className="form-label" htmlFor="email_field">
              Email
            </label>
            <input
              type="email"
              id="email_field"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-3 position-relative">
            <label className="form-label" htmlFor="password_field">
              Password
            </label>
            <div className="d-flex justify-content-center align-items-center">
              <input
                type={show ? "text" : "password"}
                id="password_field"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div
                onClick={toggleShow}
                className="d-flex position-absolute end-text z-index-2 justify-content-center align-items-center cursor-pointer"
              >
                {show ? (
                  <i
                    style={{ fontSize: "20px" }}
                    className="fa-solid fa-eye-slash cursor-pointer"
                  ></i>
                ) : (
                  <i
                    style={{ fontSize: "20px" }}
                    className="fa-solid fa-eye cursor-pointer"
                  ></i>
                )}
              </div>
            </div>
          </div>

          <Link href="/password/forgot" className="float-end mt-2">
            Forgot Password?
          </Link>

          <button
            id="login_button"
            type="submit"
            className="btn btn-danger form-btn w-100 py-2"
            disabled={loading}
          >
            {loading ? <ButtonLoader /> : "Sign in"}
          </button>

          <div className="mt-3 mb-4">
            <Link href="/register" className="float-end">
              New User? Register Here
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
