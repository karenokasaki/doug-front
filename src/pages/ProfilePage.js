import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { api } from "../api/api";
import CreateCollection from "../components/CreateCollection/createcollection";
import HandleEdit from "../components/HandleEdit/handleedit";
import MyCollection from "../components/MyCollection/mycollection";
import SnapNavbar from "../components/SnapNavbar/navbar";

function ProfilePage() {
  const [user, setUser] = useState({
    name: "",
    userName: "",
    email: "",
    profilePicture: "",
    collections: [],
    followers: [],
    following: [],
  });
  const [isLoading, setIsLoading] = useState(true);
  const [reload, setReload] = useState(false);
  const [toggleEdit, setToggleEdit] = useState(true);
  const [toggleCollection, setToggleCollection] = useState(true);
  const [reloadColl, setReloadColl] = useState(true);
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchUser() {
      setIsLoading(true);
      const response = await api.get("/users/profile");
      const response1 = await api.get("/users/all-users");
      setUser(response.data);
      setUsers(response1.data);
      setIsLoading(false);
    }

    fetchUser();
  }, [reload]);
  console.log(user);
  return (
    <div>
      <img src={user.profilePicture} alt="profile" />
      <div>
        <h1>Welcome! {user.email}</h1>
        {user.name ? <>{user.name}</> : <></>}
        {user.userName ? <p>{user.userName}</p> : <></>}

        <SnapNavbar />
        <button
          onClick={() => {
            setToggleEdit(!toggleEdit);
          }}
        >
          Edit
        </button>
        {!toggleEdit && (
          <HandleEdit
            user={user}
            setReload={setReload}
            reload={reload}
            setToggleEdit={setToggleEdit}
            toggleEdit={toggleEdit}
          />
        )}

        <button
          onClick={() => {
            setToggleCollection(!toggleCollection);
          }}
        >
          Create Collection
        </button>
        {!toggleCollection && (
          <CreateCollection
            toggleCollection={toggleCollection}
            setToggleCollection={setToggleCollection}
            reloadColl={reloadColl}
            setReloadColl={setReloadColl}
          />
        )}
      </div>
      <MyCollection reloadColl={reloadColl} setReloadColl={setReloadColl} />

      <h1>all users</h1>
      {!isLoading &&
        users.map((user) => {
          return (
            <Link to={`/users/${user._id}`}>
              <p>{user.userName}</p>
              <p>{user.name}</p>
            </Link>
          );
        })}
    </div>
  );
}

export default ProfilePage;
