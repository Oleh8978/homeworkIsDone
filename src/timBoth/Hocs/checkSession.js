import React, { useState, useContext, useEffect } from "react";
import firebase from "./../../firebase/datafirebase";
import { AuthContext } from "./../../AuthChecker/authChecker";
import {
  BrowserView,
  MobileView,
  isBrowser,
  isMobile
} from "react-device-detect";

export default function checkSession() {
  const { currentUser } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  useEffect(() => {
    firebase
      .firestore()
      .collection("users")
      .onSnapshot((snapshot) => {
        const newUsers = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }));
        setUsers(newUsers);
      });
  }, []);
  const checker = (arr, id) => {
    let persone;
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].id === id) {
        persone = arr[i];
      }
    }
    return persone;
  };
  try {
    checker(users, currentUser.uid);
  } catch (error) {
    console.log(error);
  }

  const adderToDB = (arr, user) => {
    let persone;
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].id != user.uid) {
        firebase.firestore().collection("users").doc(user.uid).set({
          isPhone: isMobile,
          isBrowser: isBrowser
        });
      }
    }
  };

  // to prevent possible bugs was used try catch constraction
  try {
    adderToDB(users, currentUser);
  } catch (error) {
    console.log(error);
  }

  const dbUpdater = (arr, user, phone, desctop) => {
    for (let q = 0; q < arr.length; q++) {
      if (arr[q].id == user.uid) {
        firebase.firestore().collection("users").doc(user.uid).update({
          isPhone: phone,
          isBrowser: desctop
        });
      }
    }
  };
  try {
    dbUpdater(users, currentUser, isMobile, isBrowser);
  } catch (error) {
    console.log(error);
  }

  return users;
}
