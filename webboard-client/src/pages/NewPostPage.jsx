import { useState,useEffect,} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function NewPostPage() {
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const navigate = useNavigate()

    useEffect(() => {
        const token = localStorage.getItem("token")
        if (!token) {
            alert("please login before create post")
            navigate("/login")
        }
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const token = localStorage.getItem("token")
            await axios.post(
                `http://localhost:5173/api/posts`, 
                {title, content},
                {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            alert("สร้างโพสต์สำเร็จ")
            navigate("/")
        }catch (err) {
            alert("สร้างโพสต์ล้มเหลว", err);
        }
    }
  return (
    <div>
        <h2>New post</h2>
        <form onSubmit={handleSubmit}>
            <div>
                <label>Title</label>
                <input 
                    type="text" 
                    value={title}
                    onChange={(e) => setTitle(e.target.value)} 
                    required
                />
            </div>
            <div>
                <label>Content</label>
                <textarea 
                    value={content}
                    onChange={(e) => setContent(e.target.value)} 
                    required
                />
            </div>
            <button type="submit">Create Post</button>
        </form>
    </div>
  )
}

export default NewPostPage