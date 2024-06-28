"use client";

import React from "react";
import RoomItem from "./RoomItem";

const Rooms = () => {
  return (
    <div>
      <section id="rooms" className="container mt-5">
        <h3 className="mb-3 ml-2 stays-heading">All Rooms</h3>
        <a href="/search" className="ml-2 back-to-search">
          <i className="fa fa-arrow-left"></i> Back to Search
        </a>
        <div className="row mt-4">
          <RoomItem />
          <RoomItem />
          <RoomItem />
          <RoomItem />
          <RoomItem />
          <RoomItem />
        </div>
      </section>
    </div>
  );
};

export default Rooms;
