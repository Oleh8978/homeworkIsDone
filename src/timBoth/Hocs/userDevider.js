import React, { useState, useContext, useEffect } from "react";
import firebase from "./../../firebase/datafirebase";
import { AuthContext } from "./../../AuthChecker/authChecker";
import {
  BrowserView,
  MobileView,
  isBrowser,
  isMobile
} from "react-device-detect";

export default function userDevider() {
  const { currentUser } = useContext(AuthContext);
  const [persones, setPersones] = useState([]);
  const [singleUser, setSingleUser] = useState({});
  useEffect(() => {
    firebase
      .firestore()
      .collection("users")
      .onSnapshot((snapshot) => {
        const newUsers = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }));
        setPersones(newUsers);
        try {
          user(newUsers, currentUser);
        } catch (error) {
          console.log(error);
        }
      });
  }, []);
  const user = (arr, user) => {
    console.log(user);
    let nwUser;
    for (let i = 0; i < arr.length; i++) {
      if (user.uid !== null) {
        if (arr[i].id === user.uid) {
          nwUser = arr[i];
        }
      }
    }
    setSingleUser(nwUser);
  };
  return singleUser;
}
