const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const bcrypt = require('bcrypt')
const User = require('../models/User')

console.log("authRoutes loaded");

router.post("/register",async (req, res) => {
  const { username, password } = req.body;
  
  try{
    const existingUser = await User.findOne({username})
    if(existingUser){
      return res.status(400).json({ message: "มีผู้ใช้นี้อยู่แล้ว"})
    }

    const hashPassword = await bcrypt.hash(password, 10)
    const newUser = new User({ username, password:hashPassword})
    await newUser.save()

    const token = jwt.sign(
      { id: newUser._id, username:newUser.username},
      "secret123",
      { expiresIn: "1h"}
    )

    res.json({ token})
  }catch(err){
    console.error("Register Error:", err)
    res.status(500).json({ message: "เซิร์ปมีปัญหา"})
  }
});

router.post("/login",async (req, res)=>{
  const { username, password } =req.body

  try{
    const user =await User.findOne({ username })
    if(!user){
      return res.status(400).json({ message:"ไม่พบบัญชีผู้ใช้"})
    }
    
    const isMatch = await bcrypt.compare(password, user.password)
    if(!isMatch){
      return res.status(401).json({ message:"รหัสผ่านไม่ถูกต้อง"})
    }

    const token = jwt.sign({ id: user._id, username}, "secret123",{
      expiresIn:"1h"
    })

    res.json({ token })
  }catch (err){
    console.error("Register Error:", err)
    res.status(500).json({ message: "เซิร์ปมีปัญหา"})
  }  
})

module.exports = router;
