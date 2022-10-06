import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { api } from "../api/api";

function UsersPage() {
  const [reload, setReload] = useState(false);
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      setIsLoading(true);
      const response = await api.get("/users/all-users");
      setUsers(response.data);
      setIsLoading(false);
    }

    fetchUser();
  }, [reload]);

  return (
    <div>
      {!isLoading &&
        users.map((user) => {
          return (
            <div>
              <Link to={`/users/${user._id}`}>{user.userName}</Link>
            </div>
          );
        })}
    </div>
  );
}

export default UsersPage;
