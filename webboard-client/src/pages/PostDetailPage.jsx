import {useParams} from 'react-router-dom'
import {useState, useEffect} from 'react'
import axios from 'axios'

function PostDetailPage() {
    const {id} = useParams()
    const [post, setPost] = useState(null)

    const fetchPost = async () => {
        try {
            const res = await axios.get(`http://localhost:5173/api/posts/${id}`)
            // mock data สำหรับทดสอบ
            // setPost({id: 1, title: "โพสต์ตัวอย่าง 1", content: "เนื้อหาของโพสต์"})
            setPost(res.data)
        } catch (err) {
            alert("โหลดโพสต์ล้มเหลว", err);
        }
    }

    useEffect(() => {
        fetchPost()
    }, [id])

    if (!post) {
        return <div>Loading...</div>
    }

  return (
    <div>
        <h2>{post.title}</h2>
        <p>{post.content}</p>
    </div>
  )
}

export default PostDetailPage