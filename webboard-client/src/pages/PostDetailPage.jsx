import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

function PostDetailPage() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  let currentUserId = null;

  if (token) {
    const decoded = jwtDecode(token);
    currentUserId = decoded.id;
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;
    axios
      .get(`http://localhost:5000/api/posts/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setPost(res.data)
        console.log("โพสต์ที่โหลดได้:", res.data);
      })
      .catch((err) => console.error("โหลดโพสต์ล้มเหลว", err));
  }, [id]);

  const handleDelete = async () => {
    const confirmDelete = confirm("คุณแน่ใจหรือไม่ว่าต้องการลบโพสต์นี้?");
    if (!confirmDelete) return;

    const token = localStorage.getItem("token");
    if (!token) {
      alert("กรุณาเข้าสู่ระบบก่อนลบโพสต์");
      navigate("/login");
      return;
    }

    try {
      await axios.delete(`http://localhost:5000/api/posts/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert("ลบโพสต์สำเร็จ");
      navigate("/");
    } catch (err) {
      console.error(err);
      alert("ลบโพสต์ไม่สำเร็จ");
    }
  };

  if (!post) return <p>กำลังโหลด...</p>;
  
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-2">{post.title}</h1>
      <p>{post.content}</p>

      {post.userId === currentUserId && (
        <button
          onClick={handleDelete}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          ลบโพสต์
        </button>
      )}
    </div>
  );
}

export default PostDetailPage;
