import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

function PostDetailPage() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const myUserId = localStorage.getItem("userId"); // 👉 ได้เป็น string

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    axios
      .get(`http://localhost:5000/api/posts/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setPost(res.data.post);
      })
      .catch((err) => {
        setError("ไม่พบโพสต์");
        console.error(err);
      });
  }, [id]);

  const handleDelete = async () => {
    const confirmDelate = window.confirm("คุณต้องการลบใช่ไหม ?");
    if (!confirmDelate) return;

    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/api/posts/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert("ลบโพสต์เรียบร้อย");
      navigate("/");
    } catch (err) {
      alert("ลบโพสต์ล้มเหลว");
      console.error(err);
    }
  };
  if (error) {
    return <div>{error}</div>;
  }
  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{post.title}</h2>
      <p>{post.content}</p>
      {post.userId === myUserId && (
        <>
          <button>แก้ไข</button>
          <button onClick={handleDelete} className="bg-red-500">
            ลบโพสต์
          </button>
        </>
      )}
    </div>
  );
}

export default PostDetailPage;
