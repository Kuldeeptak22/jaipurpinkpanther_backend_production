import mongoose from "mongoose";
const Schema = mongoose.Schema;

const NewsSchema = new Schema({
  title: {
    type: String,
    require: true,
  },
  image: {
    type: String,
    require: true,
  },
  newsDate: {
    type: String,
    require: true,
  },
  newsDescription: {
    type: String,
    require: true,
  },
  status: {
    type: Number,
    default: 1,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

export default mongoose.model("news", NewsSchema);
