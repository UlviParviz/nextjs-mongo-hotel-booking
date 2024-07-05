"use client";

import { useRegisterMutation } from "@/redux/api/authApi";
import { useRouter } from "next/navigation";
import React, {
  ChangeEventHandler,
  FormEvent,
  useEffect,
  useState,
} from "react";
import toast from "react-hot-toast";
import ButtonLoader from "../layout/ButtonLoader";
import Link from "next/link";

interface CustomError extends Error {
  errMessage: string;
}


const Register = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const router = useRouter();

  const [show, setShow] = useState(false);
  const toggleShow = () => {
    if (show) {
      setShow(false);
    } else {
      setShow(true);
    }
  };


  const { name, email, password } = user;

  const [register, { isLoading, error, isSuccess }] = useRegisterMutation();

  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };


  useEffect(() => {
    if (error && "data" in error) {
      const errorData = error.data as CustomError;
      toast.error(errorData.errMessage);
    }

    if (isSuccess) {
      router.push("/login");
      toast.success("Registered successfully");
    }
  }, [error, isSuccess]);

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const userData = {
      name,
      email,
      password,
    };
    register(userData);
  };
  return (
    <div className="wrapper py-5 px-2">
      <div className="col-12 col-md-10 col-lg-6">
        <form className="shadow rounded bg-body" onSubmit={submitHandler}>
          <h1 className="mb-3 stays-heading text-center">Join Us</h1>

          <div className="mb-3">
            <label htmlFor="name_field" className="form-label">
              {" "}
              Full Name{" "}
            </label>
            <input
              type="text"
              id="name_field"
              className="form-control"
              name="name"
              value={name}
              onChange={onChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label" htmlFor="email_field">
              {" "}
              Email{" "}
            </label>
            <input
              type="email"
              id="email_field"
              className="form-control"
              name="email"
              value={email}
              onChange={onChange}
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
                name="password"
                value={password}
                onChange={onChange}
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

          <button
            disabled={isLoading}
            type="submit"
            className="btn btn-danger form-btn w-100 py-2"
          >
            {isLoading ? <ButtonLoader /> : "Sign Up"}
          </button>
          <div className="mt-3 mb-4">
            <Link href="/login" className="float-end">
              Already have an account? Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
