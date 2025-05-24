const express = require("express");
const router = express.Router();
const Post = require("../models/Post.js");

// GET /api/posts
router.get("/", (req, res) => {
  const posts = Post.findAll()
  console.log(posts)
  res.json({ posts });
});

// GET /api/posts/:id
router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const post = Post.findById(id);

  if (!post) {
    return res.status(404).json({ message: "ไม่พบโพสต์" });
  }

  res.json({ post });
});

module.exports = router;

// router.post('/', async (req, res) => {
//     try {
//         const title = req.body.title;
//         const newPost = new Post({
//             title: title,
//             content: req.body.content,
//         });
//         await newPost.save();
//         res.status(201).json(newPost);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Erroe crating post' });
//     }
// }
// );

// router.get('/', async (req, res) => {
//     try {
//         const posts = await Post.find().sort({ createDate: -1 });
//         res.status(200).json(posts);
//         res.json(posts);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Error fetching posts' });
//     }
// });

// module.exports = router;