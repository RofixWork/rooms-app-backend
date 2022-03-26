import dotenv from "dotenv";
dotenv.config();
import "express-async-errors";
import express from "express";
import errorHandler from "./middlewares/error-handler.js";
import notFound from "./middlewares/not-found.js";
import connectDB from "./db/connect.js";
import routerHome from "./routes/room.route.js";
import routerMessage from "./routes/message.route.js";
import jwtCheck from "./auth/check-jwt.js";
import cors from "cors";
import Pusher from "pusher";
import mongoose from "mongoose";
const app = express();

const pusher = new Pusher({
  appId: "1365436",
  key: "dcd11c74e615ba954f7b",
  secret: "250879d3ba3c062cd207",
  cluster: "eu",
  useTLS: true,
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
// routers
app.use("/api/v1", routerHome);
app.use("/api/v1", jwtCheck, routerMessage);

// middlewares
app.use(notFound);
app.use(errorHandler);

const db = mongoose.connection;

db.once("open", () => {
  const roomsCollection = db.collection("rooms");
  const roomsStream = roomsCollection.watch();

  roomsStream.on("change", (change) => {
    if (change.operationType === "insert") {
      const room = change.fullDocument;
      pusher.trigger("rooms", "inserted", {
        ...room,
      });
    } else if (change.operationType === "delete") {
      pusher.trigger("rooms", "deleted", {
        message: "room is deleted",
      });
    } else if (change.operationType === "update") {
      pusher.trigger("rooms", "updated", {
        message: "room is updated",
      });
    }
  });

  const messagesColelction = db.collection("messages");
  const messagesStream = messagesColelction.watch();

  messagesStream.on("change", (change) => {
    if (change.operationType === "insert") {
      const message = change.fullDocument;
      pusher.trigger("messages", "inserted", {
        ...message,
      });
    }
  });
});

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`server listening on port ${port}`));
  } catch (error) {
    console.log(error.message);
  }
};
start();

export default app;
