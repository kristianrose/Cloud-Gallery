// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyBvA78gLi0nQIWb2tlu2dlMhoPLRNYT0Is",
  authDomain: "frog-fb23f.firebaseapp.com",
  databaseURL: "https://frog-fb23f-default-rtdb.firebaseio.com",
  projectId: "frog-fb23f",
  storageBucket: "frog-fb23f.appspot.com",
  messagingSenderId: "187261675602",
  appId: "1:187261675602:web:421140fc584131cba1d78b",
  measurementId: "G-HRFDZG91XR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);
