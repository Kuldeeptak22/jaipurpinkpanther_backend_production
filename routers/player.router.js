import express from "express";
import {
  addPlayer,
  deletePlayer,
  getPlayer,
  getPlayers,
  removePlayer,
  updatePlayer,
} from "../controllers/player.controller";
const router = express.Router();

router.post("/add_player", addPlayer);
router.get("/get_Players", getPlayers);
router.get("/get_player/:player_id", getPlayer);
router.put("/update_player/:player_id", updatePlayer);
router.delete("/delete_player/:player_id", deletePlayer);
router.delete("/remove_player/:player_id", removePlayer);

// // Authentication API :-
// router.post("/sign_up", signUpUser);
// router.post("/sign_in", signInUser);

// // Send OTP
// router.post("/send_otp", createAndSendOTP);
// router.post("/sign_with_otp", signInWithOTP);

export default router;
