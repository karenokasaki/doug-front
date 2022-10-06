import { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../api/api";
import { AuthContext } from "../contexts/authContext";

function CollectionsDetail() {
  const { idColl } = useParams();
  const [coll, setColl] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { loggedUser } = useContext(AuthContext);
  const [reload, setReload] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showUpload, setShowUpload] = useState(false);
  const [img, setImg] = useState("");
  const [editUser, setEditUser] = useState({
    collectionName: "",
    collectionDetails: "",
  });
  const navigate = useNavigate();

  function handleChange(e) {
    setEditUser({ ...editUser, [e.target.name]: e.target.value });
  }

  function handleChangePhoto(e) {
    setImg(e.target.files[0]);
  }

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

  async function handleSubmitPhoto(e) {
    e.preventDefault();
    try {
      const imgURL = await handleUpload();

      await api.post(`/photos/create/${idColl}`, { photoUrl: imgURL });
      setReload(!reload);
      setShowUpload(!showUpload);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    async function fetchColl() {
      setIsLoading(true);
      try {
        const response = await api.get(`/collections/collection/${idColl}`);
        setColl(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
    fetchColl();
  }, [reload]);
  console.log(coll);

  async function handleDeletePhoto(id) {
    try {
      await api.delete(`/photos/delete/${id}`);
      setReload(!reload);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleDelteColl() {
    try {
      await api.delete(`/collections/delete/${idColl}`);
      navigate("/profile");
    } catch (error) {
      console.log(error);
    }
  }

  async function handleSubmitEdit() {
    try {
      await api.put(`/collections/edit/${idColl}`, editUser);
      setReload(!reload);
      setShowEdit(!showEdit);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      {!isLoading && (
        <div>
          <p>{coll.collectionName}</p>
          <p>{coll.collectionDetails}</p>
          <p>{coll.author.userName}</p>

          {coll.author._id == loggedUser.user._id && (
            <>
              <button onClick={() => setShowEdit(!showEdit)}>
                Editar Collection
              </button>
              <button onClick={() => setShowUpload(!showUpload)}>
                ADD PHOTO
              </button>
              {showUpload && (
                <div>
                  <label>Adicione uma foto</label>
                  <input type="file" onChange={handleChangePhoto} />
                  <button onClick={handleSubmitPhoto}>Enviar</button>
                </div>
              )}
              {showEdit && (
                <>
                  <div>
                    <label>Nome da collection</label>
                    <input
                      name="collectionName"
                      value={editUser.collectionName}
                      onChange={handleChange}
                    />

                    <label>Detalhe da collection</label>
                    <input
                      name="collectionDetails"
                      value={editUser.collectionDetails}
                      onChange={handleChange}
                    />

                    <button onClick={handleDelteColl}>delete collection</button>
                    <button onClick={handleSubmitEdit}>
                      Salvar alterações
                    </button>
                  </div>
                </>
              )}
            </>
          )}

          {coll.photos.map((photo) => {
            return (
              <>
                <img src={photo.photoUrl} alt="" />
                {photo.uploadedBy == loggedUser.user._id && (
                  <button onClick={() => handleDeletePhoto(photo._id)}>
                    Delete
                  </button>
                )}
              </>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default CollectionsDetail;
