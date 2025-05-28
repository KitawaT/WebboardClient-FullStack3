import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function RegisterPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/register", {
        username,
        password,
      });

      localStorage.setItem("token", res.data.token); // แก้ตรงนี้
      alert("Registration successful");
      navigate("/login");
    } catch (err) {
      console.error(err);
      setError("สมัครสมาชิกไม่สำเร็จ");
    }
  };

  return (
    <form onSubmit={handleRegister}>
      <h2>สมัครสมาชิก</h2>
      {error && <p className="text-red-500">{error}</p>}
      <div>
        <label>ชื่อผู้ใช้ :</label>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <label>รหัสผ่าน</label>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <button type="submit">สมัครสมาชิก</button>
    </form>
  );
}

export default RegisterPage;
