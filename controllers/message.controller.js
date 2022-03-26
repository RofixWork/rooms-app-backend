import validator from "validator";
import { StatusCodes } from "http-status-codes";
import Message from "../models/Message.js";
const createMessage = async (req, res) => {
  const { message, user, roomId, picture } = req.body;

  if (!message.trim() || !user.trim() || !roomId.trim() || !picture.trim()) {
    res.status(StatusCodes.BAD_REQUEST);
    throw new Error("please fill data");
  }

  await Message.create({ ...req.body });

  res
    .status(StatusCodes.OK)
    .json({ success: true, message: "success, message is send" });
};
const getAllMessages = async (req, res) => {
  const messages = await Message.find({ roomId: req.params.id }).sort(
    "createdAt"
  );

  res.status(StatusCodes.OK).json({ messages });
};

export { createMessage, getAllMessages };
