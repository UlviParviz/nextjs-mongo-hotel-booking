"use client";
import { log } from "console";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

const Header = () => {
  const { data } = useSession();
  const router = useRouter();

  const handleLogoClick = (e: any) => {
    e.preventDefault();
    router.push("/");
  };

  console.log(data?.user);

  const logoutHandler = () => {
    signOut();
  };

  return (
    <nav className="navbar sticky-top p-0">
      <div className="container">
        <div className="col-6 col-lg-3 p-0">
          <div className="navbar-brand p-0">
            <Link href="/" passHref>
              <img
                onClick={handleLogoClick}
                style={{ cursor: "pointer" }}
                src="./images/logo_size.jpg"
                alt="Bookly"
                width={`110px`}
                height={`105px`}
              />
            </Link>
          </div>
        </div>

        <div className="col-6 col-lg-3 mt-md-0 text-end">
          {data?.user ? (
            <div className="ml-4 dropdown d-line">
              <button
                className="btn dropdown-toggle"
                type="button"
                id="dropdownMenuButton1"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <figure className="avatar avatar-nav">
                  <img
                    src={
                      data?.user?.avatar
                        ? data?.user?.avatar?.url
                        : "/images/default_avatar.jpg"
                    }
                    alt={`${data?.user?.name}`}
                    className="rounded-circle placeholder-glow"
                  />
                </figure>
                <span className="placeholder-glow ps-1 fw-bold fs-6 text-capitalize">
                  {" "}
                  {data?.user?.name}
                </span>
              </button>

              <div
                className="dropdown-menu w-100"
                aria-labelledby="dropdownMenuButton1"
              >
                <Link href="/admin/dashboard" className="dropdown-item">
                  Dashboard
                </Link>
                <Link href="/bookings/me" className="dropdown-item">
                  My Bookings
                </Link>
                <Link href="/me/update" className="dropdown-item">
                  Profile
                </Link>
                <Link
                  href="/"
                  className="dropdown-item text-danger"
                  onClick={logoutHandler}
                >
                  Logout
                </Link>
              </div>
            </div>
          ) : (
            <>
              {data === undefined && (
                <div className="placeholder-glow">
                  <figure className="avatar avatar-nv placeholder bg-secondary"></figure>
                  <span className="placeholder w-25 bg-secondary ms-2"></span>
                </div>
              )}
              {data === null && (
                <Link
                  href="/login"
                  className="btn btn-danger px-4 text-white login-header-btn float-right"
                >
                  Login
                </Link>
              )}
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
