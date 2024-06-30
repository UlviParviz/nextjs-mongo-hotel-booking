import React from "react";
import Login from "@/components/auth/Login";

export const metadata = {
  title: "Login Page - Bookly",
};

const LoginPage = () => {
  return (
    <div className="px-2">
      <Login />
    </div>
  );
};

export default LoginPage;
