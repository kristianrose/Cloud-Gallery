import React from "react";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "../utils/firebase-config";
import logo from "../assets/blue.png";

const Navbar = () => {
  // onAuthStateChanged(firebaseAuth,(currentUser)=>{
  //     if(!currentUser){

  //     }
  // })
  return (
    <div className="navbar bg-base-100 p-1">
      <div className="navbar-start p-5 ">
        <a className="btn btn-ghost text-xl">Froggy</a> 
      
        {/* <img className="max-h-[3rem]" src={logo} alt="ImageGallery" />*/}
      </div>
      <div className="navbar-end pr-1">
        <button
          onClick={() => signOut(firebaseAuth)}
          className="btn btn-base-300"
        >
          LogOut
        </button>
      </div>
    </div>
  );
};

export default Navbar;
