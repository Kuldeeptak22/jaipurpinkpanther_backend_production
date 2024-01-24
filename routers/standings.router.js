import express from "express";
import { addStanding, deleteStanding, getStanding, getStandings, removeStanding, updateStanding } from "../controllers/standings.controller";
const router = express.Router();

router.post("/add_Standing", addStanding);
router.get("/get_Standings", getStandings);
router.get("/get_Standing/:standing_id", getStanding);
router.put("/update_Standing/:standing_id", updateStanding);
router.delete("/delete_Standing/:standing_id", deleteStanding);
router.delete("/remove_Standing/:standing_id", removeStanding);

export default router;
