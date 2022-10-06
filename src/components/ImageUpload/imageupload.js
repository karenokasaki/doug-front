// import { useCallback, useState } from "react";
// import { useDropzone } from "react-dropzone";
// import { api } from "../../api/api";
// import styles from "./image.module.css";

// function ImageUpload(collectionId) {
//   const [img, setImg] = useState([]);

//   const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
//     acceptedFiles.forEach((acceptedFile) => {
//       const reader = new FileReader();
//       reader.onload = () => {
//         setImg((prevState) => [...prevState, reader.result]);
//       };
//       reader.readAsDataURL(acceptedFile);

//     });
//     console.log("accepted", acceptedFiles);
//     console.log("rejected", rejectedFiles);
//   }, []);




//   console.log("aqui", img);



//   const { getRootProps, getInputProps, isDragActive } = useDropzone({
//     onDrop,
//     accepts: "image/jpeg",
//     multiple: false,
//   });

//   console.log(getInputProps(), getRootProps());
//   return (
//     <div
//       {...getRootProps()}
//       className={`${styles.dropzone} ${isDragActive ? styles.active : null}`}
//     >
//       <input {...getInputProps()} />
//       <p>Drag 'n' drop some files here, or click to select files</p>
//       <div>
//         {img.length > 0 && (
//           <div>
//             {img.map((image, index) => {
//               return (
//                 <div>
//                   <img src={image} key={index} alt="" width={200} />
//                 </div>
//               );
//             })}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default ImageUpload;
