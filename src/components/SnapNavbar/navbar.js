import { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../../contexts/authContext";

function SnapNavbar() {
  const navigate = useNavigate();

  const { loggedUser } = useContext(AuthContext);

  function handleLogOut(e) {
    localStorage.removeItem("loggedUser");
    navigate("/");
  }

  return (
    <>
      <button onClick={handleLogOut}>Sair</button>
      <Link to="/users">All users</Link>
    </>
  );
}

export default SnapNavbar;
