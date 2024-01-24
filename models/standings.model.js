import mongoose from "mongoose";
const Schema = mongoose.Schema;

const StandingsSchema = new Schema({
  teamName: {
    type: String,
    default: null,
  },
  teamRank: {
    type: Number,
    default: null,
  },
  teamLogo: {
    type: String,
    default: null,
  },
  matchesPlayed: {
    type: Number,
    default: null,
  },
  matchesWon: {
    type: Number,
    default: null,
  },
  matchesLoss: {
    type: Number,
    default: null,
  },
  matchesTie: {
    type: Number,
    default: null,
  },
  scoreDifference: {
    type: Number,
    default: null,
  },
  points: {
    type: Number,
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

export default mongoose.model("Standing", StandingsSchema);
