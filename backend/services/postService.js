// backend/services/postService.js

const Post = require('../models/Post');

const getAllPosts = async () => {
  return await Post.find().sort({ createdAt: -1 });
};

const getPostById = async (id) => {
  return await Post.findById(id).select("title content userId createdAt updatedAt");
};

const createPost = async (data) => {
  const post = new Post(data);
  return await post.save();
};

const updatePost = async (id, data) => {
  return await Post.findByIdAndUpdate(id, data, { new: true });
};

const deletePost = async (id) => {
  return await Post.findByIdAndDelete(id);
};

module.exports = {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost
};
