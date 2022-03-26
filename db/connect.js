import mongoose from "mongoose";

const connectDB = async (url) => {
  return mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};
export default connectDB;
