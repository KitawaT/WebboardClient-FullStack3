import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigator = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigator("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link to="/" className="mr-10">
        Home
      </Link>
      {token ? (
        <>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <>
          <Link to="/login" className="mr-10">
            Login
          </Link>
          <Link to="/register">Register</Link>
          {token && <Link to="/new">New Post</Link>}
        </>
      )}
    </nav>
  );
}

export default Navbar;
