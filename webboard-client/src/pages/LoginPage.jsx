import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const haddleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`http://localhost:5173/api/login`, {
        email,
        password,
      });
      localStorage.setItem("token", res.data.token);
      navigate("/");
    } catch (err) {
      if (err) console.log(`Login failed.`);
    }
  };

  return (
    <form onSubmit={haddleLogin}>
      <h2>Login Page</h2>
      <input
        type="text"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <br />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      <button type="submit" onClick={haddleLogin}>
        Login
      </button>
    </form>
  );
}

export default LoginPage;
