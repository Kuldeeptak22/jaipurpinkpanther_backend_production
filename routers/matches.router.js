import express from "express";
import { addMatch, deleteMatch, getMatch, getMatches, removeMatch, updateMatch } from "../controllers/matches.controller.js";

const router = express.Router();

router.post("/add_Match", addMatch);
router.get("/get_Matches", getMatches);
router.get("/get_Match/:match_id", getMatch);
router.put("/update_Match/:match_id", updateMatch);
router.delete("/delete_Match/:match_id", deleteMatch);
router.delete("/remove_Match/:match_id", removeMatch);

export default router;
