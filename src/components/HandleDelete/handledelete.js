import { useContext, } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../api/api";
import { AuthContext } from "../../contexts/authContext";

function HandleDelete() {
  const { loggedUser } = useContext(AuthContext);
  const navigate = useNavigate()

  const user = loggedUser.user._id;

    async function handleDelete() {
      try {
        await api.delete(`/users/delete/${user}`);
        navigate("/");
      } catch (error) {
        console.log(error);
      }
    }

  return <button onClick={handleDelete}>Delete Account</button>;
}

export default HandleDelete;
