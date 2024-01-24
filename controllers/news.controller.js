import multer from "multer";
import NewsModel from "../models/news.model";
import { storage } from "../utils/multerFile";
import fs from "fs";
// Add Player data

const upload = multer({
  storage: storage,
});

// Add News data
export const addNews = (req, res) => {
  try {
    const uploadNewsData = upload.single("image");
    uploadNewsData(req, res, function (err) {
      if (err) {
        return res.status(400).json({
          message: err.message,
        });
      }

      const { title, newsDate, newsDescription } = req.body; // Receive from Front End

      function formatDateToCustomFormat(dateString) {
        const date = new Date(dateString);

        // Check if the date is valid
        if (isNaN(date)) {
          return "Invalid Date";
        }

        const day = date.getDate().toString().padStart(2, "0");
        const monthNames = [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ];
        const month = monthNames[date.getMonth()];
        const shortYear = date.getFullYear().toString().slice(-2);

        return `${day} ${month} ${shortYear}`;
      }

      const originalDate = newsDate;
      const formattedDate = formatDateToCustomFormat(originalDate);

      let image = null;
      if (req.file !== undefined) {
        image = req.file.filename;
      }

      // Schema Validation as per requirements
      const createNewsRecord = new NewsModel({
        title,
        newsDate: formattedDate,
        newsDescription,
        image,
      });
      createNewsRecord.save(); // Save inputData
      if (createNewsRecord) {
        return res.status(201).json({
          data: createNewsRecord,
          message: "News has been added Successfully.",
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
// Fetch All News Data
export const getAllNews = async (req, res) => {
  try {
    const getAllNewsData = await NewsModel.find({ status: 1 });
    if (getAllNewsData) {
      return res.status(200).json({
        data: getAllNewsData,
        message: "SuccessFully Fetched",
        total: getAllNewsData.length,
        filepath: `${process.env.BASE_URL}/uploads`,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
// // Fetch Single News Data
export const getNews = async (req, res) => {
  try {
    const newsID = req.params.news_id; // from front End
    const getNewsData = await NewsModel.findOne({
      _id: newsID,
      status: 1,
    });
    if (getNewsData) {
      return res.status(200).json({
        data: getNewsData,
        message: "Successfully fetched single news data.",
        filepath: `${process.env.BASE_URL}/uploads`,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
// // Update Single News Data
export const updateNews = async (req, res) => {
  try {
    const updateNewsData = upload.single("image");
    updateNewsData(req, res, async function (err) {
      if (err) {
        return res.status(400).json({
          message: err.message,
        });
      }
      const newsID = req.params.news_id;
      const { title, newsDate, newsDescription } = req.body;

      const existNews = await NewsModel.findOne({
        _id: newsID,
      });

      let newsImage = existNews.image;
      if (req.file) {
        newsImage = req.file.filename;

        if (fs.existsSync("./uploads/newses/" + existNews.image)) {
          fs.unlinkSync("./uploads/newses/" + existNews.image);
        }
      }

      function formatDateToCustomFormat(dateString) {
        const date = new Date(dateString);

        // Check if the date is valid
        if (isNaN(date)) {
          return "Invalid Date";
        }

        const day = date.getDate().toString().padStart(2, "0");
        const monthNames = [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ];
        const month = monthNames[date.getMonth()];
        const shortYear = date.getFullYear().toString().slice(-2);

        return `${day} ${month} ${shortYear}`;
      }

      const originalDate = newsDate;
      const formattedDate = formatDateToCustomFormat(originalDate);

      const updatedNews = await NewsModel.updateOne(
        { _id: newsID },
        {
          $set: {
            title,
            newsDate: formattedDate,
            newsDescription,
            image: newsImage,
          },
        }
      );

      if (updatedNews.acknowledged) {
        return res.status(200).json({
          message: "News data has Been Updated..!",
        });
      }
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};
// // Soft Delete News Data
export const deleteNews = async (req, res) => {
  try {
    const newsID = req.params.news_id;
    const deletedNews = await NewsModel.updateOne(
      { _id: newsID },
      { $set: { status: 0 } }
    );
    if (deletedNews.acknowledged) {
      return res.status(200).json({
        message: "News data has been Deleted",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
// // Hard delete News Data
export const removeNews = async (req, res) => {
  try {
    const newsID = req.params.news_id;
    const existNews = await NewsModel.findOne({
      _id: newsID,
    });

    if (fs.existsSync("./uploads/newses/" + existNews.image)) {
      fs.unlinkSync("./uploads/newses/" + existNews.image);
    }

    const deletedNews = await NewsModel.deleteOne({ _id: newsID });
    if (deletedNews.acknowledged) {
      return res.status(200).json({
        message: "News Data Deleted from Data Base",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
