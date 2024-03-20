import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { db, firebaseAuth, storage } from "../utils/firebase-config";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import {
  addDoc,
  collection,
  getDocs,
  orderBy,
  setDoc,
} from "firebase/firestore";
import { query, where, onSnapshot } from "firebase/firestore";
import Card from "../components/Card";

const Home = () => {
    const navigate = useNavigate();
    const [selectedFile, setSelectedFile] = useState(null);
    const [error, setError] = useState(null);
    const [url, setUrl] = useState(null);
    const [progress, setProgress] = useState(null);
    const [data, setData] = useState([]);
    // const [user , setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    // useEffect(()=>{
    //   onAuthStateChanged(firebaseAuth,(currentUser)=>{
    //     // if(!currentUser){
    //     //   setUser(null);
    //     //   navigate("/login");
    //     // }else{
    //     //   setUser(currentUser.email);
    //     // }
    //     if(!currentUser){
    //       navigate("/login");
    //     }
    //   })
    // },[])
    useEffect(() => {
      const unsubscribe = onAuthStateChanged(firebaseAuth, (currentUser) => {
        if (!currentUser) {
          navigate("/login");
        } else {
          setLoading(false); // Set loading to false once the authentication state is resolved
        }
      });
  
      return () => unsubscribe(); // Cleanup function
    }, [navigate]);
  
    useEffect(() => {
      if (!loading) {
      const fetchData = async () => {
        try {
          const user = getAuth().currentUser;
          // if (!user) {
          //   navigate("/login");
          //   return;
          // }
          const par = user.email;
          const q = query(collection(db, par), orderBy("createdAt", "desc"));
          const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const images = [];
            querySnapshot.forEach((doc) => {
              images.push({...doc.data(),id:doc.id});
            });
            setData(images);
            console.log(data);
          });
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
  
      fetchData();
    }
    }, [loading]);
  
    const handleFile = (e) => {
      setSelectedFile(e.target.files[0]);
    };
    function getDate() {
        const today = new Date();
        const month = today.getMonth() + 1;
        const year = today.getFullYear();
        const date = today.getDate();
        return `${month}/${date}/${year}`;
      }
  
    const handleUpload = async () => {
      if (!selectedFile) {
        return;
      }
  
      try {
        const fileId = uuidv4();
        const par = getAuth().currentUser.email
        const formatFile = selectedFile.type.split("/")[1];
        const storageRef = ref(storage, `${par}/${fileId}.${formatFile}`);
        const uploadTask = uploadBytesResumable(storageRef, selectedFile);
        const reff = `${par}/${fileId}.${formatFile}`;
  
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setProgress(progress);
          },
          (error) => {
            setError(error);
          },
          async () => {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            setUrl(downloadURL);
  
            const docRef = await addDoc(collection(db, par), {
              imageUrl: downloadURL,
              createdAt: getDate(),
              userEmail: getAuth().currentUser.email,
              storeRef: reff
            });
  
            console.log("Document written with ID: ", docRef.id);
            setProgress(null);
          }
        );
      } catch (error) {
        console.error("Error uploading file:", error);
        setError(error.message || "An error occurred during file upload.");
      }
      setSelectedFile(null);
    };

  
    return (
      <div>
        <Navbar/>
        <div className="flex flex-col items-center">
          <div>
            <input
              onChange={handleFile}
              type="file"
              className="file-input file-input-bordered file-input-base-300 w-full"
            />
          </div>
          <div>
            <button
              onClick={handleUpload}
              className="btn btn-base-300 mt-4 w-full"
              disabled={!selectedFile}
            >
              {progress && <span className="loading"></span>}
              Upload
            </button>
            {loading && <span className="loading"></span>}
          </div>
        </div>
        <div className="grid  lg:grid-cols-3 xl:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-4 mt-4 pl-3 pr-3">

          {data.map((item, i) => (
            <Card item={item} key={i} />
          ))}
        </div>
      </div>
    );
  };
  
  export default Home;
  
