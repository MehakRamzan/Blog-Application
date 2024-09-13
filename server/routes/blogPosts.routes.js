import express from "express";
import multer from "multer";
import path from "path";
import {
  getAllBlogPosts,
  addBlogPost,
  getSinglePost,
  updateSingleBlogPost,
  removeSingleBlogPost,
  likeBlogPost
} from "../controllers/blogPosts.controllers.js";

const router = express.Router();

// Configure storage for Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Directory where files will be saved
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
  },
});

const upload = multer({ storage });

// Define routes
router.get("/", getAllBlogPosts);
router.post("/", upload.single('image'), addBlogPost); // Use multer middleware here
router.get("/:id", getSinglePost);
router.patch("/:id", updateSingleBlogPost);
router.delete("/:id", removeSingleBlogPost);
router.patch("/:id/likePost", likeBlogPost);

export default router;
