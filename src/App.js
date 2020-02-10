import React from "react";
import { Form } from "./components/Form";
import { List } from "./components/List";
import { User } from "./components/User";
import nanoid from "nanoid";
import firebase from "firebase";

const PAGES = {
  LIST: "/list",
  FORM: "/form",
  USER: "/user"
};

export const App = () => {
  const id = nanoid();
  console.log({ id });
  const currentLocation = window.location.pathname;
  firebase.initializeApp({
    apiKey: "AIzaSyCUGPGe5R6dTPJIXKFVDJ--QnwLvvA49zY",
    authDomain: "questionary-8ec9b.firebaseapp.com",
    databaseURL: "https://questionary-8ec9b.firebaseio.com",
    projectId: "questionary-8ec9b",
    storageBucket: "questionary-8ec9b.appspot.com",
    messagingSenderId: "1007269819903",
    appId: "1:1007269819903:web:e25fe2c1e9e395176ae3ca",
    measurementId: "G-58ZEK8SJ7P"
  });

  if (currentLocation === PAGES.LIST) {
    return <List />;
  } else if (currentLocation === PAGES.FORM) {
    return <Form id={id} />;
  } else if (currentLocation.includes(PAGES.USER)) {
    console.log({ currentLocation });
    const currentPath = currentLocation.split("/");
    return <User id={currentPath[currentPath.length - 1]} />;
  } else {
    return <Form id={id} />;
  }
};
