import express from "express";
import mongoose from "mongoose";
import BlogPost from "../models/blogs.js";

const router = express.Router();

// to get all posts
export const getAllBlogPosts = async (req, res) => {
  try {
    const posts = await BlogPost.find(); // Ensure the model and path are correct
    res.status(200).json(posts);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


//to create a post

export const addBlogPost = async (req, res) => {
  const { title, description, tags, imageURL, creator } = req.body;

  const createNewPost = new BlogPost({
    title,
    description, // rich text content
    tags,
    fileUpload: imageURL,
    creator
  });

  try {
    await createNewPost.save();
    res.status(200).json(createNewPost);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};



// to get single post

export const getSinglePost = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await BlogPost.findById(id); // Ensure BlogPost is correctly imported and the method is available
    if (!post) return res.status(404).json({ message: "Post not found" });
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// to update single post

export const updateSingleBlogPost = async (req, res) => {
  const { id } = req.params;

  const { title, description, tags, fileUpload, creator } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(400).send(`${id} does not exist`);

  const updatedBlogPost = {
    title,
    description, // rich text content
    tags,
    fileUpload,
    creator,
    _id: id,
  };

  await BlogPost.findByIdAndUpdate(id, updatedBlogPost, { new: true });
  res.status(200).json(updatedBlogPost);
};


// to like blog post

export const likeBlogPost = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(400).send(`${id} does not exist`);

  const post = await BlogPost.findById(id);

  const updatedBlogPost = await BlogPost.findByIdAndUpdate(
    id,
    { upvote: post.upvote + 1 },
    { new: true }
  );
  res.status(200).json(updatedBlogPost);
};

// tp delete post

export const removeSingleBlogPost = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedPost = await BlogPost.findByIdAndDelete(id);

    if (!deletedPost) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.status(200).json({ message: "Post deleted successfully", deletedPost });
  } catch (error) {
    console.error("Error deleting post:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export default router;
