import express from "express";
import {
  addNews,
  deleteNews,
  getAllNews,
  getNews,
  removeNews,
  updateNews,
} from "../controllers/news.controller.js";

const router = express.Router();

router.post("/add_News", addNews);
router.get("/get_all_News", getAllNews);
router.get("/get_News/:news_id", getNews);
router.put("/update_News/:news_id", updateNews);
router.delete("/delete_News/:news_id", deleteNews);
router.delete("/remove_News/:news_id", removeNews);

export default router;
