"use client";

import { useUpdateUserMutation } from "@/redux/api/userApi";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import ButtonLoader from "../layout/ButtonLoader";
import { toast } from "react-hot-toast";
import { IUser } from "@/server/models/user.model";

interface Props {
  data: {
    user: IUser;
  };
}

interface CustomError extends Error {
  errMessage: string;
}

const UpdateUser = ({ data }: Props) => {
  const [name, setName] = useState(data?.user?.name);
  const [email, setEmail] = useState(data?.user?.email);
  const [role, setRole] = useState(data?.user?.role);

  const router = useRouter();

  const [updateUser, { error, isSuccess, isLoading }] = useUpdateUserMutation();

  useEffect(() => {
    console.log(error);

    if (error && "data" in error) {
      const errorData = error.data as CustomError;
      toast.error(errorData.errMessage);
    }

    if (isSuccess) {
      toast.success("User Updated");
      router.push("/admin/users");
      router.refresh();
    }
  }, [error, isSuccess]);

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const userData = {
      name,
      email,
      role,
    };

    updateUser({ id: data?.user?._id, body: userData });
  };

  return (
    <div className="row wrapper">
      <div className="col-12">
        <form className="shadow rounded bg-body" onSubmit={submitHandler}>
          <h2 className="mb-4">Update User</h2>

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
              required
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
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="role_field" className="form-label">
              Role
            </label>
            <select
              id="role_field"
              className="form-select"
              name="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            >
              <option value="user">user</option>
              <option value="admin">admin</option>
            </select>
          </div>

          <button
            type="submit"
            className="btn form-btn w-100 mt-4 mb-3 btn-danger"
            disabled={isLoading}
          >
            {isLoading ? <ButtonLoader /> : "Update User"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateUser;
