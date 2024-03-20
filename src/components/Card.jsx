import React from "react";
import { db, storage } from "../utils/firebase-config";
import { deleteDoc, doc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { useNavigate } from "react-router-dom";
import { MdOutlineFileDownload } from "react-icons/md";
import { MdOutlineDeleteOutline } from "react-icons/md";

const Card = ({ item }) => {
  // useEffect(() => {
  //   const unsubscribe = onAuthStateChanged(firebaseAuth, (currentUser) => {
  //     if (!currentUser) {
  //       navigate("/login");
  //     } else {
  //       setLoading(false); // Set loading to false once the authentication state is resolved
  //     }
  //   });

  //   return () => unsubscribe(); // Cleanup function
  // }, [navigate]);
  const handleDelete = async (id, storeRef, userEmail) => {
    try {
      const desertRef = ref(storage, storeRef);
      await deleteObject(desertRef);
      console.log("image deleted");
      await deleteDoc(doc(db, userEmail, id));
      console.log("card delete");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="card bg-base-900 shadow-xl ">
      <figure className=" max-h-[30vh]">
        <img
    src={item.imageUrl}
    alt="lol"
    onError={(e) =>
      (e.target.onerror = null)(
        (e.target.src =
          "https://firebasestorage.googleapis.com/v0/b/frog-fb23f.appspot.com/o/vander%40gmail.com%2Fe120edd8-2d7c-4ad4-b376-c16a6908eeab.jpeg?alt=media&token=26c4d8ae-4e21-4f61-8810-75f04a88025e")
      )
    }
  />
        {/* <img src={item.imageUrl} alt="Shoes" >*/}
      </figure>
      <div className="">
         <h2 className="card-title">{item.name}</h2> 
        <p>Created on: {item.createdAt}</p>
        <div className="card-actions justify-end">
          <a
            href={item.imageUrl}
            className=" text-[#7480ff] text-[2rem] transition-all hover:text-green-600 hover:rounded-lg"
             download>
            <MdOutlineFileDownload />
          </a>
          <button
            onClick={() => handleDelete(item.id, item.storeRef, item.userEmail)}
            className="text-[#7480ff] text-[2rem] transition-all hover:text-red-600 hover:rounded-lg"
          >
            <MdOutlineDeleteOutline />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
