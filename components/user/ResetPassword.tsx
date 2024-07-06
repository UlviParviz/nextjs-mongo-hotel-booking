"use client";

import { useResetPasswordMutation } from "@/redux/api/authApi";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import ButtonLoader from "../layout/ButtonLoader";

interface CustomError extends Error {
  errMessage: string;
}

interface Props {
  token: string;
}
const ResetPassword = ({ token }: Props) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const router = useRouter();

  const [resetPassword, { error, isSuccess, isLoading }] =
    useResetPasswordMutation();

  const [showConfirm, setShowConfirm] = useState(false);
  const [showNew, setShowNew] = useState(false);

  const toggleShowConfirm = () => {
    if (showConfirm) {
      setShowConfirm(false);
    }

    if (!showConfirm) {
      setShowConfirm(true);
    }
  };
  const toggleShowNew = () => {
    if (showNew) {
      setShowNew(false);
    }

    if (!showNew) {
      setShowNew(true);
    }
  };

  useEffect(() => {
    if (error && "data" in error) {
      const errorData = error.data as CustomError;
      toast.error(errorData.errMessage);
    }

    if (isSuccess) {
      toast.success("Password reset was successful");
      router.push("/login");
    }
  }, [error, isSuccess]);

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const passwords = {
      password,
      confirmPassword,
    };

    resetPassword({ token, body: passwords });
  };
  return (
    <div className="row wrapper">
      <div className="col-10 col-lg-5">
        <form className="shadow rounded bg-body" onSubmit={submitHandler}>
          <h2 className="mb-4">New Password</h2>

          <div className="mb-3 position-relative">
            <label htmlFor="password_field" className="form-label">
              {" "}
              Password{" "}
            </label>
            <div className="d-flex justify-content-center align-items-center">
              <input
                type={showNew ? "text" : "password"}
                id="password_field"
                className="form-control"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div
                onClick={toggleShowNew}
                className="d-flex position-absolute end-text z-index-2 justify-content-center align-items-center cursor-pointer"
              >
                {showNew ? (
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

          <div className="mb-3 position-relative">
            <label htmlFor="confirm_password_field" className="form-label">
              Confirm Password
            </label>
            <div className="d-flex justify-content-center align-items-center">
              <input
                type={showConfirm ? "text" : "password"}
                id="confirm_password_field"
                className="form-control"
                name="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <div
                onClick={toggleShowConfirm}
                className="d-flex position-absolute end-text z-index-2 justify-content-center align-items-center cursor-pointer"
              >
                {showConfirm ? (
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

          <button
            type="submit"
            className="btn form-btn w-100 py-2 btn-danger"
            disabled={isLoading}
          >
            {isLoading ? <ButtonLoader /> : "Set Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
