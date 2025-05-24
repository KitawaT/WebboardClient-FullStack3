let posts = [
  { id: 1, title: "Hello World", content: "โพสต์แรกของฉัน" },
  { id: 2, title: "React ดีไหม?", content: "กำลังหัดเขียน React อยู่เลย" },
];

function findAll() {
  return posts; 
}
   
function findById(id){
  return posts.find(p => p.id === id)
}

function create(post){
  const newPost = { ...post, id:posts.length+1}
  posts.push(newPost)
  return newPost
}

module.exports = {
  findAll,  
  findById,
  create,
}

// const mongoose = require('mongoose');

// const postSchema = new mongoose.Schema({
//     title: {
//         type: String,
//         required: true,
//     },
//     content: {
//         type: String,
//         required: true,
//     },
//     createDate: {
//         type: Date,
//         default: Date.now,
//     },
// });

// module.exports = mongoose.model('Post', postSchema);