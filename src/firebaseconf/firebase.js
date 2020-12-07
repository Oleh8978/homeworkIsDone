import firebase from "firebase/app";
import "firebase/auth";

const firebaseConfig = firebase.initializeApp({
  apiKey: "AIzaSyBl9BekTnY5vE-bisOKHJLYPE7MKfgA5wg",
  authDomain: "fir-reactapp-c04d9.firebaseapp.com",
  projectId: "fir-reactapp-c04d9",
  storageBucket: "fir-reactapp-c04d9.appspot.com",
  messagingSenderId: "36053238494",
  appId: "1:36053238494:web:d44b63fe5cfc859a6eb84f",
  measurementId: "G-ZSYJ371S2G"
});

export default firebaseConfig;
