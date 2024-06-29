"use client"

import { IRoom } from "@/server/models/room.model";
import React from "react";

interface Props {
  room: IRoom;
}

const RoomFeatures = ({ room }: Props) => {
  return (
    <div className="features mt-5">
      <h3 className="mb-4">Features:</h3>
      <div className="room-feature">
        <i aria-hidden className="fa fa-cog fa-fw fa-users"></i>
        <p>{room?.guestCapacity} Guests</p>
      </div>
      <div className="room-feature">
        <i aria-hidden className="fa fa-cog fa-fw fa-bed" ></i>
        <p>{room?.numOfBeds} Beds</p>
      </div>
      <div className="room-feature">
        <i aria-hidden
          className={
            room?.isBreakfast
              ? "fa fa-check text-success"
              : "fa fa-times text-danger"
          }
        ></i>
        <p>Breakfast</p>
      </div>
      <div className="room-feature">
        <i
          className={
            room?.isInternet
              ? "fa fa-check text-success"
              : "fa fa-times text-danger"
          }
          aria-hidden
        ></i>
        <p>Internet</p>
      </div>
      <div className="room-feature">
        <i
          className={
            room?.isAirConditioned
              ? "fa fa-check text-success"
              : "fa fa-times text-danger"
          }
          aria-hidden
        ></i>
        <p>Air Conditioned</p>
      </div>
      <div className="room-feature">
        <i
          className={
            room?.isPetsAllowed
              ? "fa fa-check text-success"
              : "fa fa-times text-danger"
          }
          aria-hidden
        ></i>
        <p>Pets Allowed</p>
      </div>
      <div className="room-feature">
        <i
          className={
            room?.isRoomCleaning
              ? "fa fa-check text-success"
              : "fa fa-times text-danger"
          }
          aria-hidden
        ></i>
        <p>Room Cleaning</p>
      </div>
    </div>
  );
};

export default RoomFeatures;