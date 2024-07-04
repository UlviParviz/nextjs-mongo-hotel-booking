"use client"
import Link from "next/link";
import React, { useState } from "react";

const UserSidebar = () => {
  const menuItem = [
    {
      name: "Update Profile",
      url: "/me/update",
      icon: "fa fa-user",
    },
    {
      name: "Upload Avatar",
      url: "/me/upload_avatar",
      icon: "fa fa-user-circle",
    },
    {
      name: "Update Password",
      url: "/me/update_password",
      icon: "fa fa-lock",
    },
  ];

  const [activeMenuItem, setActiveMenuItem] = useState(menuItem[0].name);

  const handleMenuItemClick = (menuItem: string) => {
    setActiveMenuItem(menuItem);
  };
  return (
    <div className="list-group mt-5 pl-4">
      {menuItem?.map((item, index) => (
        <Link
          href={item?.url}
          key={index}
          className={`fw-bold list-group-item list-group-item-action ${
            activeMenuItem === item.name ? "active" : ""
          }`}
          aria-current={activeMenuItem === item.name ? "true" : "false"}
          onClick={() => handleMenuItemClick(item.name)}
        >
          <i className={`${item?.icon} fa-fw pe-2`}></i>
          {item?.name}
        </Link>
      ))}
    </div>
  );
};

export default UserSidebar;
