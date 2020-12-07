import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import firebaseConfig from "./firebaseconf/firebase";
import firebase from "./firebase/datafirebase";
import style from "./styles.css";
import Aut from "./aut/reg";
import AutD from "./aut/regDesk";
import Log from "./log/log";
import LogD from "./log/logDesc";
import Timers from "./timBoth/timBoth";
import { AuthProvider } from "./AuthChecker/authChecker";
import {
  BrowserView,
  MobileView,
  isBrowser,
  isMobile
} from "react-device-detect";

export default function App() {
  let mob;
  let desc;
  if (isBrowser) {
    desc = true;
  }
  if (isMobile) {
    mob = true;
  }

  return (
    <AuthProvider>
      <BrowserView>
        <Router>
          <Switch>
            <Route exact path="/" component={Timers} />
            <Route exact path="/login" component={LogD} />
            <Route exact path="/register" component={AutD} />
          </Switch>
        </Router>
      </BrowserView>
      <MobileView>
        <Router>
          <Switch>
            <Route exact path="/" component={Timers} />
            <Route exact path="/login" component={Log} />
            <Route exact path="/register" component={Aut} />
          </Switch>
        </Router>
      </MobileView>
    </AuthProvider>
  );
}
