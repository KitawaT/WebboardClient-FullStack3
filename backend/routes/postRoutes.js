const express = require("express");
const router = express.Router();
const Post = require("../models/Post.js");
const jwt = require("jsonwebtoken")


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

// PUT /api/post/:id
router.put('/:id', (req, res) => {
  const id = parseInt(req.params.id)
  const { title, content } = req.body

  const updatedPost = Post.update(id, { title, content })

  if (!updatedPost) {
    return res.status(404).json({ message: "ไม่พบโพสต์" })
  }

  res.json({ message: "อัปเดจโพสต์สำเร็จ", post: updatedPost })
})

// Delete /api/post/:id
router.delete('/:id', (req, res) => {
  const token = req.headers.authorization?.split(" ")[1]
  if (!token){
    return res.status(401).json({ message:"กรุณา Login ก่อน"})
  }

  try{
    const decoded = jwt.verify(token, "secret123")
    const userId = decoded.userId
    const id = parseInt(req.params.id)

    const post = Post.findById(id)
    if (!post){
      return res.status(404).json({ message: "ไม่พบโพสต์"})
    }

    //ถ้า userId ไม่ตรงกัน > ไม่ให้ลบ
    if (post.userId !== userId){
      return res.status(403).json({ message: "คุณไม่มีสิทธิ์ลบโพสต์นี้"})
    }

    const deleted = Post.remove(id)
    res.json({ message: "ลบโพสต์เรียบร้อย" })
  }catch(err){
    return res.status(401).json({ message: "token ไม่ถูกต้อง"})
  }
 
})

router.post("/", (req, res) => {
  const { title, content } = req.body

  //ดึง token จาก headers
  const token = req.headers.authorization?.split(" ")[1]
  if (!token) {
    return res.status(401).json({ message: "กรุณา Login ก่อน"})
  }

  try {
    // decode JWT
    const decoded = jwt.verify(token, "secret123")
    const userId = decoded.userId

    if (!title || !content) {
    return res.status(400).json({ message: "กรุณาระบุ title และ content" })
  }
  //เพิ่ม userId ตอนสร้างโพสต์
  const newPost = Post.create({ title, content, userId})
  console.log(newPost)
  
  res.status(201).json({ post: newPost })
  } catch (err){
    return res.status(401).json({message: "token ไม่ถูกต้อง"})
  }
  
})

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