import mongoose from "mongoose";
const Schema = mongoose.Schema;

const PlayerSchema = new Schema({
  firstName: {
    type: String,
    default: null,
  },
  lastName: {
    type: String,
    default: null,
  },
  role: {
    type: String,
    default: null,
  },
  dob: {
    type: String,
    default: null,
  },
  jerseyNo: {
    type: Number,
    default: null,
  },
  about: {
    type: String,
    default: null,
  },
  avatar: {
    type: String,
    default: null,
  },
  nationality: {
    type: String,
    default: null,
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

export default mongoose.model("player", PlayerSchema);
