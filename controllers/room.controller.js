import validator from "validator";
import { StatusCodes } from "http-status-codes";
import Room from "../models/Room.js";
// create channel
const addChannel = async (req, res, next) => {
  const { name, roomOwner } = req.body;

  if (!name.trim() || !roomOwner.trim()) {
    res.status(StatusCodes.BAD_REQUEST);
    throw new Error("Please fill data");
  }

  if (roomOwner && !validator.isEmail(roomOwner)) {
    res.status(StatusCodes.BAD_REQUEST);
    throw new Error("email invalid format");
  }

  await Room.create({ name, roomOwner });

  res
    .status(StatusCodes.OK)
    .json({ success: true, message: "success,room is created" });
};
// all channels
const getAllChannel = async (req, res) => {
  const rooms = await Room.find({}).sort("-createdAt");

  if (!rooms) {
    res.status(StatusCodes.BAD_REQUEST);
    throw new Error("not exist any rooms");
  }

  res.status(StatusCodes.OK).json({ rooms });
};

// get room
const getRoom = async (req, res) => {
  const { id: idRoom } = req.params;

  const room = await Room.findOne({ _id: idRoom });

  res.status(StatusCodes.OK).json({ room });
};

// update channel
const updateChannel = async (req, res) => {
  const { id: idRoom } = req.params;
  const { name } = req.body;

  if (!name.trim()) {
    res.status(StatusCodes.BAD_REQUEST);
    throw new Error("Name is required");
  }

  const room = await Room.findOneAndUpdate(
    { _id: idRoom },
    { name },
    { new: true, runValidators: true }
  );
  if (!room) {
    res.status(StatusCodes.BAD_REQUEST);
    throw new Error(`not exist any room by this is: ${idRoom}`);
  }

  res
    .status(StatusCodes.OK)
    .json({ success: true, message: "success, room is updated" });
};

// delete channel
const deleteChannel = async (req, res) => {
  const { id: idRoom } = req.params;

  const room = await Room.findOneAndDelete({ _id: idRoom });
  if (!room) {
    res.status(StatusCodes.BAD_REQUEST);
    throw new Error(`not exist any room by this is: ${idRoom}`);
  }

  res
    .status(StatusCodes.OK)
    .json({ success: true, message: "success, room is deleted" });
};

export { addChannel, getAllChannel, getRoom, updateChannel, deleteChannel };
