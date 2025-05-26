import {useState,useEffect} from 'react'
import {useParams, useNavigate} from 'react-router-dom'
import axios from 'axios'

function EditPostPage() {
    const {id} = useParams()
    const [title, setTitle] = useState('')
    const [content, setContent] =useState('')
    const [error, setError] =useState(null)
    const navigate = useNavigate()

    useEffect (()=>{
        const token =localStorage.getItem("token")
        if (!token){
            alert("กรุณา Login")
            navigate("/login")
            return
        }

        axios.get(`http://localhost:5000/api/posts/${id}`,{
            headers:{
                Authorization: `Bearer ${token}`
            }
        })
        .then(res =>{
            setTitle(res.data.post.title)
            setContent(res.data.post.content)
        })
        .catch(()=>{
            setError("ไม่สามารถโหลดโพสต์ได้")
        })
    },[id])

    const handleSubmit =async (e) =>{
        e.preventDefault()
        const token = localStorage.getItem("token")
        try {
            await axios.put(`http://localhost:5000/api/posts/${id}`,{
                title,content
            },{
                headers:{
                    Authorization: `Bearer ${token}`
                }
            })
            navigate(`/post/${id}`)
        } catch (err){
            setError("อัปเดจไม่สำเร็จ")
            console.error(err)
        }
    }

  return (
    <div>
        <h2 className='text-2xl'>แก้ไขโพสต์</h2>
        <form onSubmit={handleSubmit}>
            <div>
                <label>หัวข้อ</label><br/>
                <input
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    required
                >
                </input>
            </div>
            <div>
                <label>เนื้อหา</label><br/>
                <input
                    value={content}
                    onChange={e => setContent(e.target.value)}
                    required
                >
                </input>
            </div>
            <button type='submit'>อัปเดต</button>
        </form>
    </div>

  )
}

export default EditPostPage