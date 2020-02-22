import React, { useCallback, useContext } from "react";
import { withRouter, Redirect } from "react-router";
import * as firebase from "firebase/app";
import styled from "styled-components";

import { firebaseApp } from "../base";
import { AuthContext } from "./Auth.js";
import { MediaWidth } from "../consts";

const Container = styled.div`
  margin: auto;
  font-family: "Montserrat", "PT Sans", sans-serif;

  h2 {
    color: #181919;
    font-weight: 500;
    text-align: center;
    margin: 50px auto 20px;
    max-width: 300px;
  }
  button {
    background-color: #181919;
    height: 50px;
    display: flex;
    margin: 20px auto 50px;
    justify-content: center;
    color: white;
    border-radius: 25px;
    border: 3px solid white;
    width: 300px;
    font-size: 18px;

    @media ${MediaWidth.TABLET} {
      width: 567px;
      height: 55px;
    }
  }
`;

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
    <Container>
      <h2>Авторизуйтесь в Google для получения доступа</h2>
      <button onClick={handleGoogleAuth}>Авторизоваться в Google</button>
    </Container>
  );
};

export default withRouter(Login);
