"use client";
import React from "react";
import { IRoom } from "@/server/models/room.model";
import CustomPagination from "../layout/CustomPagination";
import RoomItem from "./RoomItem";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

interface Props {
  data: {
    success: boolean;
    resPerPage: number;
    filteredRoomsCount: number;
    rooms: IRoom[];
  };
}
const Rooms = ({ data }: Props) => {
  const searchParams = useSearchParams();
  const location = searchParams.get("location");

  const { rooms, resPerPage, filteredRoomsCount } = data;
  return (
    <div>
      <section id="rooms" className="container mt-5">
        <h5 className="stays-heading text-center ">
          {location
            ? `${filteredRoomsCount} Room Found In ${location}`
            : "All Rooms"}
        </h5>
        <div className="d-flex justify-content-end sm-mt-2">
          <Link href="/search" className="back-to-search">
            {location ? (
              <h5 className="stays-heading d-flex gap-2 align-items-center">
                <i aria-hidden className="fa fa-arrow-left"></i> <span>Back to Search</span>
              </h5>
            ) : (
              <h5 className="stays-heading d-flex gap-2 align-items-center">
                <span className="">Search</span>
                <i aria-hidden className="fa-solid fa-search"></i>
              </h5>
            )}
          </Link>
        </div>
        <div className="row mt-4">
          {rooms?.length === 0 ? (
            <div className="alert alert-danger mt-5 alertDiv">
              <b>No Rooms.</b>
            </div>
          ) : (
            rooms?.map((room, index) => <RoomItem key={index} room={room} />)
          )}
        </div>
      </section>
      <CustomPagination
        resPerPage={resPerPage}
        filteredRoomsCount={filteredRoomsCount}
      />
    </div>
  );
};

export default Rooms;
