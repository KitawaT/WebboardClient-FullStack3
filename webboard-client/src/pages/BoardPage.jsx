import {useState, useEffect,} from 'react'
import axios from 'axios'
import {Link, useNavigate} from 'react-router-dom'

function BoardPage() {
  const [posts, setPosts] = useState([])
  const navigate = useNavigate()

  useEffect(()=>{
    const token = localStorage.getItem("token")
    if (!token){
      navigate("/login")
      return
    }

    axios
    .get("http://localhost:5000/api/posts",{
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then((res =>{
      setPosts(res.data.posts)
    }))
    .catch((err) =>{
      console.error("โหลดโพสล้มเหล้ว", err)
    })
  },[]);

  return (
    <>
    <div className='p-4'>
      <h1 className='text-2xl font-bold mb-4'>รายการกระทู้</h1>
      <ul>
        {posts.map((post)=>(
          <li key={post.id}>
            <Link
              to={`/post/${post.id}`}
              className='text-blue-500 hover:underline'
            >
              {post.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
    </>
  )
}

export default BoardPage