const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title:{
    type: String,
    required: true
  },
  content: String,
  userId: String // userId หรือ username ก็ได้
},{
  timestamps:true // สร้าง CreateAt และ updateAt อัตโนมัติ
})

module.exports = mongoose.model('Post', postSchema);