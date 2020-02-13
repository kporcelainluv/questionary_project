import React from "react";
import { Form } from "./components/Form";
import { List } from "./components/List";
import { User } from "./components/User";
import nanoid from "nanoid";
import firebase from "firebase";
import "firebase/auth";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Login } from "./components/Login";

const PAGES = {
  LIST: "/list",
  FORM: "/form",
  USER: "/user"
};

export const App = () => {
  const id = nanoid();
  // const currentLocation = window.location.pathname.split("/");
  // const currentUserId = currentLocation[currentLocation.length - 1];

  firebase.initializeApp({
    apiKey: process.env.REACT_APP_FIREBASE_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_DOMAIN,
    databaseURL: process.env.REACT_APP_FIREBASE_DATABASE,
    projectId: "questionary-8ec9b",
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
    measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
  });

  return (
    <Router>
      <div>
        <Route exact path={"/"} component={Form} />
        <Route exact path={"/list"} component={List} />
        <Route
          exact
          path="/user/:id"
          render={props => <User {...props.match.params} />}
        />
        <Route exact path={"/login"} component={Login} />
      </div>
    </Router>
  );
};

//
// import React from "react";
// import { Form } from "./components/Form";
// import { List } from "./components/List";
// import { User } from "./components/User";
// import nanoid from "nanoid";
// import firebase from "firebase";
// import { BrowserRouter as Router, Route } from "react-router-dom";
// import { Login } from "./components/Login";
//
// const PAGES = {
//   LIST: "/list",
//   FORM: "/form",
//   USER: "/user"
// };
//
// export const App = () => {
//   const id = nanoid();
//   const currentLocation = window.location.pathname;
//   console.log({ currentLocation });
//   firebase.initializeApp({
//     apiKey: process.env.REACT_APP_FIREBASE_KEY,
//     authDomain: process.env.REACT_APP_FIREBASE_DOMAIN,
//     databaseURL: process.env.REACT_APP_FIREBASE_DATABASE,
//     projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
//     storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
//     messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID,
//     appId: process.env.REACT_APP_FIREBASE_APP_ID,
//     measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
//   });
//
//   // if (currentLocation === PAGES.LIST) {
//   //   return <List />;
//   // } else if (currentLocation === PAGES.FORM) {
//   //   return <Form id={id} />;
//   // } else if (currentLocation.includes(PAGES.USER)) {
//   //   const currentPath = currentLocation.split("/");
//   //   return <User id={currentPath[currentPath.length - 1]} />;
//   // } else {
//   //   return <Form id={id} />;
//   // }
//   const userId = this.props.match.params.id;
//   console.log(this.props);
//   console.log({ userId });
//   return (
//     <Router>
//       <div>
//         <Route exact path={"/"} component={Form} id={id} />
//         <Route exact path={"/list"} component={List} />
//         <Route exact path={"/user:id"} component={User} id={id} />
//         <Route exact path={"/login"} component={Login} />
//       </div>
//     </Router>
//   );
// };
