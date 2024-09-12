import express from "express";

import {getAllBlogPosts,
    addBlogPost ,
 getSinglePost ,
    updateSingleBlogPost,
    removeSingleBlogPost,
    likeBlogPost
} from "../controllers/blogPosts.controllers.js";

const router = express.Router();

router.get("/" , getAllBlogPosts);
router.post("/" , addBlogPost)
router.get("/:id" , getSinglePost)
router.patch("/:id" , updateSingleBlogPost)
router.delete("/:id" , removeSingleBlogPost)
router.patch("/:id/likePost" , likeBlogPost)

export default router;