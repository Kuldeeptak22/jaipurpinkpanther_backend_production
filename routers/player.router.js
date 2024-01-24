import express from "express";
import {
  addPlayer,
  deletePlayer,
  getPlayer,
  getPlayers,
  removePlayer,
  updatePlayer,
} from "../controllers/player.controller.js";
const router = express.Router();

router.post("/add_player", addPlayer);
router.get("/get_Players", getPlayers);
router.get("/get_player/:player_id", getPlayer);
router.put("/update_player/:player_id", updatePlayer);
router.delete("/delete_player/:player_id", deletePlayer);
router.delete("/remove_player/:player_id", removePlayer);


export default router;
