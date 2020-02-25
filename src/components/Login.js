import React, { useContext, useState } from "react";
import { withRouter, Redirect } from "react-router";
import * as firebase from "firebase/app";

import { AuthContext } from "./Auth.js";
import { Error } from "./Error";

const allowedUsers = ["zhukovaksusha@gmail.com", "muazhukova@gmail.com"];

export const Login = withRouter(() => {
  const [error, setError] = useState(false);
  const handleGoogleAuth = () => {
    const provider = new firebase.auth.GoogleAuthProvider();

    firebase
      .auth()
      .signInWithPopup(provider)
      .then(result => {
        const user = result.user;
        if (!allowedUsers.includes(user.email)) {
          firebase
            .auth()
            .signOut()
            .catch(console.error);
        }
      })
      .catch(() => setError(true));
  };

  const { currentUser } = useContext(AuthContext);

  if (currentUser) {
    return <Redirect from="*" to="/list/" />;
  }

  if (error) {
    return (
      <section>
        <Error />
      </section>
    );
  }

  return (
    <section>
      <h2 className="login_heading">Авторизуйтесь для получения доступа</h2>
      <button className="button-long" onClick={handleGoogleAuth}>
        Авторизоваться в Google
      </button>
    </section>
  );
});
