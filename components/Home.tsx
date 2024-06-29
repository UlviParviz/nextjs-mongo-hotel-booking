import React from "react";
import RoomItem from "./room/RoomItem";
import { IRoom } from "@/server/models/room.model";
import CustomPagination from "./layout/CustomPagination";
import Rooms from "./room/Rooms";

interface Props {
  data: {
    success: boolean;
    resPerPage: number;
    filteredRoomsCount: number;
    rooms: IRoom[];
  };
}
const Home = ({ data }: Props) => {
  return (
    <div>
      <Rooms data={data} />
    </div>
  );
};

export default Home;
