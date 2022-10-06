import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../api/api";

function UsersDetailPage() {
  const { idUser } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState({});
  const [reload, setReload] = useState(false);

  useEffect(() => {
    async function fetchUser() {
      setIsLoading(true);
      const response = await api.get("/users/all-users");
      setUser(response.data[0]);
      setIsLoading(false);
    }

    fetchUser();
  }, [reload]);
  console.log(user);
  return (
    <div>
      {!isLoading && (
        <>
          <h1>{user.userName}</h1>

          <h2>my collections</h2>
          {user.collections.map((coll) => {
            return (
              <Link to={`/collections/${coll._id}`}>
                <p>name: {coll.collectionName}</p>
                <p>detail: {coll.collectionDetails}</p>
              </Link>
            );
          })}
        </>
      )}
    </div>
  );
}

export default UsersDetailPage;
