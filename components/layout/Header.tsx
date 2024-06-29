"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

const Header = () => {
  const router = useRouter();

  const handleLogoClick = (e: any) => {
    e.preventDefault();
    router.push("/");
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
                  src="/images/default_avatar.jpg"
                  alt="John Doe"
                  className="rounded-circle placeholder-glow"
                />
              </figure>
              <span className="placeholder-glow ps-1 fw-bold fs-6">
                {" "}
                John Doe
              </span>
            </button>

            <div
              className="dropdown-menu w-100"
              aria-labelledby="dropdownMenuButton1"
            >
              <a href="/admin/dashboard" className="dropdown-item">
                Dashboard
              </a>
              <a href="/bookings/me" className="dropdown-item">
                My Bookings
              </a>
              <a href="/me/update" className="dropdown-item">
                Profile
              </a>
              <a href="/" className="dropdown-item text-danger">
                Logout
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
