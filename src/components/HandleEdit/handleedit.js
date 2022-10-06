import { useState } from "react";
import { api } from "../../api/api";
import HandleDelete from "../HandleDelete/handledelete";

function HandleEdit({ user, reload, setReload, setToggleEdit, toggleEdit }) {
  const [editUser, setEditUser] = useState({ ...user });

  function handleChange(e) {
    setEditUser({ ...editUser, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await api.put("/users/edit-user", { ...editUser });
      console.log(response);
      setReload(!reload);
      setToggleEdit(!toggleEdit);
    } catch (error) {
      console.log(error);
    }
  }

  console.log(editUser);
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="profilePicture">Profile Picture: </label>
        <input
          id="profilePicture"
          name="profilePicture"
          value={editUser.profilePicture}
          onChange={handleChange}
        />

        <label htmlFor="userName">User Name: </label>
        <input
          id="userName"
          name="userName"
          value={editUser.userName}
          onChange={handleChange}
        />
        <button type="submit">Save</button>
        <HandleDelete />
      </form>
    </div>
  );
}

export default HandleEdit;
