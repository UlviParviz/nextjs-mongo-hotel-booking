"use client";
import {
  useLazyUpdateSessionQuery,
  useUpdateProfileMutation,
} from "@/redux/api/userApi";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { IUser } from "@/server/models/user.model";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import ButtonLoader from "../layout/ButtonLoader";
import { setUser } from "@/redux/features/userSlice";

interface IError {
  data?: {
    message?: string;
  };
}

const UpdateProfile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const dispatch = useAppDispatch();

  const router = useRouter();
  const [updateProfile, { isLoading, isSuccess, error }] =
    useUpdateProfileMutation();

  const [updateSession, { data }] = useLazyUpdateSessionQuery();

  if (data) dispatch(setUser(data?.user));

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const userData = { name, email };
    updateProfile(userData);
  };

  const { user: currentUser } = useAppSelector(
    (state: { auth: { user: IUser | null } }) => state.auth
  );

  useEffect(() => {
    if (currentUser) {
      setName(currentUser?.name);
      setEmail(currentUser?.email);
    }

    if (error && (error as IError).data?.message) {
      toast.error(
        (error as IError).data?.message || "An unexpected error occurred"
      );
    }
    if (isSuccess) {
      //@ts-ignore
      updateSession();
      router.refresh();
    }
  }, [currentUser, isSuccess, error]);

  return (
    <div>
      <div className="row wrapper">
        <div className="col-11 col-md-10 col-lg-8">
          <form className="shadow rounded bg-body" onSubmit={submitHandler}>
            <h2 className="mb-3 stays-heading text-center">Update Profile</h2>

            <div className="mb-3">
              <label htmlFor="name_field" className="form-label">
                Name
              </label>
              <input
                type="text"
                id="name_field"
                className="form-control"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="email_field" className="form-label">
                Email
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
              {isLoading ? <ButtonLoader /> : "Update"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;
