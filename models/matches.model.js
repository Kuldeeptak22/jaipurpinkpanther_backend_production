import mongoose from "mongoose";
const Schema = mongoose.Schema;

const MatchesSchema = new Schema({
  matchNo: {
    type: Number,
    require: true,
  },
  teamOneName: {
    type: String,
    require: true,
  },
  teamTwoName: {
    type: String,
    require: true,
  },
  teamOneLogo: {
    type: String,
    require: true,
  },
  teamTwoLogo: {
    type: String,
    require: true,
  },
  teamOneRaidPoints: {
    type: Number,
    default: null,
  },
  teamTwoRaidPoints: {
    type: Number,
    default: null,
  },
  teamOneTacklePoints: {
    type: Number,
    default: null,
  },
  teamTwoTacklePoints: {
    type: Number,
    default: null,
  },
  teamOneAllOutPoints: {
    type: Number,
    default: null,
  },
  teamTwoAllOutPoints: {
    type: Number,
    default: null,
  },
  teamOneExtraPoints: {
    type: Number,
    default: null,
  },
  teamTwoExtraPoints: {
    type: Number,
    default: null,
  },
  teamOneTotalPoints: {
    type: Number,
    default: null,
  },
  teamTwoTotalPoints: {
    type: Number,
    default: null,
  },
  season: {
    type: Number,
    require: true,
  },
  timeAndDate: {
    type: String,
    require: true,
  },
  address: {
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

export default mongoose.model("Match", MatchesSchema);
