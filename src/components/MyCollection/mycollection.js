import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../../api/api";
import styles from "./styles.module.css";

function MyCollection({ reloadColl }) {
  const [isLoading, setIsLoading] = useState(true);
  const [coll, setColl] = useState();

  useEffect(() => {
    async function fetchColl() {
      setIsLoading(true);
      const response = await api.get("/collections/my-collections");
      console.log(response);
      setColl(response.data);
      setIsLoading(false);
    }
    fetchColl();
  }, [reloadColl]);
  console.log(coll);
  return (
    <div>
      <h1>YOUR COLLECTIONS</h1>
      {!isLoading &&
        coll.map((oneColl) => {
          return (
            <Link to={`/collections/${oneColl._id}`}>
              <div className={styles.card}>
                <div className={styles.container}>
                  <h4>
                    <b>{oneColl.collectionName}</b>
                  </h4>
                  <p>{oneColl.collectionDetails}</p>
                  {oneColl.photos.map((photo) => {
                    return (
                      <img src={photo.photoUrl} alt="Avatar" width={300} />
                    );
                  })}
                </div>
              </div>
            </Link>
          );
        })}
    </div>
  );
}

export default MyCollection;
