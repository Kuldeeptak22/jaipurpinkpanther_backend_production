import multer from "multer";
import MatchesModel from "../models/matches.model";
import { storage } from "../utils/multerFile";
import fs from "fs";
// Add Player data

const upload = multer({
  storage: storage,
});

// Add Match data
export const addMatch = (req, res) => {
  try {
    const uploadMatchData = upload.fields([
      { name: "teamOneLogo", maxCount: 1 },
      { name: "teamTwoLogo", maxCount: 1 },
    ]);

    uploadMatchData(req, res, function (err) {
      if (err) {
        return res.status(400).json({
          message: err.message,
        });
      }

      const {
        matchNo,
        teamOneName,
        teamTwoName,
        teamOneRaidPoints,
        teamTwoRaidPoints,
        teamOneTacklePoints,
        teamTwoTacklePoints,
        teamOneAllOutPoints,
        teamTwoAllOutPoints,
        teamOneExtraPoints,
        teamTwoExtraPoints,
        teamOneTotalPoints,
        teamTwoTotalPoints,
        timeAndDate,
        address,
        season,
      } = req.body; // Receive from Front End

      function formatDateToCustomFormat(dateString) {
        const date = new Date(dateString);

        // Check if the date is valid
        if (isNaN(date)) {
          return "Invalid Date";
        }

        const day = date.getDate();
        const monthNames = [
          "JANUARY",
          "FEBRUARY",
          "MARCH",
          "APRIL",
          "MAY",
          "JUNE",
          "JULY",
          "AUGUST",
          "SEPTEMBER",
          "OCTOBER",
          "NOVEMBER",
          "DECEMBER",
        ];
        const month = monthNames[date.getMonth()];
        const year = date.getFullYear();
        const hours = date.getHours();
        const minutes = date.getMinutes();

        const ampm = hours >= 12 ? "PM" : "AM";
        const formattedHours = hours % 12 || 12; // Convert to 12-hour format

        return `${day} ${month}, ${year} ${formattedHours}:${minutes.toString().padStart(2, "0")} ${ampm} IST`;
      }

      //   const originalDate = new Date(
      //     "Sat Nov 04 2023 13:31:42 GMT+0530 (India Standard Time)"
      //   );
      const originalDate = timeAndDate;
      const formattedDate = formatDateToCustomFormat(originalDate);

      let teamOneLogoImage = null;
      if (req.files["teamOneLogo"][0] !== undefined) {
        teamOneLogoImage = req.files["teamOneLogo"][0].filename;
      }
      let teamTwoLogoImage = null;
      if (req.files["teamTwoLogo"][0] !== undefined) {
        teamTwoLogoImage = req.files["teamTwoLogo"][0].filename;
      }

      // Schema Validation as per requirements
      const createMatchRecord = new MatchesModel({
        matchNo,
        teamOneName,
        teamTwoName,
        teamOneRaidPoints,
        teamTwoRaidPoints,
        teamOneTacklePoints,
        teamTwoTacklePoints,
        teamOneAllOutPoints,
        teamTwoAllOutPoints,
        teamOneExtraPoints,
        teamTwoExtraPoints,
        teamOneTotalPoints,
        teamTwoTotalPoints,
        timeAndDate: formattedDate,
        address,
        teamOneLogo: teamOneLogoImage,
        teamTwoLogo: teamTwoLogoImage,
        season,
      });
      createMatchRecord.save(); // Save inputData
      if (createMatchRecord) {
        return res.status(201).json({
          data: createMatchRecord,
          message: "Match Data has been added Successfully.",
          filepath: `${process.env.BASE_URL}/uploads`,
        });
      }
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
// Fetch All Matches Data
export const getMatches = async (req, res) => {
  try {
    const getMatchesData = await MatchesModel.find({ status: 1 });
    if (getMatchesData) {
      return res.status(200).json({
        data: getMatchesData,
        message: "SuccessFully Fetched",
        total: getMatchesData.length,
        filepath: `${process.env.BASE_URL}/uploads`,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
// // Fetch Single Match Data
export const getMatch = async (req, res) => {
  try {
    const matchID = req.params.match_id; // from front End
    const getMatchData = await MatchesModel.findOne({
      _id: matchID,
      status: 1,
    });
    if (getMatchData) {
      return res.status(200).json({
        data: getMatchData,
        message: "Successfully fetched single match data.",
        filepath: `${process.env.BASE_URL}/uploads`,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
// // Update Single Match Data
export const updateMatch = async (req, res) => {
  try {
    const updateMatchData = upload.fields([
      { name: "teamOneLogo", maxCount: 1 },
      { name: "teamTwoLogo", maxCount: 1 },
    ]);
    updateMatchData(req, res, async function (err) {
      if (err) {
        return res.status(400).json({
          message: err.message,
        });
      }
      const matchID = req.params.match_id;
      const {
        matchNo,
        teamOneName,
        teamTwoName,
        teamOneRaidPoints,
        teamTwoRaidPoints,
        teamOneTacklePoints,
        teamTwoTacklePoints,
        teamOneAllOutPoints,
        teamTwoAllOutPoints,
        teamOneExtraPoints,
        teamTwoExtraPoints,
        teamOneTotalPoints,
        teamTwoTotalPoints,
        timeAndDate,
        address,
        season,
      } = req.body;

      const existMatch = await MatchesModel.findOne({
        _id: matchID,
      });

      let teamOneLogoImage = existMatch.teamOneLogo;
      if (req.files["teamOneLogo"][0] !== undefined) {
        teamOneLogoImage = req.files["teamOneLogo"][0].filename;
        if (fs.existsSync("./uploads/matches/" + existMatch.teamOneLogo)) {
          fs.unlinkSync("./uploads/matches/" + existMatch.teamOneLogo);
        }
      }

      let teamTwoLogoImage = existMatch.teamTwoLogo;
      if (req.files["teamTwoLogo"][0] !== undefined) {
        teamTwoLogoImage = req.files["teamTwoLogo"][0].filename;
        if (fs.existsSync("./uploads/matches/" + existMatch.teamTwoLogo)) {
          fs.unlinkSync("./uploads/matches/" + existMatch.teamTwoLogo);
        }
      }

      function formatDateToCustomFormat(dateString) {
        const date = new Date(dateString);

        // Check if the date is valid
        if (isNaN(date)) {
          return "Invalid Date";
        }

        const day = date.getDate();
        const monthNames = [
          "JANUARY",
          "FEBRUARY",
          "MARCH",
          "APRIL",
          "MAY",
          "JUNE",
          "JULY",
          "AUGUST",
          "SEPTEMBER",
          "OCTOBER",
          "NOVEMBER",
          "DECEMBER",
        ];
        const month = monthNames[date.getMonth()];
        const year = date.getFullYear();
        const hours = date.getHours();
        const minutes = date.getMinutes();

        const ampm = hours >= 12 ? "PM" : "AM";
        const formattedHours = hours % 12 || 12; // Convert to 12-hour format

        return `${day} ${month}, ${year} ${formattedHours}:${minutes.toString().padStart(2, "0")} ${ampm} IST`;
      }

      //   const originalDate = new Date(
      //     "Sat Nov 04 2023 13:31:42 GMT+0530 (India Standard Time)"
      //   );
      const originalDate = timeAndDate;
      const formattedDate = formatDateToCustomFormat(originalDate);

      const updatedMatch = await MatchesModel.updateOne(
        { _id: matchID },
        {
          $set: {
            matchNo,
            teamOneName,
            teamTwoName,
            teamOneRaidPoints,
            teamTwoRaidPoints,
            teamOneTacklePoints,
            teamTwoTacklePoints,
            teamOneAllOutPoints,
            teamTwoAllOutPoints,
            teamOneExtraPoints,
            teamTwoExtraPoints,
            teamOneTotalPoints,
            teamTwoTotalPoints,
            timeAndDate: formattedDate,
            address,
            season,
            teamOneLogo: teamOneLogoImage,
            teamTwoLogo: teamTwoLogoImage,
          },
        }
      );

      if (updatedMatch.acknowledged) {
        return res.status(200).json({
          message: "Match data has Been Updated..!",
        });
      }
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};
// // Soft Delete Match Data
export const deleteMatch = async (req, res) => {
  try {
    const matchID = req.params.match_id;
    const deletedMatch = await MatchesModel.updateOne(
      { _id: matchID },
      { $set: { status: 0 } }
    );
    if (deletedMatch.acknowledged) {
      return res.status(200).json({
        message: "Match data has been Deleted",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
// // Hard delete User Data
export const removeMatch = async (req, res) => {
  try {
    const matchID = req.params.match_id;
    const existMatch = await MatchesModel.findOne({
      _id: matchID,
    });

    if (fs.existsSync("./uploads/matches/" + existMatch.teamOneLogo)) {
      fs.unlinkSync("./uploads/matches/" + existMatch.teamOneLogo);
    }
    if (fs.existsSync("./uploads/matches/" + existMatch.teamTwoLogo)) {
      fs.unlinkSync("./uploads/matches/" + existMatch.teamTwoLogo);
    }

    const deletedMatch = await MatchesModel.deleteOne({ _id: matchID });
    if (deletedMatch.acknowledged) {
      return res.status(200).json({
        message: "Match Data Deleted from Data Base",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
