import React, { useCallback, useContext } from "react";
import { withRouter, Redirect } from "react-router";
import * as firebase from "firebase/app";

import { firebaseApp } from "../base";
import { AuthContext } from "./Auth.js";

const Login = ({ history }) => {
  useCallback(
    async event => {
      event.preventDefault();
      const { email, password } = event.target.elements;
      try {
        await firebaseApp
          .auth()
          .signInWithEmailAndPassword(email.value, password.value);
        history.push("/");
      } catch (error) {
        alert(error);
      }
    },
    [history]
  );

  const handleGoogleAuth = () => {
    const provider = new firebase.auth.GoogleAuthProvider();

    firebase
      .auth()
      .signInWithPopup(provider)
      .then(function(result) {
        const user = result.user;
        console.log(user.email);
        if (
          user.email !== "zhukovaksusha@gmail.com" &&
          user.email !== "muazhukova@gmail.com"
        ) {
          firebase
            .auth()
            .signOut()
            .then(
              function() {
                console.log("Signed Out");
              },
              function(error) {
                console.error("Sign Out Error", error);
              }
            );
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  const { currentUser } = useContext(AuthContext);

  if (currentUser) {
    return <Redirect from="*" to="/list/" />;
  }

  return (
    <section>
      <h2 className="login_heading">
        Авторизуйтесь в Google для получения доступа
      </h2>
      <button className="button-long " onClick={handleGoogleAuth}>
        Авторизоваться в Google
      </button>
    </section>
  );
};

export default withRouter(Login);
