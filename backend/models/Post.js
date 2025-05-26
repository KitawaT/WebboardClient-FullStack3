const mongoose = require('mongoose');
let posts = [
  { id: 1, title: 'Hello World', content: 'โพสต์แรกของฉัน', userId: 'mock-id-123' },
  { id: 2, title: 'React ดีไหม?', content: 'กำลังหัดเขียน React อยู่เลย', userId: 'someone-else' }
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

function update(id, data){
  const index = posts.findIndex(p => p.id === id)
  if (index === -1) return null

  posts[index] ={ ...posts[index], ...data}
  return posts[index]
}

function remove(id){
  const index = posts.findIndex(p => p.id === id)
  if (index === -1)return false

  posts.splice(index, 1)
  return true
}

module.exports = {
  findAll,  
  findById,
  create,
  update,
  remove
}



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