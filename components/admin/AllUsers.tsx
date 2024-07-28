"use client";
import { useDeleteUserMutation } from "@/redux/api/userApi";
import { IUser } from "@/server/models/user.model";
import { MDBDataTable } from "mdbreact";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import toast from "react-hot-toast";
interface Props {
  data: {
    users: IUser[];
  };
}

interface CustomError extends Error {
  errMessage: string;
}

const AllUsers = ({ data }: Props) => {
  const users = data?.users;
  const router = useRouter();
  const [deleteUser, { error, isLoading, isSuccess }] = useDeleteUserMutation();
  const deleteUserHandler = (id: string) => {
    deleteUser(id);
  };
  useEffect(() => {
    if (error && "data" in error) {
      const errorData = error.data as CustomError;
      toast.error(errorData.errMessage);
    }
    if (isSuccess) {
      toast.success("User deleted successfully");
      router.refresh();
    }
  }, [error, isSuccess]);
  const setUsers = () => {
    const data: { columns: any; rows: any } = {
      columns: [
        { label: "Name", field: "name", sort: "asc" },
        { label: "Email", field: "email", sort: "asc" },
        { label: "Role", field: "role", sort: "asc" },
        { label: "Actions", field: "actions", sort: "asc" },
      ],
      rows: [],
    };

    users?.forEach((user) => {
      data.rows.push({
        name: user?.name,
        email: user?.email,
        role: user?.role,
        actions: (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "5px",
            }}
          >
            <Link
              style={{ width: "100%" }}
              href={`/admin/users/${user?._id}`}
              className="btn btn-outline-primary"
            >
              <i className="fa fa-pencil"></i>
            </Link>
            <button
              style={{ width: "100%" }}
              disabled={isLoading}
              onClick={() => deleteUserHandler(user?._id as string)}
              className="btn btn-outline-danger"
            >
              <i className="fa fa-trash"></i>
            </button>
          </div>
        ),
      });
    });

    return data;
  };

  return (
    <div>
      <h2
        style={{ fontWeight: "-moz-initial" }}
        className="text-center my-2"
      >{`${users?.length} Users`}</h2>

      <MDBDataTable
        data={setUsers()}
        displayEntries={false}
        bordered
        striped
        hover
      />
    </div>
  );
};

export default AllUsers;
