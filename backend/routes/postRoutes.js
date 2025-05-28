const express = require("express");
const router = express.Router();
// const Post = require("../models/Post.js");
const jwt = require("jsonwebtoken")
const postService = require('../services/postService')
const verifyToken = require("../middleware/auth");

// GET all posts
router.get('/', async (req, res) => {
  try {
    const posts = await postService.getAllPosts();
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET post by id
router.get('/:id', async (req, res) => {
  try {
    const post = await postService.getPostById(req.params.id);
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST create new post
router.post('/', verifyToken, async (req, res) => {
  try {
    //ดึง userId จาก Token
    const postData = {
      ...req.body,
      userId: req.user.id,
    };

    const newPost = await postService.createPost(postData);
    res.status(201).json(newPost);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PUT update post
router.put('/:id', async (req, res) => {
  try {
    const post = await postService.getPostById(req.params.id)
    if (!post) {
      return res.status(404).json({message:"ไม่พบโพสต์"})
    }
    if (post.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'ไม่มีสิทธิ์แก้ไขโพสต์นี้' })
    }

    const updatedPost = await postService.updatePost(req.params.id, req.body);
    res.json(updatedPost);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE post
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const post = await postService.getPostById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "ไม่พบโพสต์" })
    }

    //ถ้า userId จาก token ไม่ตรง post.userId ห้ามลบ
    if (post.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'ไม่มีสิทธิ์ลบโพสต์นี้' })
    }

    await postService.deletePost(req.params.id);
    res.json({ message: 'ลบโพสต์เรียบร้อย' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;