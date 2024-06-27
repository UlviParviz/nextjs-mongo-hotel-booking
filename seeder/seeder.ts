import Room from "../server/models/room.model";
import mongoose from "mongoose";
import { rooms } from "./data";

const seedRooms = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/nightwing");

    await Room.deleteMany();
    console.log("Rooms are deleted");

    await Room.insertMany(rooms);
    console.log("Rooms are added");

    process.exit();
  } catch (error) {
    console.log(error);
    process.exit();
  }
};

seedRooms();
