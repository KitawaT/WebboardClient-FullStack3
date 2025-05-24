import {useState, useEffect,} from 'react'
import axios from '../api/axios'
import {Link} from 'react-router-dom'

function BoardPage() {
  const [posts, setPosts] = useState([])
  
  useEffect(()=>{
    axios.get("/posts")
      .then(res => {
        setPosts(res.data.posts);
      })
      .catch(err => {
        console.log("Error fecthing posts",err)
      })
  },[]);

  return (
    <>
    <div>
      <h1>รายการกระทู้ข้อความ</h1>
      {posts.map(post =>(
        <div key={post.id}>
          <Link to={`/posts/${post.id}`}>
            <h2>{post.title}</h2>
          </Link>
          <p>{post.content}</p>
        </div>
      ))
      }
    </div>
    </>
  )
}

export default BoardPage