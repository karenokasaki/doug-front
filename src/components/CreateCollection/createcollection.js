import { useContext, useEffect, useState } from "react";
import { api } from "../../api/api";
import { AuthContext } from "../../contexts/authContext";

function CreateCollection({
  toggleCollection,
  setToggleCollection,
  reloadColl,
  setReloadColl,
}) {
  const { loggedUser } = useContext(AuthContext);
  const user = loggedUser.user._id;
  const [img, setImg] = useState("");
  const [preview, setPreview] = useState();

  const [newCol, setNewCol] = useState({
    author: user,
    collectionName: "",
    collectionDetails: "",
    photos: [],
    likes: [],
  });

  function handleChange(e) {
    setNewCol({ ...newCol, [e.target.name]: e.target.value });
  }

  function handleImage(e) {
    setImg(e.target.files[0]);
  }

  useEffect(() => {
    if (!img) {
      setPreview(undefined);
      return;
    }

    const objectURL = URL.createObjectURL(img);
    setPreview(objectURL);

    return () => URL.revokeObjectURL(objectURL);
  }, [img]);

  async function handleUpload() {
    try {
      const uploadData = new FormData();
      uploadData.append("images", img);

      const response = await api.post("/upload-image", uploadData);

      return response.data.url;
    } catch (error) {
      console.log(error);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const imgURL = await handleUpload();

      const response = await api.post("/collections/create", { ...newCol });

      const collectionId = response.data._id;

      await api.post(`/photos/create/${collectionId}`, { photoUrl: imgURL });

      setToggleCollection(!toggleCollection);
      setReloadColl(!reloadColl);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Collection Name:</label>
        <input
          type="text"
          name="collectionName"
          required
          value={newCol.collectionName}
          onChange={handleChange}
        />
        <label>About:</label>
        <input
          type="text"
          name="collectionDetails"
          required
          value={newCol.collectionDetails}
          onChange={handleChange}
        />
        <input type="file" onChange={handleImage} />
        <button type="submit">Enter</button>
        <button
          onClick={() => {
            setToggleCollection(!toggleCollection);
          }}
        >
          Cancel
        </button>
      </form>
    </div>
  );
}

export default CreateCollection;
