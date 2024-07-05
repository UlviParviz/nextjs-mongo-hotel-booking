"use client";
import { useUpdatePasswordMutation } from "@/redux/api/userApi";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import ButtonLoader from "../layout/ButtonLoader";

interface CustomError extends Error {
  errMessage: string;
}

const UpdatePassword = () => {
  const [password, setPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const router = useRouter();

  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);

  const toggleShowOld = () => {
    if (showOld) {
      setShowOld(false);
    }

    if (!showOld) {
      setShowOld(true);
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

  const [updatePassword, { isLoading, error, isSuccess }] =
    useUpdatePasswordMutation();

  useEffect(() => {
    if (error && "data" in error) {
      const errorData = error.data as CustomError;
      toast.error(errorData.errMessage);
    }

    if (isSuccess) {
      toast.success("Password updated");
      router.refresh();
    }
  }, [error, isSuccess]);

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const passwords = { password, oldPassword };

    updatePassword(passwords);
  };

  return (
    <div className="row wrapper">
      <div className="col-10 col-lg-8">
        <form className="shadow rounded bg-body" onSubmit={submitHandler}>
        <h1 className="mb-3 stays-heading text-center">Update Password</h1>

          <div className="mb-3 position-relative">
            <label className="form-label" htmlFor="old_password_field">
              Old Password
            </label>
            <div className="d-flex justify-content-center align-items-center">
              <input
                type={showOld ? "text" : "password"}
                id="old_password_field"
                className="form-control"
                name="oldPassword"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
              />
              <div
                onClick={toggleShowOld}
                className="d-flex position-absolute end-text z-index-2 justify-content-center align-items-center cursor-pointer"
              >
                {showOld ? (
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

          <div className="mb-3  position-relative">
            <label className="form-label" htmlFor="new_password_field">
              New Password
            </label>
            <div className="d-flex justify-content-center align-items-center">
              <input
                type={showNew ? "text" : "password"}
                id="new_password_field"
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

          <button
            type="submit"
            className="btn form-btn w-100 py-2 btn-danger"
            disabled={isLoading}
          >
            {isLoading ? <ButtonLoader /> : "Update Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdatePassword;
