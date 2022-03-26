import express from "express";
import {
  createMessage,
  getAllMessages,
} from "../controllers/message.controller.js";
const router = express.Router();
router.route("/messages/:id").get(getAllMessages);
router.route("/create-message").post(createMessage);

export default router;
