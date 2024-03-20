import React, { useEffect, useState } from "react";
import { firebaseAuth } from "../utils/firebase-config";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Login = () => {
  const navigate = useNavigate();
  const [error,setError] = useState(null);
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });

  const handleLogIn = async () => {
    try {
      await signInWithEmailAndPassword(
        firebaseAuth,
        formValues.email,
        formValues.password
      );
    } catch (err) {
        if(err.code == "auth/invalid-credential"){
            setError("Invalid Email or password")
        }
        else{
            setError(err.code);
        }
        
    }
    console.log(formValues);
  };
  useEffect(()=>{
    onAuthStateChanged(firebaseAuth, (currentUser) => {
      if (currentUser) {
        navigate("/");
      }
    });
  },[]);

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
        <div className="card-body">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              name="email"
              value={formValues.email}
              onChange={(e) =>
                setFormValues({
                  ...formValues,
                  [e.target.name]: e.target.value,
                })
              }
              placeholder="Email"
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              name="password"
              value={formValues.password}
              onChange={(e) =>
                setFormValues({
                  ...formValues,
                  [e.target.name]: e.target.value,
                })
              }
              placeholder="password"
              className="input input-bordered"
              required
            />
            <label className="label">
              <button
                onClick={() => navigate("/signup")}
                className="label-text-alt link link-hover"
              >
                New user? Click Here
              </button>
            </label>
            {error && <p className=" text-red-600">{error}</p>}
          </div>
          <div className="form-control mt-6">
            <button onClick={handleLogIn} className="btn btn-base-300">Login</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

const Container = styled.div``;
