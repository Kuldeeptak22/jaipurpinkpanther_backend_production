import multer from "multer";
import StandingsModel from "../models/standings.model.js";
import { storage } from "../utils/multerFile.js";
import fs from "fs";
// Add Player data

const upload = multer({
  storage: storage,
});

// Add Standing data
export const addStanding = (req, res) => {
  try {
    const uploadStandingData = upload.single("teamLogo");
    uploadStandingData(req, res, function (err) {
      if (err) {
        return res.status(400).json({
          message: err.message,
        });
      }

      const {
        teamName,
        teamRank,
        matchesPlayed,
        matchesWon,
        matchesLoss,
        matchesTie,
        scoreDifference,
        points,
      } = req.body; // Receive from Front End

      let teamLogo = null;
      if (req.file !== undefined) {
        teamLogo = req.file.filename;
      }

      // Schema Validation as per requirements
      const createStandingRecord = new StandingsModel({
        teamName,
        teamRank,
        teamLogo,
        matchesPlayed,
        matchesWon,
        matchesLoss,
        matchesTie,
        scoreDifference,
        points,
      });
      createStandingRecord.save(); // Save inputData
      if (createStandingRecord) {
        return res.status(201).json({
          data: createStandingRecord,
          message: "Standing has been added Successfully.",
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
// Fetch All Standings Data
export const getStandings = async (req, res) => {
  try {
    const getStandingsData = await StandingsModel.find({ status: 1 });
    if (getStandingsData) {
      return res.status(200).json({
        data: getStandingsData,
        message: "SuccessFully Fetched",
        total: getStandingsData.length,
        filepath: `${process.env.BASE_URL}/uploads`,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
// // Fetch Single Standing Data
export const getStanding = async (req, res) => {
  try {
    const standingID = req.params.standing_id; // from front End
    const getStandingData = await StandingsModel.findOne({
      _id: standingID,
      status: 1,
    });
    if (getStandingData) {
      return res.status(200).json({
        data: getStandingData,
        message: "Successfully fetched single standing data.",
        filepath: `${process.env.BASE_URL}/uploads`,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
// // Update Single Standing Data
export const updateStanding = async (req, res) => {
  try {
    const updateStandingData = upload.single("teamLogo");
    updateStandingData(req, res, async function (err) {
      if (err) {
        return res.status(400).json({
          message: err.message,
        });
      }
      const standingID = req.params.standing_id;
      const {
        teamName,
        teamRank,
        matchesPlayed,
        matchesWon,
        matchesLoss,
        matchesTie,
        scoreDifference,
        points,
      } = req.body;

      const existStanding = await StandingsModel.findOne({
        _id: standingID,
      });

      let teamLogo = existStanding.teamLogo;
      if (req.file) {
        teamLogo = req.file.filename;

        if (fs.existsSync("./uploads/standings/" + existStanding.teamLogo)) {
          fs.unlinkSync("./uploads/standings/" + existStanding.teamLogo);
        }
      }

      const updatedStanding = await StandingsModel.updateOne(
        { _id: standingID },
        {
          $set: {
            teamName,
            teamRank,
            matchesPlayed,
            matchesWon,
            matchesLoss,
            matchesTie,
            scoreDifference,
            points,
            teamLogo,
          },
        }
      );

      if (updatedStanding.acknowledged) {
        return res.status(200).json({
          message: "Standing data has Been Updated..!",
        });
      }
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};
// // Soft Delete Player Data
export const deleteStanding = async (req, res) => {
  try {
    const standingID = req.params.standing_id;
    const deletedStanding = await StandingsModel.updateOne(
      { _id: standingID },
      { $set: { status: 0 } }
    );
    if (deletedStanding.acknowledged) {
      return res.status(200).json({
        message: "Standing data has been Deleted",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
// // Hard delete User Data
export const removeStanding = async (req, res) => {
  try {
    const standingID = req.params.standing_id; 
    const existStanding = await StandingsModel.findOne({
      _id: standingID,
    });

    if (fs.existsSync("./uploads/standings/" + existStanding.teamLogo)) {
      fs.unlinkSync("./uploads/standings/" + existStanding.teamLogo);
    }

    const deletedStanding = await StandingsModel.deleteOne({ _id: standingID });
    if (deletedStanding.acknowledged) {
      return res.status(200).json({
        message: "Standing Data Deleted from Data Base",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
