import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import fs from "fs";
import cookieParser from "cookie-parser";
import path from "path";
import mongoose from "mongoose";
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
const __filename = new URL(import.meta.url).pathname;
const __dirname = path.dirname(__filename);
app.use(express.static(__dirname));
app.use(cookieParser());
const PORT = process.env.PORT || 6800;
import playerRouter from "./routers/player.router.js";
import standingRouter from "./routers/standings.router.js";
import matchesRouter from "./routers/matches.router.js";
import newsRouter from "./routers/news.router.js";

// Home Router
app.get("/", (req, res) => {
  res.send("This is Home page");
});

// Connect Mongoose to Database
const DB = process.env.DATABASE;
mongoose
  .connect(DB)
  .then(() => {
    console.log("DataBase Connected !!");
  })
  .catch((err) => console.log(err));

if (!fs.existsSync("uploads")) {
  fs.mkdirSync("uploads");
}

//App Running Server
app.listen(PORT, () => {
  console.log("Server is Running on port :" + PORT);
});

// Using Routers
app.use("/players", playerRouter);
app.use("/standings", standingRouter);
app.use("/matches", matchesRouter);
app.use("/newses", newsRouter);
