import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const haddleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        username,
        password,
      });

      localStorage.setItem("token", res.data.token);
      alert("เข้าสู่ระบบสำเร็จ");
      navigate("/");
    } catch (err) {
      if (err) console.log("เข้าสู่ระบบไม่สำเร็จ");
      setError("เข้าสู่ระบบไม่สำเร็จ");
    }
  };

  return (
    <form onSubmit={haddleLogin}>
      <h2>เข้าสู่ระบบ</h2>
      {error && <p className="text-red-500">{error}</p>}
      <div>
        <label>ผู้ใช้</label>
        <input
          type="text"
          placeholder="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <label>หรัสผ่าน :</label>
        <input
          type="text"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button type="submit" onClick={haddleLogin}>
        เข้าสู่ระบบ
      </button>
    </form>
  );
}

export default LoginPage;

// ถอก JWT เพื่อเก็บ userId
// const payload = JSON.parse(atob(token.split(".")[1]));
// console.log("decoded JWT payload:", payload);

// if (payload.userId) {
//   localStorage.setItem("userId", payload.userId);
// } else {
//   console.warn("JWT payload ไม่พบ userId");
// }
