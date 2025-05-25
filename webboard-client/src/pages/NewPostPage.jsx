import { useState,useEffect} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function NewPostPage() {
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [error, setError] = useState("")
    const navigate = useNavigate()

    // useEffect(() => {
        
    // }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()

        const token = localStorage.getItem("token")
        if (!token) {
            alert("กรุณาเข้าสู่ระบบก่อนโพสต์")
            navigate("/login")
            return
        }
        try {
            const res = await axios.post("http://localhost:5000/api/posts" ,
            {title, content},
            {
                headers:{
                    Authorization: `Bearer ${token}`
                }
            }) 
            navigate(`/post/${res.data.post.id}`)
        }catch (err) {
            alert("สร้างโพสต์ล้มเหลว", err);
            setError("สร้างโพสต์ล้มเหลว")
            console.error(err)
        }
    }
  return (
    <div>
        <h2>สร้างโพสใหม่</h2>
        {error && <p className="text-red-500"> {error} </p>}
        <form onSubmit={handleSubmit}>
            <div>
                <label>หัวข้อ :</label>
                <input 
                    type="text" 
                    value={title}
                    onChange={(e) => setTitle(e.target.value)} 
                    required
                />
            </div>
            <div>
                <label>เนื้อหา :</label><br/>
                <textarea 
                    value={content}
                    onChange={(e) => setContent(e.target.value)} 
                    required
                />
            </div>
            <button type="submit">สร้างโพสใหม่</button>
        </form>
    </div>
  )
}

export default NewPostPage