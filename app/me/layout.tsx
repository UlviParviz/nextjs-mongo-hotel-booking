"use client"
import UserSidebar from "@/components/layout/UserSidebar";
import React from "react";
interface Props{
    children: React.ReactNode;
  
}
const UserLayout = ({children}: Props) => {
  return (
    <div>
      <div className="mt-2 mb-4 bg-light py-4">
      <h1 className="mb-3 stays-heading text-center">User Settings</h1>
        
      </div>
      <div className="container">
        <div className="row justify-content-around">
          <div className="col-11 col-lg-3">
            <UserSidebar/>
          </div>
          <div className="col-12 col-lg-8 user-dashboard">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default UserLayout;
