import React, { useState, useContext, useEffect } from "react";
import firebaseConfig from "./../firebaseconf/firebase";
import { Redirect, Link } from "react-router-dom";
import {
  BrowserView,
  MobileView,
  isBrowser,
  isMobile
} from "react-device-detect";
import { AuthContext } from "./../AuthChecker/authChecker";
import Timer from "./../tim/timerDesc";
import TimerMob from "./../tim/timMob";
import firebase from "./../firebase/datafirebase";
import checkSession from "./Hocs/checkSession";
import userDevider from "./Hocs/checkSession";

export default function Timers() {
  const session = userDevider();
  const users = checkSession();
  const [mobile, setMobile] = useState(false);
  const [descktop, setDescktop] = useState(false);
  const [getsession, setGetsession] = useState(false);
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    setMobile(isMobile);
    setDescktop(isBrowser);
  }, []);

  const logOut = () => {
    firebaseConfig
      .auth()
      .signOut()
      .then(
        function () {
          // Sign-out successful.
        },
        function (error) {
          // An error happened.
        }
      );
  };
  if (!currentUser) {
    return <Redirect to="/login" />;
  }

  const checkIfWegotSession = (arg) => {
    if (arg !== {}) {
      setGetsession(true);
    }
  };

  //session.isPhone
  // session.isBrowser

  return (
    <div>
      <div style={{ float: "right" }}>
        <button
          style={{ background: "none" }}
          onClick={() => {
            logOut();
          }}
        >
          log out
        </button>
      </div>
      <div>
        {getsession ? (
          <Timer isBrowser={session.isBrowser} />
        ) : (
          <Timer isBrowser={descktop} />
        )}
      </div>
      <div style={{ marginTop: " 100px" }}>
        {getsession ? (
          <TimerMob isMobile={session.isPhone} />
        ) : (
          <TimerMob isMobile={mobile} />
        )}
      </div>
    </div>
  );
}
