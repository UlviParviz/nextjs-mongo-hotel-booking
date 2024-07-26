"use client";

import React from "react";
import RoomItem from "./room/RoomItem";
import { IRoom } from "@/server/models/room.model";
import CustomPagination from "./layout/CustomPagination";
import Rooms from "./room/Rooms";
import Banner from "./Banner";
import { useSearchParams } from "next/navigation";

interface Props {
  data: {
    success: boolean;
    resPerPage: number;
    filteredRoomsCount: number;
    rooms: IRoom[];
  };
}
const Home = ({ data }: Props) => {
  const searchParams = useSearchParams();
  const location = searchParams.get("location");
  const guest = searchParams.get("guestCapacity");
  const category = searchParams.get("category");
  return (
    <div>
      {location || guest || category ? <div></div> : <Banner />}
      <Rooms data={data} />
    </div>
  );
};

export default Home;
