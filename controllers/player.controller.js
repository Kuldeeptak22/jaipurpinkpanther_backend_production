import multer from "multer";
import PlayerModel from "../models/player.model.js";
import { storage } from "../utils/multerFile.js";
import fs from "fs";
// Add Player data

const upload = multer({
  storage: storage,
});

// Add Player data
export const addPlayer = (req, res) => {
  try {
    const uploadPlayerData = upload.single("avatar");
    uploadPlayerData(req, res, function (err) {
      if (err) {
        return res.status(400).json({
          message: err.message,
        });
      }

      const { firstName, lastName, dob, about, jerseyNo, nationality, role } =
        req.body; // Receive from Front End

      function formatDateToYYYYMMDD(dateString) {
        const date = new Date(dateString);

        // Check if the date is valid
        // eslint-disable-next-line no-restricted-globals
        if (isNaN(date)) {
          return "Invalid Date";
        }

        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Note: Months are zero-based
        const day = date.getDate().toString().padStart(2, "0");

        return `${year}-${month}-${day}`;
      }
      const originalDate = dob;
      const formattedDate = formatDateToYYYYMMDD(originalDate);

      let avatar = null;
      if (req.file !== undefined) {
        avatar = req.file.filename;
      }

      // Schema Validation as per requirements
      const createPlayerRecord = new PlayerModel({
        firstName: firstName,
        lastName: lastName,
        dob: formattedDate,
        avatar: avatar,
        about: about,
        jerseyNo: jerseyNo,
        nationality: nationality,
        role: role,
      });
      createPlayerRecord.save(); // Save inputData
      if (createPlayerRecord) {
        return res.status(201).json({
          data: createPlayerRecord,
          message: "Player has been added Successfully.",
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
// Fetch All players Data
export const getPlayers = async (req, res) => {
  try {
    const getPlayersData = await PlayerModel.find({ status: 1 });
    if (getPlayersData) {
      return res.status(200).json({
        data: getPlayersData,
        message: "SuccessFully Fetched",
        total: getPlayersData.length,
        filepath: `${process.env.BASE_URL}/uploads`,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
// Fetch Single Player Data
export const getPlayer = async (req, res) => {
  try {
    const playerID = req.params.player_id; // from front End
    const getPlayerData = await PlayerModel.findOne({
      _id: playerID,
      status: 1,
    });
    if (getPlayerData) {
      return res.status(200).json({
        data: getPlayerData,
        message: "Successfully fetched single Player data.",
        filepath: `${process.env.BASE_URL}/uploads`,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
// Update Single Player Data
export const updatePlayer = async (req, res) => {
  try {
    const updatePlayerData = upload.single("avatar");
    updatePlayerData(req, res, async function (err) {
      if (err) {
        return res.status(400).json({
          message: err.message,
        });
      }
      const playerID = req.params.player_id;
      const { firstName, lastName, dob, about, jerseyNo, nationality,role } =
        req.body;

      const existPlayer = await PlayerModel.findOne({
        _id: playerID,
      });

      let avatar = existPlayer.avatar;
      if (req.file) {
        avatar = req.file.filename;

        if (fs.existsSync("./uploads/players/" + existPlayer.avatar)) {
          fs.unlinkSync("./uploads/players/" + existPlayer.avatar);
        }
      }

      const updatedPlayer = await PlayerModel.updateOne(
        { _id: playerID },
        {
          $set: {
            firstName,
            lastName,
            dob,
            about,
            jerseyNo,
            nationality,
            avatar,
            role
          },
        }
      );

      if (updatedPlayer.acknowledged) {
        return res.status(200).json({
          message: "Player data has Been Updated..!",
        });
      }
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};
// Soft Delete Player Data
export const deletePlayer = async (req, res) => {
  try {
    const playerID = req.params.player_id;
    const deletedPlayer = await PlayerModel.updateOne(
      { _id: playerID },
      { $set: { status: 0 } }
    );
    if (deletedPlayer.acknowledged) {
      return res.status(200).json({
        message: "Player data has been Deleted",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
// Hard delete User Data
export const removePlayer = async (req, res) => {
  try {
    const playerID = req.params.player_id;
    const existPlayer = await PlayerModel.findOne({
      _id: playerID,
    });

    if (fs.existsSync("./uploads/players/" + existPlayer.avatar)) {
      fs.unlinkSync("./uploads/players/" + existPlayer.avatar);
    }

    const deletedPlayer = await PlayerModel.deleteOne({ _id: playerID });
    if (deletedPlayer.acknowledged) {
      return res.status(200).json({
        message: "Player Data Deleted from Data Base",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
