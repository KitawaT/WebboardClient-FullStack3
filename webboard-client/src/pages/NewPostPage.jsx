import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function NewPostPage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("กรุณาเข้าสู่ระบบก่อนสร้างโพสต์");
      navigate("/login");
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      alert("กรุณาเข้าสู่ระบบก่อนโพสต์");
      navigate("/login");
      return;
    }
    try {
      const res = await axios.post(
        "http://localhost:5000/api/posts",
        { title, content },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("🟢 POST success:", res.data)
      navigate(`/post/${res.data._id}`);
    } catch (err) {
      const message = err?.response?.data?.message || "สร้างโพสต์ล้มเหลว";
      alert(message);
      setError(message);
      console.error(err);
    }
  };
  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "1rem" }}>
      <h2 className="text-xl font-bold mb-4">สร้างโพสต์ใหม่</h2>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">หัวข้อ :</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full border rounded p-2"
          />
        </div>
        <div>
          <label className="block mb-1">เนื้อหา :</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            rows={5}
            className="w-full border rounded p-2"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          สร้างโพสต์ใหม่
        </button>
      </form>
    </div>
  );
}

export default NewPostPage;
