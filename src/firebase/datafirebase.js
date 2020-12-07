import firebase from "firebase/app";
import "firebase/firestore";

var config = {
  apiKey: "AIzaSyBl9BekTnY5vE-bisOKHJLYPE7MKfgA5wg",
  authDomain: "fir-reactapp-c04d9.firebaseapp.com",
  databaseURL: "https://fir-reactapp-c04d9-default-rtdb.firebaseio.com/",
  storageBucket: "fir-reactapp-c04d9.appspot.com"
};

export default !firebase.apps.length
  ? firebase.initializeApp(config)
  : firebase.app();
