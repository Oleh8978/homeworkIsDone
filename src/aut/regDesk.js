import React, { useState } from "react";
import { Redirect, Link } from "react-router-dom";
import firebaseConfig from "./../firebaseconf/firebase";
import styles from "./aut.css";
import firebase from "./../firebase/datafirebase";
import {
  BrowserView,
  MobileView,
  isBrowser,
  isMobile
} from "react-device-detect";

export default function Auth() {
  const [currentUser, setCurrentUser] = useState(null);
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = (arM, argP) => {
    try {
      firebaseConfig.auth().createUserWithEmailAndPassword(arM, argP);
      setCurrentUser(true);
    } catch (error) {
      alert(error);
    }
  };

  if (currentUser) {
    return <Redirect to="/" />;
  }

  return (
    <div
      style={{
        width: "200px",
        height: "250px",
        marginLeft: "40%",
        marginTop: "10%",
        backgroundColor: " gray",
        borderRadius: " 25px",
        padding: "5px"
      }}
    >
      <h1 style={{ marginLeft: " 50px", fontSize: "30px" }}>Register</h1>
      <div style={{ marginLeft: " 10px" }}>
        <input type="text" name="text" placeholder="First Name" />
      </div>
      <div style={{ marginLeft: " 10px" }}>
        <input type="text" name="text" placeholder="last Name" />
      </div>
      <div style={{ marginLeft: " 10px" }}>
        <input
          type="email"
          name="text"
          placeholder="e-mail"
          onChange={(event) => setMail(event.target.value)}
        />
      </div>
      <div style={{ marginLeft: " 10px" }}>
        <input
          type="password"
          name="password"
          placeholder="password"
          style={{ color: "white" }}
          onChange={(event) => setPassword(event.target.value)}
        />
      </div>
      <div style={{ marginLeft: " 70px" }}>
        <button
          type="submit"
          onClick={() => {
            handleSubmit(mail, password);
          }}
        >
          Submit
        </button>
      </div>
      <div style={{ marginLeft: " 20px" }}>
        <h1 style={{ fontSize: "10px" }}>
          Are you alredy register ?<Link to="/login">Login </Link>
        </h1>
      </div>
    </div>
  );
}
