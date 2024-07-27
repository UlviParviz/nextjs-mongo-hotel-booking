"use client";
import { useDeleteRoomMutation } from "@/redux/api/roomApi";
import { IRoom } from "@/server/models/room.model";
import { MDBDataTable } from "mdbreact";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

interface Props {
  data: {
    rooms: IRoom[];
  };
}

const AllRooms = ({ data }: Props) => {
  const rooms = data?.rooms;
  const router = useRouter();
  const [deleteRoom, { error, isSuccess }] = useDeleteRoomMutation();
  const deleteRoomHandler = (id: string) => {
    deleteRoom(id);
    router.refresh();
  };
  const setRooms = () => {
    const data: { columns: any; rows: any } = {
      columns: [
        // { label: "Room ID", field: "id", sort: "asc" },
        { label: "Name", field: "name", sort: "asc" },
        { label: "Actions", field: "actions", sort: "asc" },
      ],
      rows: [],
    };

    rooms?.forEach((room) => {
      data.rows.push({
        // id: room?._id,
        name: room?.name,
        actions: (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "5px",
            }}
          >
            <Link
              style={{ width: "100%" }}
              href={`/admin/rooms/${room?._id}`}
              className="btn btn-outline-primary"
            >
              <i className="fa fa-pencil"></i>
            </Link>
            <Link
              style={{ width: "100%" }}
              href={`/admin/rooms/${room?._id}/upload_images`}
              className="btn btn-outline-success"
            >
              <i className="fa fa-images"></i>
            </Link>
            <button
              style={{ width: "100%" }}
              onClick={() => deleteRoomHandler(room._id as string)}
              className="btn btn-outline-danger"
            >
              <i className="fa fa-trash"></i>
            </button>
          </div>
        ),
      });
    });

    return data;
  };

  return (
    <div>
      <h2
        style={{ fontWeight: "-moz-initial" }}
        className="text-center my-2"
      >{`${rooms?.length} Rooms`}</h2>
      <div className="">
        <Link
          href={"/admin/rooms/new"}
          className="btn text-white form-btn btn-danger my-3"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "10px",
            width: "200px",
          }}
        >
          <span className="">Create Room</span>{" "}
          <i className="fa-brands fa-pushed"></i>
        </Link>
      </div>

      <MDBDataTable
        data={setRooms()}
        displayEntries={false}
        bordered
        striped
        hover
      />
    </div>
  );
};

export default AllRooms;
