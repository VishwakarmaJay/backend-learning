import express from "express";
import multer from "multer";
import { addPoster } from "../controller/movieController.js";
import AppError from "../utils/appError.js";
import { randomUUID } from "node:crypto";

const LIMIT_FILE_SIZE = 2 * 1024 * 1024; // 2MB

const upload = multer({
  storage: multer.diskStorage({
    destination: "uploads/",
    filename: (req, file, cb) => {
    const filename = `${randomUUID()}.${file.mimetype.split("/")[1]}`
     cb(null, filename);
    },
  }),
  limits: { fileSize: LIMIT_FILE_SIZE },
  fileFilter: (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new AppError( "Only image files allowed",400));
    }
  },
});

const movieRouter = express.Router();

movieRouter.get("/", (req, res) => {
  res.json({ message: "Hello" });
});

movieRouter.post("/:id/poster", upload.single("poster"), addPoster);

export default movieRouter;
