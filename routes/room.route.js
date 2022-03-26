import express from "express";
import jwtCheck from "../auth/check-jwt.js";
import {
  addChannel,
  deleteChannel,
  getAllChannel,
  getRoom,
  updateChannel,
} from "../controllers/room.controller.js";
const router = express.Router();

router.route("/rooms").get(jwtCheck, getAllChannel);
router.route("/room/:id").get(jwtCheck, getRoom);
router.route("/room/add-room").post(jwtCheck, addChannel);
router.route("/room/update/:id").patch(jwtCheck, updateChannel);
router.route("/room/delete/:id").delete(jwtCheck, deleteChannel);
export default router;
