import mongoose from "mongoose";

const RoomSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    roomOwner: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Room", RoomSchema);
