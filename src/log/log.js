import React, { useState, useContext, useEffect } from "react";
import { Redirect, Link } from "react-router-dom";
import firebaseConfig from "./../firebaseconf/firebase";
import { AuthContext } from "./../AuthChecker/authChecker";
import styles from "./styles.css";
import {
  BrowserView,
  MobileView,
  isBrowser,
  isMobile
} from "react-device-detect";
import firebase from "./../firebase/datafirebase";

function checkSession() {
  const [user, setUser] = useState([]);
  useEffect(() => {
    firebase
      .firestore()
      .collection("users")
      .onSnapshot((snapshot) => {
        const newUser = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }));
        setUser(newUser);
      });
  }, []);
  return user;
}

export default function Auth() {
  const session = checkSession();
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = (mail, pass) => {
    try {
      firebaseConfig.auth().signInWithEmailAndPassword(mail, pass);
    } catch (error) {
      alert(error);
    }
  };
  const { currentUser } = useContext(AuthContext);
  if (currentUser) {
    return <Redirect to="/" />;
  }
  return (
    <div
      style={{
        padding: "5px",
        width: "200px",
        height: "200px",
        marginLeft: "40%",
        marginTop: "10%",
        backgroundColor: " gray",
        borderRadius: " 25px"
      }}
    >
      <h1 style={{ marginLeft: " 50px", fontSize: "30px" }}>Log In</h1>
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
      <div style={{ marginLeft: " 70px" }}>
        <h1 style={{ fontSize: "10px" }}>
          Are you not register ?<Link to="/register">Register </Link>
        </h1>
      </div>
    </div>
  );
}
